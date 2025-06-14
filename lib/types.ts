export interface Habit {
  id: string
  name: string
  description: string
  category: string
  reminderTime: string
  createdAt: Date
  completedDates: string[] // Array of date strings
  currentStreak: number
  longestStreak: number
}

export interface CreateHabitData {
  name: string
  description?: string
  category?: string
  reminderTime?: string
}

export interface HabitStats {
  totalHabits: number
  totalCompletions: number
  longestStreak: number
  currentStreaks: number
  averageStreak: number
}
