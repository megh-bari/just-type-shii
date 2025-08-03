"use client"

import { COLORS } from "../constants/colors"

interface ColorPickerProps {
  textColor: string
  setTextColor: (color: string) => void
  showColorPicker: boolean
  setShowColorPicker: (show: boolean) => void
  onOpen: () => void
  isDark: boolean
}

export function ColorPicker({
  textColor,
  setTextColor,
  showColorPicker,
  setShowColorPicker,
  onOpen,
  isDark,
}: ColorPickerProps) {
  return (
    <div className="w-full">
  <button
    onClick={() => {
      setShowColorPicker(!showColorPicker);
      onOpen();
    }}
    className={`
      flex items-center justify-between gap-3 px-4 py-3 w-full border cursor-pointer
      transition-all duration-200 backdrop-blur-sm
      ${showColorPicker ? "rounded-t-2xl rounded-b-none" : "rounded-2xl"}
      ${isDark
        ? "bg-black border-neutral-800 text-white "
        : "bg-white border-neutral-300 text-black hover:bg-neutral-100 shadow-lg"
      }
    `}
  >
    <div className="flex items-center gap-3">
      <div
        className={`w-5 h-5 rounded-full border-2 ${isDark ? 'border-gray-600' : 'border-gray-300'}`}
        style={{ backgroundColor: textColor }}
      />
      <span className="font-medium">Colors</span>
    </div>
    <svg
      className={`h-4 w-4 transition-transform duration-200 ${showColorPicker ? "rotate-90" : ""}`}
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
      ${showColorPicker ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
      ${isDark ? "bg-black border-x border-b border-neutral-800" : "bg-white border-x border-b border-neutral-300"}
      backdrop-blur-sm shadow-xl rounded-b-2xl
    `}
  >
    <div className="p-4">
      <div className="grid grid-cols-5 gap-3">
        {COLORS.map((color, idx) => (
          <button
            key={idx}
            onClick={() => {
              setTextColor(color)
              setShowColorPicker(false)
            }}
            className={`
              w-9 h-9 rounded-full transition-all duration-150
              hover:scale-110 active:scale-95 cursor-pointer
              ${textColor === color
                ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-transparent shadow-lg" 
                : "hover:shadow-md border border-gray-200/50"
              }
            `}
            style={{ backgroundColor: color }}
            aria-label={`Select color ${color}`}
          />
        ))}
      </div>
    </div>
  </div>
</div>

  )
}