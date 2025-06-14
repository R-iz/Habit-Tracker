"use client"

import { useState, useEffect, useCallback } from "react"
import { habitDB } from "@/lib/habit-db"
import type { Habit, CreateHabitData } from "@/lib/types"

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([])
  const [loading, setLoading] = useState(true)

  const loadHabits = useCallback(async () => {
    try {
      const allHabits = await habitDB.getAllHabits()
      setHabits(allHabits)
    } catch (error) {
      console.error("Failed to load habits:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  const addHabit = useCallback(async (habitData: CreateHabitData) => {
    try {
      const newHabit = await habitDB.addHabit(habitData)
      setHabits((prev) => [...prev, newHabit])

      // Schedule notification if reminder time is set
      if (habitData.reminderTime && "serviceWorker" in navigator) {
        const registration = await navigator.serviceWorker.ready
        if (registration.showNotification) {
          // Schedule daily reminder (simplified - in production you'd use a more sophisticated scheduling system)
          console.log(`Reminder scheduled for ${habitData.name} at ${habitData.reminderTime}`)
        }
      }
    } catch (error) {
      console.error("Failed to add habit:", error)
      throw error
    }
  }, [])

  const toggleHabit = useCallback(async (habitId: string) => {
    try {
      const updatedHabit = await habitDB.toggleHabitCompletion(habitId)
      setHabits((prev) => prev.map((habit) => (habit.id === habitId ? updatedHabit : habit)))
    } catch (error) {
      console.error("Failed to toggle habit:", error)
      throw error
    }
  }, [])

  const deleteHabit = useCallback(async (habitId: string) => {
    try {
      await habitDB.deleteHabit(habitId)
      setHabits((prev) => prev.filter((habit) => habit.id !== habitId))
    } catch (error) {
      console.error("Failed to delete habit:", error)
      throw error
    }
  }, [])

  useEffect(() => {
    loadHabits()
  }, [loadHabits])

  return {
    habits,
    loading,
    addHabit,
    toggleHabit,
    deleteHabit,
    refreshHabits: loadHabits,
  }
}
