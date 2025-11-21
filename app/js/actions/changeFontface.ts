import { mutableValue } from '@alinnert/reactive'
import { getOrSetLocalStorageItem } from '../localStorage/getOrSetLocalStorageItem'
import { storageKey } from '../localStorage/initLocalStorage'

export const currentFont$ = mutableValue<string>(
  getOrSetLocalStorageItem(storageKey.fontFace, '"IBM Plex Sans", sans-serif')
)

currentFont$.onChange((font) => {
  if (font === null) return
  document.body.style.setProperty('--editor-font-family', `"${font}"`)
  localStorage.setItem(storageKey.fontFace, font)
})
