"use client"

import { useState, useEffect } from "react"

interface CustomColorPickerProps {
  value: string
  onChange: (color: string) => void
  isDark: boolean
}

export function CustomColorPicker({ value, onChange, isDark }: CustomColorPickerProps) {
  const [hexValue, setHexValue] = useState(value)
  const [hue, setHue] = useState(0)
  const [saturation, setSaturation] = useState(100)
  const [lightness, setLightness] = useState(50)

  // Convert hex to HSL when value changes
  useEffect(() => {
    // Ensure we have a valid hex value
    const validHex = isValidHex(value) ? value : '#ffffff'
    setHexValue(validHex)
    
    const hsl = hexToHsl(validHex)
    if (hsl) {
      setHue(hsl.h)
      setSaturation(hsl.s)
      setLightness(hsl.l)
    }
  }, [value])

  // Convert HSL to hex and update parent
  const handleHslChange = (h: number, s: number, l: number) => {
    setHue(h)
    setSaturation(s)
    setLightness(l)
    const hex = hslToHex(h, s, l)
    setHexValue(hex)
    onChange(hex)
  }

  // Handle direct hex input
  const handleHexChange = (hex: string) => {
    setHexValue(hex)
    if (isValidHex(hex)) {
      onChange(hex)
      const hsl = hexToHsl(hex)
      if (hsl) {
        setHue(hsl.h)
        setSaturation(hsl.s)
        setLightness(hsl.l)
      }
    }
  }

  return (
    <div className="space-y-4">
      {/* Color preview */}
      <div className="flex items-center gap-3">
        <div
          className={`w-12 h-12 rounded-lg border-2 ${isDark ? 'border-gray-600' : 'border-gray-300'}`}
          style={{ backgroundColor: hexValue }}
        />
        <div className="flex-1">
          <input
            type="text"
            value={hexValue}
            onChange={(e) => handleHexChange(e.target.value)}
            className={`w-full px-3 py-2 text-sm rounded-lg border ${
              isDark 
                ? 'bg-gray-800 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-black'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="#000000"
            maxLength={7}
          />
        </div>
      </div>

      {/* Hue slider */}
      <div className="space-y-2">
        <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          Hue: {Math.round(hue)}°
        </label>
        <input
          type="range"
          min="0"
          max="360"
          value={hue}
          onChange={(e) => handleHslChange(Number(e.target.value), saturation, lightness)}
          className="w-full h-3 rounded-lg appearance-none cursor-pointer hue-slider"
          style={{
            background: `linear-gradient(to right, 
              hsl(0, 100%, 50%), 
              hsl(60, 100%, 50%), 
              hsl(120, 100%, 50%), 
              hsl(180, 100%, 50%), 
              hsl(240, 100%, 50%), 
              hsl(300, 100%, 50%), 
              hsl(360, 100%, 50%))`
          }}
        />
      </div>

      {/* Saturation slider */}
      <div className="space-y-2">
        <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          Saturation: {Math.round(saturation)}%
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={saturation}
          onChange={(e) => handleHslChange(hue, Number(e.target.value), lightness)}
          className="w-full h-3 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, 
              hsl(${hue}, 0%, ${lightness}%), 
              hsl(${hue}, 100%, ${lightness}%))`
          }}
        />
      </div>

      {/* Lightness slider */}
      <div className="space-y-2">
        <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          Lightness: {Math.round(lightness)}%
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={lightness}
          onChange={(e) => handleHslChange(hue, saturation, Number(e.target.value))}
          className="w-full h-3 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, 
              hsl(${hue}, ${saturation}%, 0%), 
              hsl(${hue}, ${saturation}%, 50%), 
              hsl(${hue}, ${saturation}%, 100%))`
          }}
        />
      </div>
    </div>
  )
}

// Utility functions
function hexToHsl(hex: string): { h: number; s: number; l: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return null

  const r = parseInt(result[1], 16) / 255
  const g = parseInt(result[2], 16) / 255
  const b = parseInt(result[3], 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max === min) {
    h = s = 0 // achromatic
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    h /= 6
  }

  return { h: h * 360, s: s * 100, l: l * 100 }
}

function hslToHex(h: number, s: number, l: number): string {
  h = h / 360
  s = s / 100
  l = l / 100

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1/6) return p + (q - p) * 6 * t
    if (t < 1/2) return q
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
    return p
  }

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s
  const p = 2 * l - q
  const r = hue2rgb(p, q, h + 1/3)
  const g = hue2rgb(p, q, h)
  const b = hue2rgb(p, q, h - 1/3)

  const toHex = (c: number) => {
    const hex = Math.round(c * 255).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

function isValidHex(hex: string): boolean {
  return /^#[0-9A-F]{6}$/i.test(hex)
}
