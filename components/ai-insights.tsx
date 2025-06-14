"use client"

import { useState, useEffect } from "react"
import { Brain, TrendingUp, AlertTriangle, Lightbulb } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { Habit } from "@/lib/types"

interface AIInsight {
  id: string
  type: "prediction" | "suggestion" | "warning" | "achievement"
  title: string
  description: string
  confidence: number
  actionable: boolean
  data?: any
}

interface AIInsightsProps {
  habits: Habit[]
}

export function AIInsights({ habits }: AIInsightsProps) {
  const [insights, setInsights] = useState<AIInsight[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(true)

  useEffect(() => {
    const generateInsights = async () => {
      setIsAnalyzing(true)

      // Simulate AI analysis
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const mockInsights: AIInsight[] = [
        {
          id: "insight-1",
          type: "prediction",
          title: "High Risk Day Detected",
          description:
            "Based on your patterns, you're 73% likely to struggle with habits this Friday. Consider preparing backup strategies.",
          confidence: 73,
          actionable: true,
          data: { riskDay: "Friday", riskFactors: ["Weekend transition", "Lower energy patterns"] },
        },
        {
          id: "insight-2",
          type: "suggestion",
          title: "Optimal Habit Stacking Opportunity",
          description:
            "Your 'Morning Coffee' habit has a 95% completion rate. Consider stacking 'Read 5 pages' immediately after.",
          confidence: 89,
          actionable: true,
          data: { anchorHabit: "Morning Coffee", suggestedHabit: "Reading" },
        },
        {
          id: "insight-3",
          type: "achievement",
          title: "Consistency Pattern Recognized",
          description:
            "You've developed a strong Monday-Wednesday-Friday exercise pattern. This shows excellent routine building!",
          confidence: 92,
          actionable: false,
          data: { pattern: "MWF", habitType: "Exercise" },
        },
        {
          id: "insight-4",
          type: "warning",
          title: "Habit Conflict Detected",
          description:
            "Your 'Late Night Reading' and 'Early Morning Workout' habits may be conflicting. Consider adjusting timing.",
          confidence: 67,
          actionable: true,
          data: { conflictingHabits: ["Late Night Reading", "Early Morning Workout"] },
        },
        {
          id: "insight-5",
          type: "suggestion",
          title: "Weather-Based Adaptation",
          description:
            "Rainy days reduce your outdoor exercise completion by 45%. Consider adding indoor workout alternatives.",
          confidence: 78,
          actionable: true,
          data: { weatherImpact: "Rain", affectedHabit: "Outdoor Exercise", reduction: 45 },
        },
      ]

      setInsights(mockInsights)
      setIsAnalyzing(false)
    }

    if (habits.length > 0) {
      generateInsights()
    } else {
      setIsAnalyzing(false)
    }
  }, [habits])

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "prediction":
        return <Brain className="h-5 w-5 text-purple-600" />
      case "suggestion":
        return <Lightbulb className="h-5 w-5 text-yellow-600" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-red-600" />
      case "achievement":
        return <TrendingUp className="h-5 w-5 text-green-600" />
      default:
        return <Brain className="h-5 w-5 text-blue-600" />
    }
  }

  const getInsightColor = (type: string) => {
    switch (type) {
      case "prediction":
        return "border-purple-200 bg-purple-50"
      case "suggestion":
        return "border-yellow-200 bg-yellow-50"
      case "warning":
        return "border-red-200 bg-red-50"
      case "achievement":
        return "border-green-200 bg-green-50"
      default:
        return "border-blue-200 bg-blue-50"
    }
  }

  if (isAnalyzing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-600" />
            AI Insights
          </CardTitle>
          <CardDescription>Analyzing your habit patterns...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Generating insights...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">AI-Powered Insights</h3>
        <p className="text-gray-600">Personalized recommendations based on your habit patterns</p>
      </div>

      <div className="grid gap-4">
        {insights.map((insight) => (
          <Card key={insight.id} className={`border-l-4 ${getInsightColor(insight.type)}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {getInsightIcon(insight.type)}
                  <CardTitle className="text-lg">{insight.title}</CardTitle>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {insight.confidence}% confidence
                  </Badge>
                  {insight.actionable && (
                    <Badge variant="outline" className="text-xs">
                      Actionable
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-3">{insight.description}</p>
              <Progress value={insight.confidence} className="h-2" />

              {insight.data && (
                <div className="mt-4 p-3 bg-white/50 rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Analysis Details:</h4>
                  <div className="text-xs text-gray-600 space-y-1">
                    {Object.entries(insight.data).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="capitalize">{key.replace(/([A-Z])/g, " $1").trim()}:</span>
                        <span className="font-medium">{Array.isArray(value) ? value.join(", ") : String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {habits.length === 0 && (
        <Alert>
          <Brain className="h-4 w-4" />
          <AlertDescription>
            Start tracking habits to unlock AI-powered insights and personalized recommendations!
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
