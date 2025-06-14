"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CalendarDays, TrendingUp, Target, Award } from "lucide-react"
import type { Habit } from "@/lib/types"

interface AnalyticsViewProps {
  habits: Habit[]
}

export function AnalyticsView({ habits }: AnalyticsViewProps) {
  const analytics = useMemo(() => {
    const totalHabits = habits.length
    const totalCompletions = habits.reduce((sum, habit) => sum + habit.completedDates.length, 0)
    const longestStreak = Math.max(...habits.map((h) => h.longestStreak), 0)
    const currentStreaks = habits.reduce((sum, habit) => sum + habit.currentStreak, 0)

    // Calculate completion rate for last 30 days
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - i)
      return date.toDateString()
    }).reverse()

    const dailyCompletions = last30Days.map((date) => {
      const completions = habits.filter((habit) => habit.completedDates.includes(date)).length
      return {
        date: new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        completions,
        total: totalHabits,
      }
    })

    // Category breakdown
    const categoryStats = habits.reduce(
      (acc, habit) => {
        const category = habit.category || "Other"
        if (!acc[category]) {
          acc[category] = { count: 0, completions: 0 }
        }
        acc[category].count++
        acc[category].completions += habit.completedDates.length
        return acc
      },
      {} as Record<string, { count: number; completions: number }>,
    )

    const categoryData = Object.entries(categoryStats).map(([category, stats]) => ({
      category,
      habits: stats.count,
      completions: stats.completions,
    }))

    return {
      totalHabits,
      totalCompletions,
      longestStreak,
      currentStreaks,
      dailyCompletions,
      categoryData,
      averageStreak: totalHabits > 0 ? Math.round(currentStreaks / totalHabits) : 0,
    }
  }, [habits])

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Habits</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalHabits}</div>
            <p className="text-xs text-muted-foreground">Active habits being tracked</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Completions</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalCompletions}</div>
            <p className="text-xs text-muted-foreground">All-time habit completions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Longest Streak</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.longestStreak}</div>
            <p className="text-xs text-muted-foreground">Days in a row</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Streak</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.averageStreak}</div>
            <p className="text-xs text-muted-foreground">Current average</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>30-Day Completion Trend</CardTitle>
            <CardDescription>Daily habit completions over the last month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {analytics.dailyCompletions.slice(-7).map((day, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm">{day.date}</span>
                  <div className="flex items-center gap-2">
                    <Progress value={(day.completions / Math.max(day.total, 1)) * 100} className="w-20 h-2" />
                    <span className="text-sm font-medium">{day.completions}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Habits by Category</CardTitle>
            <CardDescription>Distribution of your habits across categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.categoryData.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{category.category}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{category.habits} habits</Badge>
                    <span className="text-sm text-gray-600">{category.completions} completions</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Individual Habit Progress</CardTitle>
          <CardDescription>Current streak and completion rate for each habit</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {habits.map((habit) => {
            const completionRate =
              habit.completedDates.length > 0
                ? Math.round((habit.currentStreak / habit.completedDates.length) * 100)
                : 0

            return (
              <div key={habit.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{habit.name}</span>
                    {habit.category && (
                      <Badge variant="secondary" className="text-xs">
                        {habit.category}
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">{habit.currentStreak} day streak</div>
                </div>
                <Progress value={Math.min(completionRate, 100)} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{habit.completedDates.length} total completions</span>
                  <span>Longest: {habit.longestStreak} days</span>
                </div>
              </div>
            )
          })}
          {habits.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              No habits to analyze yet. Create some habits to see your progress!
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
