interface AmbientBackgroundProps {
  backgroundColor: string
  isDark: boolean
}

export function AmbientBackground({ backgroundColor, isDark }: AmbientBackgroundProps) {
  // console.log('AmbientBackground rendering with:', { backgroundColor, isDark }) // for Debug 

  return (
    <div
      className="fixed inset-0 pointer-events-none transition-all duration-1000 z-0"
      style={{
        background: isDark
          ? `radial-gradient(circle at 50% 50%, ${backgroundColor}20 0%, transparent 70%)`
          : `radial-gradient(circle at 50% 50%, ${backgroundColor}70 0%, ${backgroundColor}22 50%, transparent 70%)`,
        opacity: isDark ? 0.3 : 1
      }}
    />
  )
}