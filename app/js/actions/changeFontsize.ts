import { mutableValue } from '@alinnert/reactive'
import { fontSizeElement } from '../elements.ts'
import { storageKey } from '../localStorage/initLocalStorage.ts'
import { getOrSetLocalStorageItem } from '../localStorage/getOrSetLocalStorageItem.ts'
import { clamp } from '../lib/math/clamp.ts'

export const currentFontSize$ = mutableValue<string>(
  getOrSetLocalStorageItem(storageKey.fontSize, '16')
)

currentFontSize$.onChange((fontSize) => {
  const fontSizeNumber = Number.parseInt(fontSize)
  const clampedFontSizeNumber = clamp(fontSizeNumber, 10, 30)
  const clampedFontSize = clampedFontSizeNumber.toString()
  fontSizeElement.textContent = clampedFontSize
  document.body.style.setProperty('--editor-font-size', `${clampedFontSize}px`)
  localStorage.setItem(storageKey.fontSize, clampedFontSize)
})

export function updateFontsize(delta: number) {
  const currentFontSize = Number.parseInt(currentFontSize$.value)
  currentFontSize$.set((currentFontSize + delta).toString())
}
