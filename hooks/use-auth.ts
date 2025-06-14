"use client"

import React from "react"

import { useState, useEffect, useCallback, createContext, useContext } from "react"
import type { ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Demo credentials
const DEMO_CREDENTIALS = {
  email: "raka.roy2004@gmail.com",
  password: "Riddhi",
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem("habittracker_user")
        const authToken = localStorage.getItem("habittracker_auth")

        if (storedUser && authToken) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Error checking auth:", error)
        // Clear invalid data
        localStorage.removeItem("habittracker_user")
        localStorage.removeItem("habittracker_auth")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check credentials
      if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
        const userData: User = {
          id: "demo-user-1",
          name: "Raka Roy",
          email: email,
        }

        // Store in localStorage
        localStorage.setItem("habittracker_user", JSON.stringify(userData))
        localStorage.setItem("habittracker_auth", "authenticated")

        setUser(userData)
        return true
      }

      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }, [])

  const signup = useCallback(async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, allow any signup but still require the demo credentials to actually use the app
      const userData: User = {
        id: `user-${Date.now()}`,
        name: name,
        email: email,
      }

      // Store in localStorage
      localStorage.setItem("habittracker_user", JSON.stringify(userData))
      localStorage.setItem("habittracker_auth", "authenticated")

      setUser(userData)
      return true
    } catch (error) {
      console.error("Signup error:", error)
      return false
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem("habittracker_user")
    localStorage.removeItem("habittracker_auth")
    setUser(null)
  }, [])

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth()

  return React.createElement(AuthContext.Provider, { value: auth }, children)
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider")
  }
  return context
}
