"use client"

import { useState, useRef } from "react"
import { ThemeToggle } from "./theme-toggle"
import { ColorPicker } from "./color-picker"
import { FontSizePicker } from "./font-size-picker"
import { TextArea } from "./text-area"
import { Title } from "./title"
import { AmbientBackground } from "./ambient-background"
import { useAutoFocus } from "../hooks/use-auto-focus"
import { useControlsVisibility } from "../hooks/use-controls-visibility"

export default function JustTypeShii() {
    const [isDark, setIsDark] = useState(true)
    const [textColor, setTextColor] = useState("#ffffff")
    const [fontSize, setFontSize] = useState(32)
    const [text, setText] = useState("")
    const [showColorPicker, setShowColorPicker] = useState(false)
    const [showFontSize, setShowFontSize] = useState(false)

    const inputRef = useRef<HTMLTextAreaElement>(null) as React.RefObject<HTMLTextAreaElement>

    const { showControls, handleMouseMove } = useControlsVisibility({
        onHide: () => {
            setShowColorPicker(false)
            setShowFontSize(false)
        },
    })

    useAutoFocus(inputRef)

    const increaseFontSize = () => {
        setFontSize((prev) => Math.min(prev + 4, 120))
    }

    const decreaseFontSize = () => {
        setFontSize((prev) => Math.max(prev - 4, 12))
    }

    const toggleTheme = () => {
        setIsDark(!isDark)
        if (!isDark) {
            // Switching to dark mode
            if (textColor === "#000000") {
                setTextColor("#ffffff")
            }
        } else {
            // Switching to light mode
            if (textColor === "#ffffff") {
                setTextColor("#000000")
            }
        }
    }

    return (
        <div
            className={`min-h-screen relative overflow-hidden transition-colors duration-500 ${isDark ? "bg-black text-white" : "bg-white text-black"
                }`}
            onMouseMove={handleMouseMove}
        >
            <ThemeToggle showControls={showControls} isDark={isDark} toggleTheme={toggleTheme} />

            <div className={`
 fixed top-4/5 left-6 -translate-y-1/2 z-50
  sm:top-1/2 sm:-translate-y-1/2 sm:fixed sm:left-6 sm:z-50
  w-[240px] flex flex-col gap-3
  transition-all duration-300 ease-out
  ${showControls
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-12 pointer-events-none"
                }
`}>
                {/* Colors Section: expands/collapses */}
                <ColorPicker
                    textColor={textColor}
                    setTextColor={setTextColor}
                    showColorPicker={showColorPicker}
                    setShowColorPicker={setShowColorPicker}
                    onOpen={() => { }}
                    isDark={isDark}
                />

                {/* Font Size Section */}
                <FontSizePicker
                    fontSize={fontSize}
                    increaseFontSize={increaseFontSize}
                    decreaseFontSize={decreaseFontSize}
                    showFontSize={showFontSize}
                    setShowFontSize={setShowFontSize}
                    showColorPicker={showColorPicker}
                    onOpen={() => { }}
                    isDark={isDark}
                />
            </div>


            <TextArea ref={inputRef} text={text} setText={setText} textColor={textColor} fontSize={fontSize} />

            <Title showControls={showControls} isDark={isDark} />
            <AmbientBackground textColor={textColor} />
        </div>
    )
}
