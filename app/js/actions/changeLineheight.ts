import { mutableValue } from '@alinnert/reactive'
import { lineHeightElement } from '../elements.ts'
import { getOrSetLocalStorageItem } from '../localStorage/getOrSetLocalStorageItem.ts'
import { storageKey } from '../localStorage/initLocalStorage.ts'
import { clamp } from '../lib/math/clamp.ts'

migrateLineHeight()

const currentLineHeight$ = mutableValue<string>(
  getOrSetLocalStorageItem(storageKey.lineHeight, '1.4')
)

currentLineHeight$.onChange((lineHeight) => {
  lineHeightElement.textContent = lineHeight
  document.body.style.setProperty('--editor-line-height', lineHeight)
  localStorage.setItem(storageKey.lineHeight, lineHeight)
})

export function updateLineHeight(delta: number) {
  const lineHeightString = currentLineHeight$.value
  const lineHeight = Number.parseFloat(lineHeightString)
  const newLineHeight = clamp(lineHeight + delta, 1, 3).toFixed(1)
  currentLineHeight$.set(newLineHeight)
}

function migrateLineHeight(): void {
  const oldLineHeight = localStorage.getItem(storageKey.lineHeight)
  if (oldLineHeight === null) return

  const intMatch = oldLineHeight.match(/^\d+$/)
  if (intMatch === null) return

  const [stringValue] = intMatch
  const value = Number.parseInt(stringValue)
  const newValue = (value + 10) / 10
  localStorage.setItem(storageKey.lineHeight, newValue.toString())
}
