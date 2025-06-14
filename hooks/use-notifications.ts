"use client"

import { useState, useCallback } from "react"

export function useNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>("default")

  const requestPermission = useCallback(async () => {
    if (!("Notification" in window)) {
      console.log("This browser does not support notifications")
      return false
    }

    if (Notification.permission === "granted") {
      setPermission("granted")
      return true
    }

    if (Notification.permission !== "denied") {
      const result = await Notification.requestPermission()
      setPermission(result)
      return result === "granted"
    }

    setPermission(Notification.permission)
    return false
  }, [])

  const showNotification = useCallback((title: string, options?: NotificationOptions) => {
    if (Notification.permission === "granted") {
      new Notification(title, {
        icon: "/icon-192x192.png",
        badge: "/icon-192x192.png",
        ...options,
      })
    }
  }, [])

  const scheduleHabitReminder = useCallback(
    (habitName: string, time: string) => {
      // This is a simplified version - in production, you'd use service workers
      // and the Push API for proper scheduling
      const now = new Date()
      const [hours, minutes] = time.split(":").map(Number)
      const reminderTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes)

      if (reminderTime <= now) {
        reminderTime.setDate(reminderTime.getDate() + 1)
      }

      const timeUntilReminder = reminderTime.getTime() - now.getTime()

      setTimeout(() => {
        showNotification(`Time for your habit: ${habitName}`, {
          body: "Don't break your streak! Complete your habit now.",
          tag: `habit-${habitName}`,
          requireInteraction: true,
        })
      }, timeUntilReminder)

      console.log(`Reminder set for ${habitName} at ${time}`)
    },
    [showNotification],
  )

  return {
    permission,
    requestPermission,
    showNotification,
    scheduleHabitReminder,
  }
}
