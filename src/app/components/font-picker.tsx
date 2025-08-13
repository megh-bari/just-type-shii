"use client";

import { useState } from "react";

interface FontPickerProps {
  selectedFont: string;
  setSelectedFont: (font: string) => void;
  showFontPicker: boolean;
  setShowFontPicker: (show: boolean) => void;
  onOpen: () => void;
  isDark: boolean;
}

const FONTS = [
  {
    name: "Doto Bold",
    value: "font-doto",
    displayName: "Doto Bold",
    category: "Custom",
  },
  {
    name: "Adlam",
    value: "font-adlam",
    displayName: "Adlam",
    category: "Custom",
  },
  {
    name: "Imperial Script",
    value: "font-imperial",
    displayName: "Imperial Script",
    category: "Custom",
  },
  {
    name: "Kablammo",
    value: "font-kablammo",
    displayName: "Kablammo",
    category: "Custom",
  },
  {
    name: "Unifraktur",
    value: "font-unifraktur",
    displayName: "Unifraktur",
    category: "Custom",
  },
  {
    name: "Figtree",
    value: "font-figtree",
    displayName: "Figtree",
    category: "System",
  },
  {
    name: "Monospace",
    value: "font-mono",
    displayName: "Monospace",
    category: "System"
  },
  {
    name: "Serif",
    value: "font-serif",
    displayName: "Serif",
    category: "System"
  },
  {
    name: "Sans Serif",
    value: "font-sans",
    displayName: "Sans Serif",
    category: "System"
  }
];

export function FontPicker({
  selectedFont,
  setSelectedFont,
  showFontPicker,
  setShowFontPicker,
  onOpen,
  isDark,
}: FontPickerProps) {
  const [activeTab, setActiveTab] = useState<"fonts" | "google">("fonts");

  const handleFontSelect = (fontValue: string) => {
    setSelectedFont(fontValue);
    setShowFontPicker(false);
  };

  const selectedFontName =
    FONTS.find((font) => font.value === selectedFont)?.displayName ||
    "Doto Bold";

  return (
    <div className="w-full">
      <button
        onClick={() => {
          setShowFontPicker(!showFontPicker);
          onOpen();
        }}
        aria-controls="font-picker-panel"
        aria-expanded={showFontPicker}
        className={`
          flex items-center justify-between gap-3 px-4 py-3 w-full border cursor-pointer
          transition-all duration-200 backdrop-blur-sm
          ${showFontPicker ? "rounded-t-2xl rounded-b-none" : "rounded-2xl"}
          ${isDark
            ? "bg-black border-neutral-800 text-white hover:bg-neutral-900"
            : "bg-white border-neutral-300 text-black hover:bg-neutral-100 shadow-lg"
          }
        `}
      >
        <div className="flex items-center gap-3">
          <div
            className={`text-sm px-2 py-1 rounded border ${isDark
              ? "bg-neutral-900 text-white border border-neutral-800"
              : "bg-neutral-100 text-neutral-800 border border-neutral-300"
              }`}
          >
            Aa
          </div>
          <span className="font-medium">Font: {selectedFontName}</span>
        </div>
        <svg
          className={`h-4 w-4 transition-transform duration-200 ${showFontPicker ? "rotate-90" : ""
            }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      <div
        className={`
          overflow-hidden transition-all duration-300 ease-out
          ${showFontPicker ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}
          ${isDark
            ? "bg-black border-x border-b border-neutral-800"
            : "bg-white border-x border-b border-neutral-300"
          }
          backdrop-blur-sm shadow-xl rounded-b-2xl
        `}
        id="font-picker-panel"
      >
        {/* Tab Navigation */}
        <div
          className={`flex border-b ${isDark ? "border-neutral-800" : "border-neutral-300"
            }`}
        >
          <button
            onClick={() => setActiveTab("fonts")}
            className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${activeTab === "fonts"
              ? isDark
                ? "text-white border-b-2 border-gray-500"
                : "text-black border-b-2 border-gray-500"
              : isDark
                ? "text-gray-400 hover:text-gray-300"
                : "text-gray-600 hover:text-gray-800"
              }`}
          >
            Local Fonts
          </button>
          <button
            onClick={() => setActiveTab("google")}
            className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${activeTab === "google"
              ? isDark
                ? "text-white border-b-2 border-gray-500"
                : "text-black border-b-2 border-gray-500"
              : isDark
                ? "text-gray-400 hover:text-gray-300"
                : "text-gray-600 hover:text-gray-800"
              }`}
          >
            System Fonts
          </button>
        </div>

        {/* Tab Content */}
        <div
          className={`max-h-72 overflow-y-auto ${isDark ? "scrollbar-dark" : "scrollbar-light"
            }`}
        >
          <div className="p-4">
            {activeTab === "fonts" ? (
              <div className="space-y-3">
                {/* Custom Fonts Section */}
                <div>
                  <h3
                    className={`text-sm font-semibold mb-3 px-2 ${isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                  >
                    Custom Fonts
                  </h3>
                  <div className="space-y-2">
                    {FONTS.filter((font) => font.category === "Custom").map(
                      (font) => (
                        <button
                          key={font.value}
                          onClick={() => handleFontSelect(font.value)}
                          className={`
                       w-full text-left px-3 py-3 rounded-lg transition-all duration-150
                        hover:scale-[1.01] active:scale-95 cursor-pointer border
                  ${selectedFont === font.value
                              ? isDark
                                ? "bg-blue-900/30 border-blue-600 text-white"
                                : "bg-blue-50 border-blue-300 text-black"
                              : isDark
                                ? "hover:bg-neutral-900 border-gray-700 text-gray-300 hover:text-white"
                                : "hover:bg-gray-50 hover:border-blue-600 border-gray-200 text-gray-700 hover:text-black"
                            }
                      `}
                        >
                          <div className="flex items-center justify-between">
                            <span
                              className={`${font.value} text-xl font-semibold`}
                            >
                              {font.displayName}
                            </span>
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${isDark
                                ? "bg-purple-900/50 text-purple-300"
                                : "bg-purple-100 text-purple-700"
                                }`}
                            >
                              Custom
                            </span>
                          </div>
                          <div
                            className={`${font.value} text-base opacity-80 mt-2 font-medium`}
                          >
                            just type shii
                          </div>
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* System Fonts Section */}
                <div>
                  <h3
                    className={`text-sm font-semibold mb-3 px-2 ${isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                  >
                    System Fonts
                  </h3>
                  <div className="space-y-2">
                    {FONTS.filter((font) => font.category === "System").map(
                      (font) => (
                        <button
                          key={font.value}
                          onClick={() => handleFontSelect(font.value)}
                          className={`
                        w-full text-left px-3 py-3 rounded-lg transition-all duration-150
                        hover:scale-[1.01] active:scale-95 cursor-pointer border
                        ${selectedFont === font.value
                              ? isDark
                                ? "bg-blue-900/30 border-blue-600 text-white"
                                : "bg-blue-50 border-blue-300 text-black"
                              : isDark
                                ? "hover:bg-neutral-900 border-gray-700 text-gray-300 hover:text-white"
                                : "hover:bg-gray-50 hover:border-blue-600 border-gray-200 text-gray-700 hover:text-black"

                            }
                      `}
                        >
                          <div className="flex items-center justify-between">
                            <span className={`${font.value} text-lg`}>
                              {font.displayName}
                            </span>
                            <span className="text-sm opacity-60">System</span>
                          </div>
                          <div
                            className={`${font.value} text-sm opacity-75 mt-1`}
                          >
                            just type shii
                          </div>
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                {FONTS.filter((font) => font.category === "System").map(
                  (font) => (
                    <button
                      key={font.value}
                      onClick={() => handleFontSelect(font.value)}
                      className={`
                     w-full text-left px-3 py-3 rounded-lg transition-all duration-150
                        hover:scale-[1.01] active:scale-95 cursor-pointer border
                    ${selectedFont === font.value
                          ? isDark
                            ? "bg-blue-900/30 border-blue-600 text-white"
                            : "bg-blue-50 border-blue-300 text-black"
                          : isDark
                            ? "hover:bg-neutral-900 border-gray-700 text-gray-300 hover:text-white"
                            : "hover:bg-gray-50 hover:border-blue-600 border-gray-200 text-gray-700 hover:text-black"
                        }
                  `}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`${font.value} text-lg`}>
                          {font.displayName}
                        </span>
                        <span className="text-sm opacity-60">System</span>
                      </div>
                      <div className={`${font.value} text-sm opacity-75 mt-1`}>
                        just type shii
                      </div>
                    </button>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
