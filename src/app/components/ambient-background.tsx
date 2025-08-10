"use client"

import { useEffect, useState } from "react"

interface AmbientBackgroundProps {
  backgroundColor: string
  isDark: boolean
}

export function AmbientBackground({ backgroundColor, isDark }: AmbientBackgroundProps) {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReducedMotion(mq.matches)
    update()
    mq.addEventListener?.("change", update)
    return () => mq.removeEventListener?.("change", update)
  }, [])

  // Convert hex to rgba with opacity
  const hexToRgba = (hex: string, opacity: number) => {
    // Remove # if present
    hex = hex.replace('#', '')
    
    // Convert to RGB
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)
    
    return `rgba(${r}, ${g}, ${b}, ${opacity})`
  }

  return (
    <div
      className={`fixed inset-0 pointer-events-none transition-all ${reducedMotion ? "duration-0" : "duration-1000"} z-0`}
      style={{
        background: reducedMotion
          ? isDark
            ? hexToRgba(backgroundColor, 0.13) // 22 in hex = ~0.13 opacity
            : hexToRgba(backgroundColor, 0.09) // 18 in hex = ~0.09 opacity
          : isDark
            ? `radial-gradient(circle at 50% 50%, ${hexToRgba(backgroundColor, 0.12)} 0%, transparent 70%)`
            : `radial-gradient(circle at 50% 50%, ${hexToRgba(backgroundColor, 0.44)} 0%, ${hexToRgba(backgroundColor, 0.13)} 50%, transparent 70%)`,
        opacity: isDark ? 0.3 : 1,
      }}
    />
  )
}