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

  return (
    <div
      className={`fixed inset-0 pointer-events-none transition-all ${reducedMotion ? "duration-0" : "duration-1000"} z-0`}
      style={{
        background: reducedMotion
          ? isDark
            ? `${backgroundColor}22`
            : `${backgroundColor}18`
          : isDark
            ? `radial-gradient(circle at 50% 50%, ${backgroundColor}20 0%, transparent 70%)`
            : `radial-gradient(circle at 50% 50%, ${backgroundColor}70 0%, ${backgroundColor}22 50%, transparent 70%)`,
        opacity: isDark ? 0.3 : 1,
      }}
    />
  )
}