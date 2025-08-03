"use client"

import { forwardRef } from "react"

interface TextAreaProps {
  text: string
  setText: (text: string) => void
  textColor: string
  fontSize: number
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ text, setText, textColor, fontSize }, ref) => {
    return (
      <textarea
        ref={ref}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder=""
        autoFocus
        spellCheck={false}         
        autoCorrect="off"         
        autoCapitalize="off"
        className="fixed inset-0 w-full h-full bg-transparent border-none outline-none resize-none font-doto font-light tracking-wide leading-relaxed text-center"
        style={{
          color: textColor,
          fontSize: `${fontSize}px`,
          caretColor: textColor,
          paddingTop: "calc(50vh - 0.5em)",
          paddingBottom: "calc(50vh - 0.5em)",
          overflow: "hidden",
        }}
      />

    )
  },
)

TextArea.displayName = "TextArea"
