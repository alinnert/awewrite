import { mutableValue } from '@alinnert/reactive'
import { spellcheckElement, textareaElements } from '../elements.ts'
import { getOrSetLocalStorageItem } from '../localStorage/getOrSetLocalStorageItem.ts'
import { storageKey } from '../localStorage/initLocalStorage.ts'

export const currentSpellcheckState$ = mutableValue<string>(
  getOrSetLocalStorageItem(storageKey.spellcheck, 'true')
)

currentSpellcheckState$.onChange((state) => {
  spellcheckElement.checked = state === 'true'

  for (const element of textareaElements) {
    element.setAttribute('spellcheck', state)
  }

  localStorage.setItem(storageKey.spellcheck, state)
})
