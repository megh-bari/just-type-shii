export interface TextStyle{
    color: string
    fontSize: number
}

export interface ControlsState{
    showControls: boolean
    showColorPicker:boolean
    showFontSize: boolean
}

export interface ThemeState {
  isDark: boolean
}

export interface AppState extends ControlsState, ThemeState {
  textColor: string
  fontSize: number
  text: string
}
