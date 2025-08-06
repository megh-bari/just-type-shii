"use client"

import { Sun, Moon } from "lucide-react"

interface ThemeToggleProps {
  showControls: boolean
  isDark: boolean
  toggleTheme: () => void
}

export function ThemeToggle({ showControls, isDark, toggleTheme }: ThemeToggleProps) {
  return (
    <div
      className={`fixed top-6 right-6 z-50 transition-all duration-300 ${
        showControls ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
      }`}
    >
      <button
        onClick={toggleTheme}
        className={`
          w-10 h-10 cursor-pointer rounded-full backdrop-blur-sm border transition-colors duration-300 flex items-center justify-center
          ${isDark
            ? "bg-black border-neutral-800 text-white hover:bg-[#181818]"
            : "bg-white border-gray-300 text-black hover:bg-gray-100/60"
          }
        `}
      >
        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-5 w-5" />}
      </button>
    </div>
  )
}
