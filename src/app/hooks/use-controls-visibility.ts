"use client"

import { useState, useRef } from "react"

interface UseControlsVisibilityOptions {
  onHide?: () => void
  timeout?: number
}

export function useControlsVisibility({ onHide, timeout = 2000 }: UseControlsVisibilityOptions = {}) {
  const [showControls, setShowControls] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseMove = () => {
    setShowControls(true)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      setShowControls(false)
      onHide?.()
    }, timeout)
  }

  return {
    showControls,
    handleMouseMove,
  }
}
