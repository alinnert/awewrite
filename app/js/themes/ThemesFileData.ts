export type ThemesFileData = Record<string, ThemeGroup>

export type ThemeGroup = {
  shortLabel: string
  longLabel: string
  sections: ThemeSection[]
}

export type ThemeSection = {
  heading: string
  infoText?: string
  infoLink?: string
  themes: ThemeDefinition[]
}

export type ThemeDefinition = {
  themeName: string
  id: string
  darkTheme?: true
  textColor: string
  backgroundColor: string
  backgroundImage?: string
  creditsName?: string
  creditsUrl?: string
}