"use client"

import { Keyboard, X } from "lucide-react"
import { useState } from "react"

interface ShortcutProps {
    showControls: boolean
    isDark: boolean
}


export function ShortcutButton({ showControls, isDark }: ShortcutProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openShortcutModal = () => {
        setIsModalOpen(true)
        console.log("click")
        // Add haptic feedback for mobile devices
        if (navigator.vibrate) {
            navigator.vibrate(50)
        }
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const shortcuts = [
        {
            category: "Apperance",
            items: [
                {
                    action: "Increase font size", keys: ["Ctrl/Cmd", "+", "or", "Ctrl/Cmd", "="]
                },
                {
                    action: "Decrease font size", keys: ["Ctrl/Cmd", "-"]
                },
                {
                    action: "Toggle theme", keys: ["T"]
                }
            ]
        },
        {
            category: "Sharing",
            items: [
                { action: "Copy share link", keys: ["Ctr/Cmd", "L"] }
            ]
        }
    ]

    return (
        <>
            {/* shortcut btn */}
            <div
                className={`fixed top-6 right-42 z-40 transition-all duration-300 ${showControls ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
                    }`}
            >
                <button
                    onClick={openShortcutModal}
                    role="button"
                    aria-label="Open keyboard shortcuts"
                    title="Keyboard shortcuts (Ctrl+/)"
                    className={`
          w-auto h-10 px-3 cursor-pointer rounded-full backdrop-blur-sm border transition-colors duration-300 flex items-center justify-center
          ${isDark
                            ? "bg-black border-neutral-800 text-white hover:bg-[#181818]"
                            : "bg-white border-gray-300 text-black hover:bg-gray-100/60"
                        }
        `}
                >
                    <Keyboard className="h-4 w-4 mr-2" />
                    <span className="text-sm hidden sm:inline">Shortcuts</span>
                </button>
            </div>
            {/* modal overlay */}

            {isModalOpen && (
                <div
                    className={`fixed inset-0  backdrop-blur-lg z-[100] flex items-center justify-center p-4
                        ${isDark
                            ? "bg-black/50 text-white"
                            : "bg-white/10 text-black"
                        }
                        `}
                    onClick={closeModal}
                >
                    {/* Modal Content */}
                    <div
                        className={` rounded-xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto
                            ${isDark
                                ? "bg-neutral-800 text-white"
                                : "bg-white/50 text-black"
                            }
                            `}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className={`flex items-center justify-between p-4 border-b ${isDark

                            ? "border-neutral-700"
                            : "border-neutral-300"
                            } `}>
                            <div className="flex items-center gap-3">
                                <Keyboard className={`h-5 w-5 
                                    ${isDark
                                        ? "text-white"
                                        : "text-black"
                                    }
                                    `} />
                                <h2 className={`text-lg                                    ${isDark
                                    ? "text-white"
                                    : "text-black"
                                    }`}>Keyboard Shortcuts</h2>
                            </div>
                            <button
                                onClick={closeModal}
                                className="p-1 rounded-lg "
                                aria-label="Close modal"
                            >
                                <X className={`h-5 w-5  ${isDark

                                    ? "text-gray-400 hover:text-white "
                                    : "text-gray-400 hover:text-black"
                                    }  transition-colors`} />
                            </button>
                        </div>

                        {/* Description */}
                        <div className="p-4 pb-4">
                            <p className={` text-sm leading-relaxed ${isDark
                                ? "text-gray-300"
                                : "text-gray-600"

                                }`}>
                                Speed up your workflow with these keyboard shortcuts. Use these to quickly navigate and customize your experience.
                            </p>
                        </div>

                        {/* Shortcuts Content */}
                        <div className="px-4 pb-6 space-y-6">
                            {shortcuts.map((section, sectionIndex) => (
                                <div key={sectionIndex}>
                                    <h3 className={`text-xs uppercase tracking-wider mb-3 ${isDark
                                        ? "text-gray-400"
                                        : "text-gray-600"

                                        }`}>
                                        {section.category}
                                    </h3>
                                    <div className="space-y-3">
                                        {section.items.map((shortcut, itemIndex) => (
                                            <div key={itemIndex} className="flex items-center justify-between">
                                                <span className={`text-sm ${isDark
                                                    ? "text-white"
                                                    : "text-black"

                                                    }`}>
                                                    {shortcut.action}
                                                </span>
                                                <div className="flex items-center gap-1">
                                                    {shortcut.keys.map((key, keyIndex) => (
                                                        <span key={keyIndex}>
                                                            {key === "or" ? (
                                                                <span className="text-gray-500 text-xs mx-2">or</span>
                                                            ) : (
                                                                <kbd className={`px-2 py-2 rounded-md text-xs text-gray-300 font-mono
                                                                
                                                                ${isDark
                                                                        ? "bg-neutral-900 text-white border border-neutral-800"
                                                                        : "bg-neutral-100 text-neutral-800 border border-neutral-300"
                                                                    }
                                                                `}>
                                                                    {key}
                                                                </kbd>
                                                            )}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
