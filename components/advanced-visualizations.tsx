"use client"

import { useState } from "react"
import { Calendar, BarChart3, TrendingUp, Palette } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Habit } from "@/lib/types"

interface AdvancedVisualizationsProps {
  habits: Habit[]
}

export function AdvancedVisualizations({ habits }: AdvancedVisualizationsProps) {
  const [selectedVisualization, setSelectedVisualization] = useState("heatmap")

  // Generate heatmap data
  const generateHeatmapData = () => {
    const data = []
    const today = new Date()

    for (let i = 364; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)

      const completions = habits.filter((habit) => habit.completedDates.includes(date.toDateString())).length

      data.push({
        date: date.toISOString().split("T")[0],
        count: completions,
        level: completions === 0 ? 0 : Math.min(Math.ceil((completions / habits.length) * 4), 4),
      })
    }

    return data
  }

  // Generate constellation data
  const generateConstellationData = () => {
    return habits.map((habit, index) => ({
      id: habit.id,
      name: habit.name,
      x: Math.cos((index * 2 * Math.PI) / habits.length) * (50 + habit.currentStreak * 2),
      y: Math.sin((index * 2 * Math.PI) / habits.length) * (50 + habit.currentStreak * 2),
      size: Math.max(habit.currentStreak * 2, 8),
      brightness: Math.min(habit.currentStreak / 30, 1),
      connections: habit.currentStreak > 7 ? Math.floor(Math.random() * 3) + 1 : 0,
    }))
  }

  // Generate mandala data
  const generateMandalaData = () => {
    const rings = []
    const maxRing = 5

    for (let ring = 1; ring <= maxRing; ring++) {
      const segments = ring * 8
      for (let segment = 0; segment < segments; segment++) {
        const angle = (segment * 2 * Math.PI) / segments
        const radius = ring * 20

        // Find habit completion for this segment
        const dayIndex = (ring - 1) * segments + segment
        const date = new Date()
        date.setDate(date.getDate() - dayIndex)

        const completions = habits.filter((habit) => habit.completedDates.includes(date.toDateString())).length

        rings.push({
          ring,
          segment,
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          completions,
          intensity: completions / Math.max(habits.length, 1),
          color: `hsl(${(completions / Math.max(habits.length, 1)) * 120}, 70%, 50%)`,
        })
      }
    }

    return rings
  }

  // Generate 3D progress data
  const generate3DProgressData = () => {
    return habits.map((habit, index) => ({
      name: habit.name,
      currentStreak: habit.currentStreak,
      longestStreak: habit.longestStreak,
      completions: habit.completedDates.length,
      consistency: habit.completedDates.length > 0 ? (habit.currentStreak / habit.completedDates.length) * 100 : 0,
      height: Math.max(habit.currentStreak * 10, 20),
      color: `hsl(${(index * 360) / habits.length}, 70%, 50%)`,
    }))
  }

  const heatmapData = generateHeatmapData()
  const constellationData = generateConstellationData()
  const mandalaData = generateMandalaData()
  const progress3DData = generate3DProgressData()

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#84cc16", "#f97316"]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Advanced Visualizations</h3>
        <p className="text-gray-600">Beautiful and insightful ways to view your habit data</p>
      </div>

      <Tabs value={selectedVisualization} onValueChange={setSelectedVisualization} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
          <TabsTrigger value="constellation">Constellation</TabsTrigger>
          <TabsTrigger value="mandala">Mandala</TabsTrigger>
          <TabsTrigger value="3d-progress">3D Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="heatmap" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Habit Heatmap
              </CardTitle>
              <CardDescription>Your habit completion intensity over the past year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-53 gap-1 mb-4">
                {heatmapData.map((day, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-sm ${
                      day.level === 0
                        ? "bg-gray-100"
                        : day.level === 1
                          ? "bg-green-200"
                          : day.level === 2
                            ? "bg-green-300"
                            : day.level === 3
                              ? "bg-green-400"
                              : "bg-green-500"
                    }`}
                    title={`${day.date}: ${day.count} habits completed`}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Less</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 bg-gray-100 rounded-sm"></div>
                  <div className="w-3 h-3 bg-green-200 rounded-sm"></div>
                  <div className="w-3 h-3 bg-green-300 rounded-sm"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-sm"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                </div>
                <span>More</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="constellation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Habit Constellation
              </CardTitle>
              <CardDescription>
                Your habits as stars in a constellation - brighter stars represent stronger habits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative w-full h-96 bg-gradient-to-b from-indigo-900 to-purple-900 rounded-lg overflow-hidden">
                <svg width="100%" height="100%" viewBox="-150 -150 300 300">
                  {/* Draw connections between strong habits */}
                  {constellationData.map((habit, index) =>
                    constellationData.slice(index + 1).map((otherHabit, otherIndex) => {
                      if (habit.connections > 0 && otherHabit.connections > 0) {
                        return (
                          <line
                            key={`${index}-${otherIndex}`}
                            x1={habit.x}
                            y1={habit.y}
                            x2={otherHabit.x}
                            y2={otherHabit.y}
                            stroke="rgba(255,255,255,0.2)"
                            strokeWidth="1"
                          />
                        )
                      }
                      return null
                    }),
                  )}

                  {/* Draw habit stars */}
                  {constellationData.map((habit, index) => (
                    <g key={habit.id}>
                      <circle
                        cx={habit.x}
                        cy={habit.y}
                        r={habit.size}
                        fill={`rgba(255, 255, 255, ${0.3 + habit.brightness * 0.7})`}
                        className="animate-pulse"
                      />
                      <text
                        x={habit.x}
                        y={habit.y + habit.size + 15}
                        textAnchor="middle"
                        fill="white"
                        fontSize="10"
                        className="font-medium"
                      >
                        {habit.name.substring(0, 10)}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
              <div className="mt-4 text-center text-sm text-gray-600">
                Larger, brighter stars represent habits with longer streaks
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mandala" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Habit Mandala
              </CardTitle>
              <CardDescription>A beautiful circular representation of your habit completion patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <svg width="400" height="400" viewBox="-200 -200 400 400">
                  {mandalaData.map((segment, index) => (
                    <circle
                      key={index}
                      cx={segment.x}
                      cy={segment.y}
                      r={3 + segment.intensity * 5}
                      fill={segment.color}
                      opacity={0.3 + segment.intensity * 0.7}
                      className="transition-all duration-300 hover:opacity-100"
                    />
                  ))}

                  {/* Center circle */}
                  <circle cx="0" cy="0" r="15" fill="white" stroke="#3b82f6" strokeWidth="2" />
                  <text x="0" y="5" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">
                    YOU
                  </text>
                </svg>
              </div>
              <div className="mt-4 text-center text-sm text-gray-600">
                Each ring represents a week, with colors showing habit completion intensity
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="3d-progress" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                3D Progress Sculpture
              </CardTitle>
              <CardDescription>Your habits as 3D towers - height represents current streak strength</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                {progress3DData.map((habit, index) => (
                  <div key={index} className="text-center">
                    <div className="relative mx-auto mb-2" style={{ width: "60px", height: "120px" }}>
                      {/* 3D Tower Effect */}
                      <div
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 rounded-t-lg shadow-lg transition-all duration-500 hover:scale-110"
                        style={{
                          width: "40px",
                          height: `${Math.max(habit.height, 20)}px`,
                          background: `linear-gradient(135deg, ${habit.color}, ${habit.color}dd)`,
                          boxShadow: `4px 4px 8px rgba(0,0,0,0.2), inset -2px -2px 4px rgba(0,0,0,0.1)`,
                        }}
                      />
                      {/* Top cap */}
                      <div
                        className="absolute left-1/2 transform -translate-x-1/2 rounded-full"
                        style={{
                          width: "40px",
                          height: "8px",
                          background: `linear-gradient(135deg, ${habit.color}ee, ${habit.color})`,
                          bottom: `${Math.max(habit.height, 20)}px`,
                          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                        }}
                      />
                    </div>
                    <div className="text-xs font-medium text-gray-700 mb-1">{habit.name.substring(0, 12)}</div>
                    <div className="text-xs text-gray-500">{habit.currentStreak} day streak</div>
                  </div>
                ))}
              </div>

              {habits.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Create habits to see your 3D progress sculpture!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Visualization Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Visualization Insights</CardTitle>
          <CardDescription>Key metrics from your visual data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{heatmapData.filter((d) => d.level > 0).length}</div>
              <div className="text-sm text-gray-600">Active Days</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {Math.round((heatmapData.filter((d) => d.level > 0).length / 365) * 100)}%
              </div>
              <div className="text-sm text-gray-600">Year Completion</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {constellationData.filter((h) => h.brightness > 0.5).length}
              </div>
              <div className="text-sm text-gray-600">Bright Stars</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {Math.round((mandalaData.reduce((sum, s) => sum + s.intensity, 0) / mandalaData.length) * 100)}%
              </div>
              <div className="text-sm text-gray-600">Mandala Intensity</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
