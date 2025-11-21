import { mutableValue } from '@alinnert/reactive'
import { getOrSetLocalStorageItem } from '../localStorage/getOrSetLocalStorageItem.ts'
import { storageKey } from '../localStorage/initLocalStorage.ts'

export const texts: Record<string, ReturnType<typeof mutableValue<string>>> = {
  leftText$: mutableValue<string>(
    getOrSetLocalStorageItem(
      storageKey.leftText,
      'Welcome! You can find the settings here ↑\n\nYou can use them to tweak the look and feel of AWE.write.',
    ),
  ),
  rightText$: mutableValue<string>(
    getOrSetLocalStorageItem(
      storageKey.rightText,
      'Enter some text in any of the two text areas.\n\nYour text will be saved automatically, locally in your browser only.\n\nHappy typing 🙂',
    ),
  ),
}

texts.leftText$.onChange((text) => {
  localStorage.setItem(storageKey.leftText, text)
})

texts.rightText$.onChange((text) => {
  localStorage.setItem(storageKey.rightText, text)
})
