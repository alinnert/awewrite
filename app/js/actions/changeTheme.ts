import { mutableValue } from '@alinnert/reactive'
import { ThemeData, ThemeItem } from '../components/ThemeItem.ts'
import { $id, boxAreaElement, metaThemeColorElement } from '../elements.js'
import { getThemeCssUrl } from '../lib/themes/getThemeCssUrl.ts'

export const currentTheme$ = mutableValue<ThemeData | null>(null)

const defaultThemeElement = document.querySelector('theme-item[default-theme]') as ThemeItem | null

const fallbackThemeData: ThemeData = {
  displayName: 'Fallback Theme',
  id: 'fallback',
  isDarkTheme: true,
  textColor: 'white',
  backgroundColor: 'oklch(30% 0 none)',
}

export function changeThemeById(selectionId: string) {
  const themeElement = $id(selectionId, { errorOnNotFound: false }) as ThemeItem | null
  const themeData = (themeElement ?? defaultThemeElement)?.themeData ?? fallbackThemeData

  changeTheme(themeData)
}

export function changeTheme(themeData: ThemeData) {
  document.body.classList.toggle('has-background-image', themeData.backgroundImage !== undefined)
  document.body.classList.toggle('light-theme', !themeData.isDarkTheme)

  document.body.style.backgroundImage = getThemeCssUrl(themeData.backgroundImage)
  document.body.style.backgroundColor = themeData.backgroundColor ?? 'transparent'

  boxAreaElement.style.backgroundImage = `linear-gradient(to bottom, ${themeData.backgroundColor}, transparent 100px)`

  metaThemeColorElement.setAttribute('content', themeData.backgroundColor)

  document.body.style.setProperty(
    '--theme-secondary-l-modifier',
    themeData.isDarkTheme
      ? 'var(--theme-secondary-l-modifier-darker)'
      : 'var(--theme-secondary-l-modifier-lighter)'
  )
  document.body.style.setProperty(
    '--theme-secondary-c-modifier',
    themeData.isDarkTheme
      ? 'var(--theme-secondary-c-modifier-darker)'
      : 'var(--theme-secondary-c-modifier-lighter)'
  )
  document.body.style.setProperty('--theme-text-color', themeData.textColor)
  document.body.style.setProperty('--theme-background', themeData.backgroundColor)

  localStorage.setItem('awe.themeid', themeData.id)
  localStorage.setItem('awe.darkTheme', themeData.isDarkTheme ? 'true' : 'false')

  currentTheme$.set(themeData)
}
