import { mutableValue } from '@alinnert/reactive'
import { textWidthElements } from '../elements.ts'
import { getOrSetLocalStorageItem } from '../localStorage/getOrSetLocalStorageItem.ts'
import { storageKey } from '../localStorage/initLocalStorage.ts'

export type TextWidth = 'narrow' | 'medium' | 'wide' | 'full'

export const currentTextWidth$ = mutableValue<string>(
  getOrSetLocalStorageItem(storageKey.textWidth, 'narrow')
)

currentTextWidth$.onChange((textWidth) => {
  for (const button of textWidthElements) {
    button.classList.toggle('is-current', button.dataset.textWidth === textWidth)
  }

  localStorage.setItem(storageKey.textWidth, textWidth)
})
