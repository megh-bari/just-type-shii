"use client"

import { forwardRef } from "react"


interface TextAreaProps {
  text: string
  setText: (text: string) => void
  textColor: string
  fontSize: number
  selectedFont: string
  textShadow?: string
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ text, setText, textColor, fontSize, selectedFont, textShadow }, ref) => {

    return (
      <textarea
        ref={ref}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder=""
        autoFocus
        aria-label="Editor"
        spellCheck={false}
        autoCorrect="off"
        autoCapitalize="off"
        className={`fixed inset-0 w-full h-full p-20 bg-transparent border-none outline-none resize-none ${selectedFont} tracking-wide leading-relaxed text-center`}
        style={{
          color: textColor,
          fontSize: `${fontSize}px`,
          caretColor: textColor,
          paddingTop: "calc(50vh - 0.5em)",
          paddingBottom: "calc(50vh - 0.5em)",
          overflow: "hidden",
          textShadow: textShadow || "none"
        }}
      />
    )
  },
)

TextArea.displayName = "TextArea"