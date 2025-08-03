"use client"

import { useEffect, type RefObject } from "react"

export function useAutoFocus(inputRef: RefObject<HTMLTextAreaElement>) {
  useEffect(() => {
    const focusInput = () => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }

    focusInput()

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't interfere with existing focused elements
      if (document.activeElement === inputRef.current) return

      // Focus on any printable character
      if (e.key.length === 1) {
        focusInput()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [inputRef])
}
