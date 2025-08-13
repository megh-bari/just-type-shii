"use client"

import { Plus, Minus, Type } from "lucide-react"

interface FontSizePickerProps {
  fontSize: number
  increaseFontSize: () => void
  decreaseFontSize: () => void
  showFontSize: boolean
  setShowFontSize: (show: boolean) => void
  showColorPicker: boolean
  onOpen: () => void
  isDark: boolean
}
export function FontSizePicker({
  fontSize,
  increaseFontSize,
  decreaseFontSize,
  showFontSize,
  setShowFontSize,
  isDark,
}: FontSizePickerProps) {
  return (
    <div className="w-full">
      <button
        onClick={() => setShowFontSize(!showFontSize)}
  aria-controls="font-size-panel"
  aria-expanded={showFontSize}
        className={`
          flex items-center justify-between gap-3 px-4 py-3 w-full border
          transition-all duration-200 backdrop-blur-sm cursor-pointer
          ${showFontSize ? "rounded-t-2xl rounded-b-none" : "rounded-2xl"}
          ${isDark
            ? "bg-black border-neutral-800 text-white hover:bg-neutral-900"
            : "bg-white border-neutral-300 text-black hover:bg-neutral-100 shadow-lg"
          }
        `}
      >
        <div className="flex items-center gap-3">
          <Type className="w-5 h-5" />
          <span className="font-medium">Font Size</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-sm font-mono px-2 py-1 rounded ${isDark    ? "bg-neutral-900 text-white border border-neutral-800"
              : "bg-neutral-100 text-neutral-800 border border-neutral-300"}`}>
            {fontSize}px
          </span>
          <svg
            className={`h-4 w-4 transition-transform duration-200 ${showFontSize ? "rotate-90" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </button>

      {/* Minimal accordion */}
      <div
        className={`
          overflow-hidden transition-all duration-300 ease-out
          ${showFontSize ? "max-h-32 opacity-100" : "max-h-0 opacity-0"}
          ${isDark
            ? "bg-black border-x border-b border-neutral-800"
            : "bg-white border-x border-b border-neutral-300"
          }
          backdrop-blur-sm shadow-xl rounded-b-2xl
        `}
  id="font-size-panel"
      >
        <div className="p-4">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={decreaseFontSize}
              className={`
                w-11 h-11 rounded-xl border flex items-center justify-center
                transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer
                ${isDark
                  ? "bg-neutral-900 border-neutral-700 hover:bg-neutral-800 text-white hover:border-neutral-600"
                  : "bg-neutral-100 border-neutral-300 hover:bg-neutral-200 text-neutral-700 hover:border-neutral-400"
                }
              `}
              aria-label="Decrease font size"
            >
              <Minus className="h-5 w-5" />
            </button>

            <div className={`
              px-4 py-2 rounded-xl font-mono text-lg min-w-[80px] text-center
              ${isDark
                ? "bg-black text-white border border-neutral-800"
                : "bg-neutral-100 text-neutral-800 border border-neutral-300"
              }
            `}>
              {fontSize}px
            </div>

            <button
              onClick={increaseFontSize}
              className={`
                w-11 h-11 rounded-xl border flex items-center justify-center
                transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer
                ${isDark
                  ? "bg-neutral-900 border-neutral-700 hover:bg-neutral-800 text-white hover:border-neutral-600"
                  : "bg-neutral-100 border-neutral-300 hover:bg-neutral-200 text-neutral-700 hover:border-neutral-400"
                }
              `}
              aria-label="Increase font size"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
