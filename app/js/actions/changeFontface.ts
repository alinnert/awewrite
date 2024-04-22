import { mutableValue } from '@alinnert/reactive'
import { fontfaceElements } from '../elements.ts'

const fontFamilies = {
  'IBM Plex Sans': '"IBM Plex Sans", sans-serif',
  'IBM Plex Serif': '"IBM Plex Serif", serif',
  'IBM Plex Mono': '"IBM Plex Mono", monospace',
  Duo: '"Duo", monospace',
  Quattro: '"Quattro", monospace',
  Kalam: '"Kalam", cursive',
  OpenDyslexic: '"OpenDyslexic", cursive',
} as const

export type FontFamily = keyof typeof fontFamilies

export const currentFont$ = mutableValue<FontFamily | null>(null)

export function isFontFamily(font: string): font is FontFamily {
  return Object.keys(fontFamilies).includes(font)
}

export function changeFontface(font: FontFamily) {
  document.body.style.setProperty('--editor-font-family', fontFamilies[font])

  localStorage.setItem('awe.fontface', font)

  currentFont$.set(font)
}
