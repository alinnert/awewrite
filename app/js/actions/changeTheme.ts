import { automatedValue, computedValue, mutableValue } from '@alinnert/reactive'
import { ThemeData } from '../components/ThemeItem.ts'
import { boxAreaElement, metaThemeColorElement } from '../elements.js'
import { getThemeCssUrl } from '../lib/themes/getThemeCssUrl.ts'
import { getOrSetLocalStorageItem } from '../localStorage/getOrSetLocalStorageItem.ts'
import { storageKey } from '../localStorage/initLocalStorage.ts'
import themeData from '../themes/data.json'
import { flatThemeList } from '../themes/initThemeElements.ts'

migrateTheme()

const fallbackThemeData = themeData.dark.sections
  .find((s) => s.heading === 'Dark Spectrum')!
  .themes.find((t) => t.id === 'dark-color:blue')!

const prefersDarkTheme$ = automatedValue<boolean>((next) => {
  const mq = globalThis.matchMedia('(prefers-color-scheme: dark)')
  next(mq.matches)
  mq.addEventListener('change', ({ matches }) => {
    next(matches)
  })
})

export const currentLightThemeId$ = mutableValue(
  getOrSetLocalStorageItem(storageKey.lightThemeId, 'image:aqua-2-bright')
)
export const currentDarkThemeId$ = mutableValue(
  getOrSetLocalStorageItem(storageKey.darkThemeId, 'image:aqua-2-dark')
)

export const currentTheme$ = computedValue(
  [currentLightThemeId$, currentDarkThemeId$],
  ([lightThemeId, darkThemeId]) => {
    return getThemeDataById(
      (prefersDarkTheme$.value ? darkThemeId : lightThemeId) ?? fallbackThemeData.id
    )
  }
)

currentTheme$.onChange(applyTheme)

export function applyLightOrDarkTheme(prefersDarkTheme: boolean) {
  const themeId = prefersDarkTheme ? currentDarkThemeId$.value : currentLightThemeId$.value
  applyThemeById(themeId ?? fallbackThemeData.id)
}

prefersDarkTheme$.onChange(applyLightOrDarkTheme)

currentLightThemeId$.onChange((value) => {
  if (value === null) return
  localStorage.setItem(storageKey.lightThemeId, value)
  applyLightOrDarkTheme(prefersDarkTheme$.value ?? true)
})

currentDarkThemeId$.onChange((value) => {
  if (value === null) return
  localStorage.setItem(storageKey.darkThemeId, value)
  applyLightOrDarkTheme(prefersDarkTheme$.value ?? true)
})

function getThemeDataById(themeId: string): ThemeData {
  return flatThemeList[themeId].theme as ThemeData
}

export function applyThemeById(themeId: string) {
  applyTheme(getThemeDataById(themeId))
}

function applyTheme(themeData: ThemeData) {
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
}

export function changeLightTheme(themeData: ThemeData) {
  currentLightThemeId$.set(themeData.id)
}

export function changeDarkTheme(themeData: ThemeData) {
  currentDarkThemeId$.set(themeData.id)
}

function migrateTheme(): void {
  const themeId = localStorage.getItem('awe.themeid')
  if (themeId === null) return

  localStorage.setItem(storageKey.lightThemeId, themeId)
  localStorage.setItem(storageKey.darkThemeId, themeId)
  localStorage.removeItem('awe.themeid')
}
