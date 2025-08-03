interface AmbientBackgroundProps {
  textColor: string
}

export function AmbientBackground({ textColor }: AmbientBackgroundProps) {
  return (
    <div
      className="fixed inset-0 pointer-events-none opacity-5 transition-all duration-1000"
      style={{
        background: `radial-gradient(circle at 50% 50%, ${textColor}90 0%, transparent 70%)`,
      }}
    />
  )
}
