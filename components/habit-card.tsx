"use client"

import { useState } from "react"
import { Check, Flame, Trash2, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import type { Habit } from "@/lib/types"

interface HabitCardProps {
  habit: Habit
  onToggle: (id: string) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export function HabitCard({ habit, onToggle, onDelete }: HabitCardProps) {
  const [isToggling, setIsToggling] = useState(false)

  const today = new Date().toDateString()
  const isCompletedToday = habit.completedDates.includes(today)

  const handleToggle = async () => {
    setIsToggling(true)
    try {
      await onToggle(habit.id)
    } finally {
      setIsToggling(false)
    }
  }

  const getStreakColor = (streak: number) => {
    if (streak >= 30) return "text-purple-600"
    if (streak >= 14) return "text-orange-600"
    if (streak >= 7) return "text-red-600"
    return "text-gray-600"
  }

  return (
    <Card
      className={`transition-all duration-200 hover:shadow-lg ${isCompletedToday ? "ring-2 ring-green-500 bg-green-50" : ""}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{habit.name}</CardTitle>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-500">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Habit</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete "{habit.name}"? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(habit.id)} className="bg-red-600 hover:bg-red-700">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        {habit.description && <p className="text-sm text-gray-600">{habit.description}</p>}
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className={`h-5 w-5 ${getStreakColor(habit.currentStreak)}`} />
            <span className={`font-semibold ${getStreakColor(habit.currentStreak)}`}>
              {habit.currentStreak} day streak
            </span>
          </div>
          <Badge variant="secondary" className="gap-1">
            <Calendar className="h-3 w-3" />
            {habit.completedDates.length} total
          </Badge>
        </div>

        <Button
          onClick={handleToggle}
          disabled={isToggling}
          className={`w-full transition-all duration-200 ${
            isCompletedToday
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          }`}
        >
          <Check className={`h-4 w-4 mr-2 ${isCompletedToday ? "text-white" : "text-gray-400"}`} />
          {isToggling ? "Updating..." : isCompletedToday ? "Completed Today!" : "Mark Complete"}
        </Button>
      </CardContent>
    </Card>
  )
}
