export const getThemeClasses = (isDark: boolean) => ({
  background: isDark ? "bg-black" : "bg-white",
  text: isDark ? "text-white" : "text-black",
  panel: isDark ? "bg-gray-800/90" : "bg-white/90",
  panelHover: isDark ? "hover:bg-gray-700/90" : "hover:bg-gray-100/90",
  border: isDark ? "border-gray-700" : "border-gray-300",
  dropdown: isDark ? "bg-gray-900/95" : "bg-white/95",
  shadow: isDark ? "" : "shadow-lg",
});


export const autoAdjustTextColor = (currentColor: string, isDark: boolean): string => {
  if (!isDark && currentColor === "#ffffff") {
    return "#000000"
  }
  if (isDark && currentColor === "#000000") {
    return "#ffffff"
  }
  return currentColor
}
