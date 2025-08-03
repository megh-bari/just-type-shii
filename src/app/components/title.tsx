interface TitleProps {
  showControls: boolean
  isDark: boolean
}

export function Title({ showControls, isDark }: TitleProps) {
  return (
    <div
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 transition-all duration-300 ${
        showControls ? "opacity-50" : "opacity-0"
      }`}
    >
      <h1
        className={`text-sm font-light tracking-widest ${
          isDark ? "text-gray-400" : "text-gray-600"
        }`}
      >
        just type shii
      </h1>
    </div>
  )
}
