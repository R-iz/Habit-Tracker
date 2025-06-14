"use client"

import { useState, useEffect } from "react"
import { Activity, Heart, Moon, Droplets, Thermometer, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import type { Habit } from "@/lib/types"

interface BiometricData {
  date: string
  heartRate: number
  sleepQuality: number
  stepsCount: number
  hydrationLevel: number
  energyLevel: number
  stressLevel: number
}

interface HealthCorrelation {
  metric: string
  habitName: string
  correlation: number
  impact: "positive" | "negative" | "neutral"
  confidence: number
}

interface BiometricIntegrationProps {
  habits: Habit[]
}

export function BiometricIntegration({ habits }: BiometricIntegrationProps) {
  const [biometricData, setBiometricData] = useState<BiometricData[]>([])
  const [correlations, setCorrelations] = useState<HealthCorrelation[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)

  useEffect(() => {
    // Generate mock biometric data
    const generateMockData = () => {
      const data: BiometricData[] = []
      for (let i = 29; i >= 0; i--) {
        const date = new Date()
        date.setDate(date.getDate() - i)

        data.push({
          date: date.toISOString().split("T")[0],
          heartRate: 65 + Math.random() * 20,
          sleepQuality: 60 + Math.random() * 40,
          stepsCount: 5000 + Math.random() * 10000,
          hydrationLevel: 60 + Math.random() * 40,
          energyLevel: 50 + Math.random() * 50,
          stressLevel: 20 + Math.random() * 60,
        })
      }
      return data
    }

    // Generate mock correlations
    const generateCorrelations = (): HealthCorrelation[] => {
      if (habits.length === 0) return []

      return [
        {
          metric: "Sleep Quality",
          habitName: habits[0]?.name || "Exercise",
          correlation: 0.73,
          impact: "positive",
          confidence: 89,
        },
        {
          metric: "Energy Level",
          habitName: habits[1]?.name || "Meditation",
          correlation: 0.68,
          impact: "positive",
          confidence: 82,
        },
        {
          metric: "Stress Level",
          habitName: habits[0]?.name || "Reading",
          correlation: -0.45,
          impact: "positive",
          confidence: 76,
        },
        {
          metric: "Heart Rate Variability",
          habitName: habits[2]?.name || "Hydration",
          correlation: 0.52,
          impact: "positive",
          confidence: 71,
        },
      ]
    }

    setBiometricData(generateMockData())
    setCorrelations(generateCorrelations())
  }, [habits])

  const connectDevice = async () => {
    setIsConnecting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsConnected(true)
    setIsConnecting(false)
  }

  const getCorrelationColor = (correlation: number) => {
    const abs = Math.abs(correlation)
    if (abs >= 0.7) return "text-green-600 bg-green-100"
    if (abs >= 0.5) return "text-yellow-600 bg-yellow-100"
    return "text-gray-600 bg-gray-100"
  }

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case "positive":
        return <Zap className="h-4 w-4 text-green-600" />
      case "negative":
        return <Zap className="h-4 w-4 text-red-600" />
      default:
        return <Zap className="h-4 w-4 text-gray-600" />
    }
  }

  const latestData = biometricData[biometricData.length - 1]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Health & Biometric Integration</h3>
          <p className="text-gray-600">Connect your health data to understand habit impacts</p>
        </div>

        {!isConnected ? (
          <Button onClick={connectDevice} disabled={isConnecting} className="gap-2">
            <Activity className="h-4 w-4" />
            {isConnecting ? "Connecting..." : "Connect Device"}
          </Button>
        ) : (
          <Badge variant="default" className="bg-green-100 text-green-800 gap-1">
            <Activity className="h-3 w-3" />
            Connected
          </Badge>
        )}
      </div>

      {!isConnected ? (
        <Alert>
          <Activity className="h-4 w-4" />
          <AlertDescription>
            Connect your fitness tracker or health app to see how your habits impact your wellbeing. We support Apple
            Health, Google Fit, Fitbit, and more.
          </AlertDescription>
        </Alert>
      ) : (
        <>
          {/* Current Health Metrics */}
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Heart className="h-4 w-4 text-red-500" />
                  Heart Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{Math.round(latestData?.heartRate || 0)}</div>
                <p className="text-xs text-gray-600">bpm</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Moon className="h-4 w-4 text-blue-500" />
                  Sleep Quality
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{Math.round(latestData?.sleepQuality || 0)}%</div>
                <p className="text-xs text-gray-600">quality score</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Activity className="h-4 w-4 text-green-500" />
                  Steps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{Math.round(latestData?.stepsCount || 0).toLocaleString()}</div>
                <p className="text-xs text-gray-600">today</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-blue-400" />
                  Hydration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{Math.round(latestData?.hydrationLevel || 0)}%</div>
                <p className="text-xs text-gray-600">of goal</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  Energy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{Math.round(latestData?.energyLevel || 0)}%</div>
                <p className="text-xs text-gray-600">level</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Thermometer className="h-4 w-4 text-orange-500" />
                  Stress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{Math.round(latestData?.stressLevel || 0)}%</div>
                <p className="text-xs text-gray-600">level</p>
              </CardContent>
            </Card>
          </div>

          {/* Health Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Health Trends (30 Days)</CardTitle>
              <CardDescription>Track how your health metrics change over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Sleep Quality Trend</span>
                    <span>{Math.round(latestData?.sleepQuality || 0)}%</span>
                  </div>
                  <Progress value={latestData?.sleepQuality || 0} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Energy Level Trend</span>
                    <span>{Math.round(latestData?.energyLevel || 0)}%</span>
                  </div>
                  <Progress value={latestData?.energyLevel || 0} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Stress Level (Lower is Better)</span>
                    <span>{Math.round(latestData?.stressLevel || 0)}%</span>
                  </div>
                  <Progress value={100 - (latestData?.stressLevel || 0)} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Habit-Health Correlations */}
          <Card>
            <CardHeader>
              <CardTitle>Habit-Health Correlations</CardTitle>
              <CardDescription>Discover how your habits impact your health metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {correlations.map((correlation, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getImpactIcon(correlation.impact)}
                    <div>
                      <h4 className="font-medium">
                        {correlation.habitName} → {correlation.metric}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {correlation.correlation > 0 ? "Positive" : "Negative"} correlation detected
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getCorrelationColor(correlation.correlation)}>
                      {Math.abs(correlation.correlation * 100).toFixed(0)}% correlation
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">{correlation.confidence}% confidence</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Health Insights */}
          <Card>
            <CardHeader>
              <CardTitle>Health Insights</CardTitle>
              <CardDescription>AI-powered recommendations based on your health data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Heart className="h-4 w-4" />
                <AlertDescription>
                  <strong>Sleep Optimization:</strong> Your exercise habit shows a strong positive correlation with
                  sleep quality. Consider exercising earlier in the day for better sleep.
                </AlertDescription>
              </Alert>

              <Alert>
                <Zap className="h-4 w-4" />
                <AlertDescription>
                  <strong>Energy Boost:</strong> Your meditation habit correlates with higher energy levels. Try
                  meditating during your afternoon energy dip.
                </AlertDescription>
              </Alert>

              <Alert>
                <Activity className="h-4 w-4" />
                <AlertDescription>
                  <strong>Stress Management:</strong> Your reading habit helps reduce stress levels. Consider reading
                  during high-stress periods for better balance.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
