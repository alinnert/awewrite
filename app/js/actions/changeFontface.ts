import { mutableValue } from '@alinnert/reactive'

export const currentFont$ = mutableValue<string | null>(null)

export function changeFontface(font: string) {
  document.body.style.setProperty('--editor-font-family', `"${font}"`)

  localStorage.setItem('awe.fontface', font)

  currentFont$.set(font)
}
