"use client"

import { useState, useEffect } from "react"
import { MessageCircle, Trophy, Target, Plus } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { Habit } from "@/lib/types"

interface HabitBuddy {
  id: string
  name: string
  avatar: string
  sharedHabits: string[]
  streak: number
  lastActive: Date
  motivationScore: number
}

interface BuddySystemProps {
  userHabits: Habit[]
}

export function HabitBuddySystem({ userHabits }: BuddySystemProps) {
  const [buddies, setBuddies] = useState<HabitBuddy[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Mock buddy data
  useEffect(() => {
    const mockBuddies: HabitBuddy[] = [
      {
        id: "buddy-1",
        name: "Alex Chen",
        avatar: "AC",
        sharedHabits: ["Morning Exercise", "Read Daily"],
        streak: 15,
        lastActive: new Date(),
        motivationScore: 92,
      },
      {
        id: "buddy-2",
        name: "Sarah Kim",
        avatar: "SK",
        sharedHabits: ["Meditation", "Drink Water"],
        streak: 23,
        lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
        motivationScore: 88,
      },
      {
        id: "buddy-3",
        name: "Mike Johnson",
        avatar: "MJ",
        sharedHabits: ["Exercise", "Healthy Eating"],
        streak: 8,
        lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000),
        motivationScore: 76,
      },
    ]
    setBuddies(mockBuddies)
  }, [])

  const findBuddy = async () => {
    setIsSearching(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSearching(false)
  }

  const sendMotivation = (buddyId: string) => {
    // Simulate sending motivation
    console.log(`Sent motivation to buddy ${buddyId}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Habit Buddies</h3>
          <p className="text-gray-600">Connect with others who share your goals</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Find Buddy
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Find Your Habit Buddy</DialogTitle>
              <DialogDescription>We'll match you with someone who has similar habits and goals.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="interests">What habits are you looking to share?</Label>
                <Input id="interests" placeholder="e.g., Exercise, Reading, Meditation" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Preferred timezone</Label>
                <Input id="timezone" placeholder="e.g., PST, EST, GMT" />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={findBuddy} disabled={isSearching}>
                {isSearching ? "Searching..." : "Find Buddy"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">Active Buddies</TabsTrigger>
          <TabsTrigger value="discover">Discover</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {buddies.map((buddy) => (
            <Card key={buddy.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-blue-100 text-blue-600">{buddy.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{buddy.name}</CardTitle>
                      <CardDescription>
                        {buddy.streak} day streak • Active{" "}
                        {Math.floor((Date.now() - buddy.lastActive.getTime()) / (1000 * 60 * 60))}h ago
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary" className="gap-1">
                    <Trophy className="h-3 w-3" />
                    {buddy.motivationScore}%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Shared Habits</span>
                    <span className="text-sm text-gray-500">{buddy.sharedHabits.length} habits</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {buddy.sharedHabits.map((habit, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {habit}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => sendMotivation(buddy.id)} className="gap-1">
                    <MessageCircle className="h-3 w-3" />
                    Motivate
                  </Button>
                  <Button size="sm" variant="outline" className="gap-1">
                    <Target className="h-3 w-3" />
                    Challenge
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="discover" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Community Challenges</CardTitle>
              <CardDescription>Join anonymous challenges with the community</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">30-Day Fitness Challenge</h4>
                    <p className="text-sm text-gray-600">1,247 participants • 12 days left</p>
                  </div>
                  <Button size="sm">Join</Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Mindful Mornings</h4>
                    <p className="text-sm text-gray-600">892 participants • 5 days left</p>
                  </div>
                  <Button size="sm">Join</Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Reading Marathon</h4>
                    <p className="text-sm text-gray-600">2,156 participants • 18 days left</p>
                  </div>
                  <Button size="sm">Join</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
