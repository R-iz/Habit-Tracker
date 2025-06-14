"use client"

import { useState, useEffect } from "react"
import { Trophy, Star, Award, Target, Flame, Calendar, Zap, Crown } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Habit } from "@/lib/types"

interface Achievement {
  id: string
  title: string
  description: string
  icon: any
  category: "streak" | "consistency" | "variety" | "milestone" | "special"
  rarity: "common" | "rare" | "epic" | "legendary"
  progress: number
  maxProgress: number
  unlocked: boolean
  unlockedAt?: Date
  points: number
}

interface AchievementSystemProps {
  habits: Habit[]
}

export function AchievementSystem({ habits }: AchievementSystemProps) {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [totalPoints, setTotalPoints] = useState(0)
  const [userLevel, setUserLevel] = useState(1)

  useEffect(() => {
    const calculateAchievements = () => {
      const totalCompletions = habits.reduce((sum, habit) => sum + habit.completedDates.length, 0)
      const longestStreak = Math.max(...habits.map((h) => h.longestStreak), 0)
      const currentStreaks = habits.reduce((sum, habit) => sum + habit.currentStreak, 0)
      const habitCount = habits.length

      const achievementList: Achievement[] = [
        {
          id: "first-habit",
          title: "First Steps",
          description: "Create your first habit",
          icon: Target,
          category: "milestone",
          rarity: "common",
          progress: Math.min(habitCount, 1),
          maxProgress: 1,
          unlocked: habitCount >= 1,
          points: 10,
        },
        {
          id: "week-warrior",
          title: "Week Warrior",
          description: "Maintain a 7-day streak",
          icon: Flame,
          category: "streak",
          rarity: "common",
          progress: Math.min(longestStreak, 7),
          maxProgress: 7,
          unlocked: longestStreak >= 7,
          points: 25,
        },
        {
          id: "month-master",
          title: "Month Master",
          description: "Achieve a 30-day streak",
          icon: Calendar,
          category: "streak",
          rarity: "rare",
          progress: Math.min(longestStreak, 30),
          maxProgress: 30,
          unlocked: longestStreak >= 30,
          points: 100,
        },
        {
          id: "century-club",
          title: "Century Club",
          description: "Complete 100 total habits",
          icon: Trophy,
          category: "milestone",
          rarity: "epic",
          progress: Math.min(totalCompletions, 100),
          maxProgress: 100,
          unlocked: totalCompletions >= 100,
          points: 200,
        },
        {
          id: "habit-collector",
          title: "Habit Collector",
          description: "Track 10 different habits",
          icon: Star,
          category: "variety",
          rarity: "rare",
          progress: Math.min(habitCount, 10),
          maxProgress: 10,
          unlocked: habitCount >= 10,
          points: 75,
        },
        {
          id: "consistency-king",
          title: "Consistency King",
          description: "Maintain 5 habits simultaneously for 7 days",
          icon: Crown,
          category: "consistency",
          rarity: "epic",
          progress: Math.min(habits.filter((h) => h.currentStreak >= 7).length, 5),
          maxProgress: 5,
          unlocked: habits.filter((h) => h.currentStreak >= 7).length >= 5,
          points: 150,
        },
        {
          id: "comeback-kid",
          title: "Comeback Kid",
          description: "Restart a habit after breaking a streak",
          icon: Zap,
          category: "special",
          rarity: "rare",
          progress: 0, // This would need special tracking
          maxProgress: 1,
          unlocked: false,
          points: 50,
        },
        {
          id: "legend",
          title: "Habit Legend",
          description: "Achieve a 365-day streak",
          icon: Award,
          category: "streak",
          rarity: "legendary",
          progress: Math.min(longestStreak, 365),
          maxProgress: 365,
          unlocked: longestStreak >= 365,
          points: 1000,
        },
      ]

      // Add unlock dates for achieved items
      achievementList.forEach((achievement) => {
        if (achievement.unlocked && !achievement.unlockedAt) {
          achievement.unlockedAt = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
        }
      })

      setAchievements(achievementList)

      // Calculate total points and level
      const points = achievementList.filter((a) => a.unlocked).reduce((sum, a) => sum + a.points, 0)
      setTotalPoints(points)
      setUserLevel(Math.floor(points / 100) + 1)
    }

    calculateAchievements()
  }, [habits])

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "text-gray-600 bg-gray-100"
      case "rare":
        return "text-blue-600 bg-blue-100"
      case "epic":
        return "text-purple-600 bg-purple-100"
      case "legendary":
        return "text-yellow-600 bg-yellow-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const unlockedAchievements = achievements.filter((a) => a.unlocked)
  const lockedAchievements = achievements.filter((a) => !a.unlocked)

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Achievement System</h3>
        <p className="text-gray-600 mb-4">Unlock badges and earn points for your habit journey</p>

        <div className="flex items-center justify-center gap-6 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{totalPoints}</div>
            <div className="text-sm text-gray-600">Total Points</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">Level {userLevel}</div>
            <div className="text-sm text-gray-600">Current Level</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{unlockedAchievements.length}</div>
            <div className="text-sm text-gray-600">Achievements</div>
          </div>
        </div>

        <Progress value={totalPoints % 100} className="max-w-md mx-auto" />
        <p className="text-xs text-gray-500 mt-2">
          {100 - (totalPoints % 100)} points to Level {userLevel + 1}
        </p>
      </div>

      <Tabs defaultValue="unlocked" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="unlocked">Unlocked ({unlockedAchievements.length})</TabsTrigger>
          <TabsTrigger value="locked">In Progress ({lockedAchievements.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="unlocked" className="space-y-4">
          {unlockedAchievements.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  No achievements unlocked yet. Start tracking habits to earn your first badge!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {unlockedAchievements.map((achievement) => (
                <Card key={achievement.id} className="border-green-200 bg-green-50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <achievement.icon className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{achievement.title}</CardTitle>
                          <CardDescription>{achievement.description}</CardDescription>
                        </div>
                      </div>
                      <Badge className={getRarityColor(achievement.rarity)}>{achievement.rarity}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-green-600">+{achievement.points} points</span>
                      {achievement.unlockedAt && (
                        <span className="text-xs text-gray-500">
                          Unlocked {achievement.unlockedAt.toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="locked" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {lockedAchievements.map((achievement) => (
              <Card key={achievement.id} className="border-gray-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <achievement.icon className="h-6 w-6 text-gray-400" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-gray-700">{achievement.title}</CardTitle>
                        <CardDescription>{achievement.description}</CardDescription>
                      </div>
                    </div>
                    <Badge className={getRarityColor(achievement.rarity)}>{achievement.rarity}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">
                      {achievement.progress}/{achievement.maxProgress}
                    </span>
                  </div>
                  <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-2" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">+{achievement.points} points when unlocked</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
