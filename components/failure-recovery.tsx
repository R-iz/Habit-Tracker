"use client"

import { useState, useEffect } from "react"
import { Heart, RefreshCw, TrendingUp, AlertCircle, CheckCircle, Lightbulb } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { Habit } from "@/lib/types"

interface FailurePattern {
  id: string
  habitId: string
  habitName: string
  failureType: "missed_day" | "broken_streak" | "low_motivation" | "external_factor"
  date: Date
  reason?: string
  recoveryStrategy?: string
  recovered: boolean
  recoveryTime?: number // days to recover
}

interface RecoveryStrategy {
  id: string
  title: string
  description: string
  icon: any
  effectiveness: number
  timeToRecover: string
}

interface FailureRecoveryProps {
  habits: Habit[]
  onHabitUpdate: (habitId: string) => void
}

export function FailureRecovery({ habits, onHabitUpdate }: FailureRecoveryProps) {
  const [failurePatterns, setFailurePatterns] = useState<FailurePattern[]>([])
  const [selectedHabit, setSelectedHabit] = useState<string>("")
  const [recoveryReason, setRecoveryReason] = useState("")
  const [isRecovering, setIsRecovering] = useState(false)

  const recoveryStrategies: RecoveryStrategy[] = [
    {
      id: "micro-habit",
      title: "Micro-Habit Approach",
      description: "Start with the smallest possible version of your habit (2-minute rule)",
      icon: Lightbulb,
      effectiveness: 85,
      timeToRecover: "1-3 days",
    },
    {
      id: "buddy-support",
      title: "Buddy Support",
      description: "Reach out to your habit buddy for motivation and accountability",
      icon: Heart,
      effectiveness: 78,
      timeToRecover: "1-2 days",
    },
    {
      id: "environment-reset",
      title: "Environment Reset",
      description: "Modify your environment to make the habit easier to perform",
      icon: RefreshCw,
      effectiveness: 72,
      timeToRecover: "2-4 days",
    },
    {
      id: "streak-insurance",
      title: "Streak Insurance",
      description: "Use your 'streak insurance' to maintain momentum with a valid reason",
      icon: CheckCircle,
      effectiveness: 90,
      timeToRecover: "Immediate",
    },
  ]

  useEffect(() => {
    // Generate mock failure patterns based on habits
    const patterns: FailurePattern[] = habits.flatMap((habit) => {
      const failures: FailurePattern[] = []

      // Simulate some failure patterns
      if (habit.longestStreak > habit.currentStreak && habit.currentStreak < 7) {
        failures.push({
          id: `failure-${habit.id}-1`,
          habitId: habit.id,
          habitName: habit.name,
          failureType: "broken_streak",
          date: new Date(Date.now() - (habit.longestStreak - habit.currentStreak) * 24 * 60 * 60 * 1000),
          reason: "Busy schedule disrupted routine",
          recovered: habit.currentStreak > 0,
          recoveryTime: habit.currentStreak > 0 ? 2 : undefined,
        })
      }

      return failures
    })

    setFailurePatterns(patterns)
  }, [habits])

  const handleRecoveryStart = async (habitId: string, strategy: string) => {
    setIsRecovering(true)

    // Simulate recovery process
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Update failure pattern
    setFailurePatterns((prev) =>
      prev.map((pattern) =>
        pattern.habitId === habitId
          ? { ...pattern, recoveryStrategy: strategy, recovered: true, recoveryTime: 1 }
          : pattern,
      ),
    )

    setIsRecovering(false)
    onHabitUpdate(habitId)
  }

  const strugglingHabits = habits.filter(
    (habit) => habit.currentStreak === 0 || (habit.longestStreak > 7 && habit.currentStreak < habit.longestStreak / 2),
  )

  const recoveredHabits = failurePatterns.filter((p) => p.recovered)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Failure Recovery & Resilience</h3>
        <p className="text-gray-600">Bounce back stronger with personalized recovery strategies</p>
      </div>

      {/* Recovery Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              Struggling Habits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{strugglingHabits.length}</div>
            <p className="text-sm text-gray-600">Need attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Recovery Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {failurePatterns.length > 0 ? Math.round((recoveredHabits.length / failurePatterns.length) * 100) : 0}%
            </div>
            <p className="text-sm text-gray-600">Successful recoveries</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-blue-600" />
              Avg Recovery Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {recoveredHabits.length > 0
                ? Math.round(
                    recoveredHabits.reduce((sum, p) => sum + (p.recoveryTime || 0), 0) / recoveredHabits.length,
                  )
                : 0}{" "}
              days
            </div>
            <p className="text-sm text-gray-600">To get back on track</p>
          </CardContent>
        </Card>
      </div>

      {/* Struggling Habits */}
      {strugglingHabits.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-600" />
              Habits That Need Support
            </CardTitle>
            <CardDescription>These habits could use some extra attention and care</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {strugglingHabits.map((habit) => (
              <div key={habit.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{habit.name}</h4>
                  <p className="text-sm text-gray-600">
                    Current streak: {habit.currentStreak} days • Best: {habit.longestStreak} days
                  </p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => setSelectedHabit(habit.id)}>
                      Get Help
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Recovery Strategies for "{habit.name}"</DialogTitle>
                      <DialogDescription>
                        Choose a strategy to help you get back on track with this habit.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      {recoveryStrategies.map((strategy) => (
                        <Card key={strategy.id} className="cursor-pointer hover:shadow-md transition-shadow">
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <strategy.icon className="h-5 w-5 text-blue-600" />
                                <CardTitle className="text-base">{strategy.title}</CardTitle>
                              </div>
                              <Badge variant="secondary">{strategy.effectiveness}% effective</Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-600 mb-3">{strategy.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500">Recovery time: {strategy.timeToRecover}</span>
                              <Button
                                size="sm"
                                onClick={() => handleRecoveryStart(habit.id, strategy.id)}
                                disabled={isRecovering}
                              >
                                {isRecovering ? "Starting..." : "Start Recovery"}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Recovery History */}
      {failurePatterns.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recovery History</CardTitle>
            <CardDescription>Learn from your past setbacks and recoveries</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {failurePatterns.map((pattern) => (
              <div key={pattern.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">{pattern.habitName}</h4>
                  <p className="text-sm text-gray-600">
                    {pattern.failureType.replace("_", " ")} on {pattern.date.toLocaleDateString()}
                  </p>
                  {pattern.reason && <p className="text-xs text-gray-500 mt-1">Reason: {pattern.reason}</p>}
                </div>
                <div className="text-right">
                  {pattern.recovered ? (
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      Recovered in {pattern.recoveryTime} days
                    </Badge>
                  ) : (
                    <Badge variant="secondary">In Progress</Badge>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Compassionate Message */}
      {strugglingHabits.length === 0 && failurePatterns.length === 0 && (
        <Alert>
          <Heart className="h-4 w-4" />
          <AlertDescription>
            You're doing great! No struggling habits detected. Remember, setbacks are normal and part of the journey.
            We'll be here to support you when you need it.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
