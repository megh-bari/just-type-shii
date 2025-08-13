"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { ThemeToggle } from "./theme-toggle"
import { ColorPicker } from "./color-picker"
import { BackgroundPicker } from "./background-picker"
import { FontSizePicker } from "./font-size-picker"
import { FontPicker } from "./font-picker"
import { TextArea } from "./text-area"
import { Title } from "./title"
import { AmbientBackground } from "./ambient-background"
import { useAutoFocus } from "../hooks/use-auto-focus"
import { useControlsVisibility } from "../hooks/use-controls-visibility"
import { DownloadButton } from "./download-btn"
import { useSearchParams, useRouter } from "next/navigation"
import ToastMsg from "./toast-msg"
export default function JustTypeShii() {
    const [isDark, setIsDark] = useState(true)
    const [textColor, setTextColor] = useState("#ffffff")
    const [backgroundColor, setBackgroundColorState] = useState("#ffffff")
    
    const setBackgroundColor = (color: string) => {
        setBackgroundColorState(color)
    }
    const [fontSize, setFontSize] = useState(32)
    const [selectedFont, setSelectedFont] = useState("font-doto") // Default to Doto-Bold
    const [text, setText] = useState("")
    const [showColorPicker, setShowColorPicker] = useState(false)
    const [showBackgroundPicker, setShowBackgroundPicker] = useState(false)
    const [showFontSize, setShowFontSize] = useState(false)
    const [showFontPicker, setShowFontPicker] = useState(false)

    const inputRef = useRef<HTMLTextAreaElement>(null) as React.RefObject<HTMLTextAreaElement>
    const [toastMsg, setToastMsg] = useState<string | null>(null)
    const toastTimer = useRef<number | null>(null)
    const searchParams = useSearchParams()
    const router = useRouter()

    const { showControls, handleMouseMove } = useControlsVisibility({
        onHide: () => {
            setShowColorPicker(false)
            setShowBackgroundPicker(false)
            setShowFontSize(false)
            setShowFontPicker(false)
        },
    })

    useAutoFocus(inputRef)

    // Load initial state from URL or localStorage
    useEffect(() => {
        try {
            const paramsIsDark = searchParams.get("dark")
            const paramsText = searchParams.get("t")
            const paramsColor = searchParams.get("c")
            const paramsBg = searchParams.get("bg")
            const paramsFs = searchParams.get("fs")
            const paramsFont = searchParams.get("font")

            const ls = typeof window !== 'undefined' ? window.localStorage : null
            const getLS = (k: string) => ls?.getItem(k) ?? undefined

            setIsDark(paramsIsDark ? paramsIsDark === "1" : (getLS("jts_dark") ?? "1") === "1")
            setText(paramsText ?? getLS("jts_text") ?? "")
            setTextColor(paramsColor ?? getLS("jts_color") ?? "#ffffff")
            setBackgroundColorState(paramsBg ?? getLS("jts_bg") ?? "#ffffff")
            const fs = parseInt(paramsFs ?? getLS("jts_fs") ?? "32", 10)
            setFontSize(Number.isFinite(fs) ? Math.min(Math.max(fs, 12), 120) : 32)
            setSelectedFont(paramsFont ?? getLS("jts_font") ?? "font-doto")
        } catch {
            // noop
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Persist to localStorage and URL (shallow replace)
    useEffect(() => {
        if (typeof window === 'undefined') return
        try {
            const ls = window.localStorage
            ls.setItem("jts_dark", isDark ? "1" : "0")
            ls.setItem("jts_text", text)
            ls.setItem("jts_color", textColor)
            ls.setItem("jts_bg", backgroundColor)
            ls.setItem("jts_fs", String(fontSize))
            ls.setItem("jts_font", selectedFont)

            const params = new URLSearchParams()
            if (isDark) params.set("dark", "1")
            if (text) params.set("t", text)
            if (textColor) params.set("c", textColor)
            if (backgroundColor) params.set("bg", backgroundColor)
            if (fontSize !== 32) params.set("fs", String(fontSize))
            if (selectedFont !== "font-doto") params.set("font", selectedFont)
            const qs = params.toString()
            const id = window.setTimeout(() => {
                router.replace(qs ? `/?${qs}` : "/")
            }, 250)
            return () => window.clearTimeout(id)
        } catch {
            // ignore
        }
    }, [isDark, text, textColor, backgroundColor, fontSize, selectedFont, router])

    const increaseFontSize = useCallback(() => {
        setFontSize((prev) => Math.min(prev + 4, 120))
    }, [])

    const decreaseFontSize = useCallback(() => {
        setFontSize((prev) => Math.max(prev - 4, 12))
    }, [])

    const toggleTheme = useCallback(() => {
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
    }, [isDark, textColor])

    // Keyboard shortcuts
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && (e.key === "+" || e.key === "=")) {
                e.preventDefault(); increaseFontSize();
            } else if ((e.ctrlKey || e.metaKey) && (e.key === "-")) {
                e.preventDefault(); decreaseFontSize();
            } else if (e.key.toLowerCase() === 't') {
                toggleTheme()
            } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'l') {
                e.preventDefault();
                copyShareLink()
            }
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [increaseFontSize, decreaseFontSize, toggleTheme])

    const copyShareLink = useCallback(() => {
        try {
            const url = typeof window !== 'undefined' ? window.location.href : ''
            if (!url) return
            navigator.clipboard
                .writeText(url)
                .then(() => {
                    setToastMsg('Link copied')
                    if (toastTimer.current) window.clearTimeout(toastTimer.current)
                    toastTimer.current = window.setTimeout(() => setToastMsg(null), 1600)
                })
                .catch(() => {
                    setToastMsg('Copy failed')
                    if (toastTimer.current) window.clearTimeout(toastTimer.current)
                    toastTimer.current = window.setTimeout(() => setToastMsg(null), 1600)
                })
        } catch {
            setToastMsg('Copy failed')
            if (toastTimer.current) window.clearTimeout(toastTimer.current)
            toastTimer.current = window.setTimeout(() => setToastMsg(null), 1600)
        }
    }, [])

    return (
        <>

            <div
                className={`min-h-screen relative overflow-hidden transition-colors duration-500 ${isDark ? "bg-black text-white" : "bg-white text-black"
                    }`}
                onMouseMove={handleMouseMove}
            >
                {/* so bro @Star_Knight12 you just casually forgot to import <ToastMsg />. And here we are, with Vercel bot throwing a tantrum in the deployment logs. DW fixed it! */}
                <ToastMsg /> 

                <div className="screenshot-exclude">
                    <DownloadButton text={text} isDark={isDark} showControls={showControls} onCopyLink={copyShareLink} />
                </div>

                <div className="screenshot-exclude">
                    <ThemeToggle showControls={showControls} isDark={isDark} toggleTheme={toggleTheme} />
                    
                </div>

                <div
                    className={`screenshot-exclude fixed top-4/5 left-6 -translate-y-1/2 z-50
                                        sm:top-1/2 sm:-translate-y-1/2 sm:fixed sm:left-6 sm:z-50
                                        w-[240px] flex flex-col gap-3
                                        transition-all duration-300 ease-out
                                        ${showControls
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 -translate-x-12 pointer-events-none"
                        }
                                    `}
                    data-hide-for-screenshot
                >
                    {/* Colors Section: expands/collapses */}
                    <ColorPicker
                        textColor={textColor}
                        setTextColor={setTextColor}
                        showColorPicker={showColorPicker}
                        setShowColorPicker={setShowColorPicker}
                        onOpen={() => { }}
                        isDark={isDark}
                    />

                    {/* Background Section: expands/collapses */}
                    <BackgroundPicker
                        backgroundColor={backgroundColor}
                        setBackgroundColor={setBackgroundColor}
                        showBackgroundPicker={showBackgroundPicker}
                        setShowBackgroundPicker={setShowBackgroundPicker}
                        onOpen={() => { }}
                        isDark={isDark}
                    />

                    {/* Font Picker Section */}
                    <FontPicker
                        selectedFont={selectedFont}
                        setSelectedFont={setSelectedFont}
                        showFontPicker={showFontPicker}
                        setShowFontPicker={setShowFontPicker}
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


                <TextArea ref={inputRef} text={text} setText={setText} textColor={textColor} fontSize={fontSize} selectedFont={selectedFont} />

                <Title showControls={showControls} isDark={isDark} />
                <AmbientBackground backgroundColor={backgroundColor} isDark={isDark} />

                {/* Toast notification */}
                <div
                    className={`screenshot-exclude fixed top-16 right-6 z-[60] transition-all duration-300 ${toastMsg ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
                        }`}
                    role="status"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    <div className={`px-3 py-2 rounded-md border text-sm shadow-sm ${isDark ? 'bg-black/90 text-white border-neutral-800' : 'bg-white/90 text-black border-gray-200'
                        }`}>
                        {toastMsg}
                    </div>
                </div>

            </div>
        </>
    )
}