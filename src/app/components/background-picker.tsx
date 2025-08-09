"use client"
import { BGCOLORS } from "../constants/bg-color"

interface BackgroundPickerProps {
  backgroundColor: string
  setBackgroundColor: (color: string) => void
  showBackgroundPicker: boolean
  setShowBackgroundPicker: (show: boolean) => void
  onOpen: () => void
  isDark: boolean
}

export function BackgroundPicker({
  backgroundColor,
  setBackgroundColor,
  showBackgroundPicker,
  setShowBackgroundPicker,
  onOpen,
  isDark,
}: BackgroundPickerProps) {
  const handleColorSelect = (color: string) => {
    // console.log('Background color selected:', color) // for Debug 
    setBackgroundColor(color)
    setShowBackgroundPicker(false)
  }

  return (
    <div className="w-full">
      <button
        onClick={() => {
          setShowBackgroundPicker(!showBackgroundPicker);
          onOpen();
        }}
        className={`
          flex items-center justify-between gap-3 px-4 py-3 w-full border cursor-pointer
          transition-all duration-200 backdrop-blur-sm
          ${showBackgroundPicker ? "rounded-t-2xl rounded-b-none" : "rounded-2xl"}
          ${isDark
            ? "bg-black border-neutral-800 text-white hover:bg-neutral-900"
            : "bg-white border-neutral-300 text-black hover:bg-neutral-100 shadow-lg"
          }
        `}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-5 h-5 rounded-full border-2 ${isDark ? 'border-gray-600' : 'border-gray-300'}`}
            style={{ backgroundColor: backgroundColor }}
          />
          <span className="font-medium">Background</span>
        </div>
        <svg
          className={`h-4 w-4 transition-transform duration-200 ${showBackgroundPicker ? "rotate-90" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      <div
        className={`
          overflow-hidden transition-all duration-300 ease-out
          ${showBackgroundPicker ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
          ${isDark ? "bg-black border-x border-b border-neutral-800" : "bg-white border-x border-b border-neutral-300"}
          backdrop-blur-sm shadow-xl rounded-b-2xl
        `}
      >
        <div className="p-4">
          <div className="grid grid-cols-5 gap-3">
            {BGCOLORS.map((color, idx) => (
              <button
                key={idx}
                onClick={() => handleColorSelect(color)}
                className={`
                  w-9 h-9 rounded-full transition-all duration-150
                  hover:scale-110 active:scale-95 cursor-pointer
                  ${backgroundColor === color
                    ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-transparent shadow-lg" 
                    : "hover:shadow-md border border-gray-200/50"
                  }
                `}
                style={{ backgroundColor: color }}
                aria-label={`Select background color ${color}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}