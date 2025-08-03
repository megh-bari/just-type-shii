"use client"

import { useState, useEffect } from "react"

export function useTheme() {
  const [isDark, setIsDark] = useState(true)

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("just-type-shii-theme")
    if (savedTheme) {
      setIsDark(savedTheme === "dark")
    } else {
      // Check system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setIsDark(prefersDark)
    }
  }, [])

  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("just-type-shii-theme", isDark ? "dark" : "light")
  }, [isDark])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return {
    isDark,
    toggleTheme,
  }
}
