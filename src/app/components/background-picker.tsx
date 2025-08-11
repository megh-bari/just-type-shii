"use client"

import { useState } from "react"
import { BGCOLORS } from "../constants/bg-color"
import { CustomColorPicker } from "./custom-color-picker"

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
  const [activeTab, setActiveTab] = useState<'presets' | 'custom'>('presets')

  const handleColorSelect = (color: string) => {
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
        aria-controls="bg-picker-panel"
        aria-expanded={showBackgroundPicker}
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
          ${showBackgroundPicker ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
          ${isDark ? "bg-black border-x border-b border-neutral-800" : "bg-white border-x border-b border-neutral-300"}
          backdrop-blur-sm shadow-xl rounded-b-2xl
        `}
        id="bg-picker-panel"
      >
        {/* Tab Navigation */}
        <div className={`flex border-b ${isDark ? 'border-neutral-800' : 'border-neutral-300'}`}>
          <button
            onClick={() => setActiveTab('presets')}
            className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'presets'
                ? isDark 
                  ? 'text-white border-b-2 border-blue-500' 
                  : 'text-black border-b-2 border-blue-500'
                : isDark 
                  ? 'text-gray-400 hover:text-gray-300' 
                  : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Presets
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'custom'
                ? isDark 
                  ? 'text-white border-b-2 border-blue-500' 
                  : 'text-black border-b-2 border-blue-500'
                : isDark 
                  ? 'text-gray-400 hover:text-gray-300' 
                  : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Custom
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4">
          {activeTab === 'presets' ? (
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
          ) : (
            <CustomColorPicker
              value={backgroundColor}
              onChange={setBackgroundColor}
              isDark={isDark}
            />
          )}
        </div>
      </div>
    </div>
  )
}