"use client"

import { useState, useEffect } from "react"
import { Plus, LogOut, User, Users, Brain, Trophy, Activity, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HabitCard } from "@/components/habit-card"
import { AddHabitDialog } from "@/components/add-habit-dialog"
import { AnalyticsView } from "@/components/analytics-view"
import { HabitBuddySystem } from "@/components/habit-buddy-system"
import { AIInsights } from "@/components/ai-insights"
import { AchievementSystem } from "@/components/achievement-system"
import { FailureRecovery } from "@/components/failure-recovery"
import { BiometricIntegration } from "@/components/biometric-integration"
import { AdvancedVisualizations } from "@/components/advanced-visualizations"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useHabits } from "@/hooks/use-habits"
import { useNotifications } from "@/hooks/use-notifications"
import { useAuth } from "@/hooks/use-auth"
import { AuthGuard } from "@/components/auth-guard"
import { useRouter } from "next/navigation"

function HabitTrackerContent() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const { habits, loading, addHabit, toggleHabit, deleteHabit } = useHabits()
  const { requestPermission } = useNotifications()
  const { user, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Request notification permission on load
    requestPermission()
  }, [requestPermission])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleHabitUpdate = (habitId: string) => {
    // Trigger a refresh of habit data
    console.log(`Habit ${habitId} updated`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-lg">Loading your habits...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 max-w-6xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Advanced Habit Tracker</h1>
              <p className="text-gray-600">Welcome back, {user?.name}!</p>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/")}>Home</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Tabs defaultValue="habits" className="w-full">
          <TabsList className="grid w-full grid-cols-7 mb-8">
            <TabsTrigger value="habits">My Habits</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="ai-insights" className="gap-1">
              <Brain className="h-3 w-3" />
              AI Insights
            </TabsTrigger>
            <TabsTrigger value="social" className="gap-1">
              <Users className="h-3 w-3" />
              Social
            </TabsTrigger>
            <TabsTrigger value="achievements" className="gap-1">
              <Trophy className="h-3 w-3" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="health" className="gap-1">
              <Activity className="h-3 w-3" />
              Health
            </TabsTrigger>
            <TabsTrigger value="visualizations" className="gap-1">
              <Palette className="h-3 w-3" />
              Visuals
            </TabsTrigger>
          </TabsList>

          <TabsContent value="habits" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-800">Today's Habits</h2>
              <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Habit
              </Button>
            </div>

            {habits.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 mb-4">No habits yet. Start building your routine!</div>
                <Button onClick={() => setIsAddDialogOpen(true)} variant="outline">
                  Create Your First Habit
                </Button>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {habits.map((habit) => (
                  <HabitCard key={habit.id} habit={habit} onToggle={toggleHabit} onDelete={deleteHabit} />
                ))}
              </div>
            )}

            {/* Failure Recovery Section */}
            <FailureRecovery habits={habits} onHabitUpdate={handleHabitUpdate} />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsView habits={habits} />
          </TabsContent>

          <TabsContent value="ai-insights">
            <AIInsights habits={habits} />
          </TabsContent>

          <TabsContent value="social">
            <HabitBuddySystem userHabits={habits} />
          </TabsContent>

          <TabsContent value="achievements">
            <AchievementSystem habits={habits} />
          </TabsContent>

          <TabsContent value="health">
            <BiometricIntegration habits={habits} />
          </TabsContent>

          <TabsContent value="visualizations">
            <AdvancedVisualizations habits={habits} />
          </TabsContent>
        </Tabs>

        <AddHabitDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onAddHabit={addHabit} />
      </div>
    </div>
  )
}

export default function HabitTracker() {
  return (
    <AuthGuard>
      <HabitTrackerContent />
    </AuthGuard>
  )
}
