"use client"

import { openDB, type DBSchema, type IDBPDatabase } from "idb"
import type { Habit, CreateHabitData } from "./types"

interface HabitDB extends DBSchema {
  habits: {
    key: string
    value: Habit
    indexes: {
      "by-category": string
      "by-created": Date
    }
  }
}

class HabitDatabase {
  private db: IDBPDatabase<HabitDB> | null = null

  async init() {
    if (this.db) return this.db

    this.db = await openDB<HabitDB>("HabitTracker", 1, {
      upgrade(db) {
        const habitStore = db.createObjectStore("habits", {
          keyPath: "id",
        })

        habitStore.createIndex("by-category", "category")
        habitStore.createIndex("by-created", "createdAt")
      },
    })

    return this.db
  }

  async addHabit(habitData: CreateHabitData): Promise<Habit> {
    const db = await this.init()

    const habit: Habit = {
      id: crypto.randomUUID(),
      name: habitData.name,
      description: habitData.description || "",
      category: habitData.category || "Other",
      reminderTime: habitData.reminderTime || "",
      createdAt: new Date(),
      completedDates: [],
      currentStreak: 0,
      longestStreak: 0,
    }

    await db.add("habits", habit)
    return habit
  }

  async getAllHabits(): Promise<Habit[]> {
    const db = await this.init()
    return db.getAll("habits")
  }

  async getHabit(id: string): Promise<Habit | undefined> {
    const db = await this.init()
    return db.get("habits", id)
  }

  async updateHabit(habit: Habit): Promise<void> {
    const db = await this.init()
    await db.put("habits", habit)
  }

  async deleteHabit(id: string): Promise<void> {
    const db = await this.init()
    await db.delete("habits", id)
  }

  async toggleHabitCompletion(id: string): Promise<Habit> {
    const db = await this.init()
    const habit = await db.get("habits", id)

    if (!habit) {
      throw new Error("Habit not found")
    }

    const today = new Date().toDateString()
    const isCompletedToday = habit.completedDates.includes(today)

    if (isCompletedToday) {
      // Remove today's completion
      habit.completedDates = habit.completedDates.filter((date) => date !== today)
      habit.currentStreak = this.calculateCurrentStreak(habit.completedDates)
    } else {
      // Add today's completion
      habit.completedDates.push(today)
      habit.completedDates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
      habit.currentStreak = this.calculateCurrentStreak(habit.completedDates)
      habit.longestStreak = Math.max(habit.longestStreak, habit.currentStreak)
    }

    await db.put("habits", habit)
    return habit
  }

  private calculateCurrentStreak(completedDates: string[]): number {
    if (completedDates.length === 0) return 0

    const sortedDates = completedDates.map((date) => new Date(date)).sort((a, b) => b.getTime() - a.getTime())

    let streak = 0
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    for (let i = 0; i < sortedDates.length; i++) {
      const date = new Date(sortedDates[i])
      date.setHours(0, 0, 0, 0)

      const expectedDate = new Date(today)
      expectedDate.setDate(today.getDate() - i)

      if (date.getTime() === expectedDate.getTime()) {
        streak++
      } else {
        break
      }
    }

    return streak
  }

  async getHabitsByCategory(category: string): Promise<Habit[]> {
    const db = await this.init()
    return db.getAllFromIndex("habits", "by-category", category)
  }

  async clearAllData(): Promise<void> {
    const db = await this.init()
    await db.clear("habits")
  }
}

export const habitDB = new HabitDatabase()
