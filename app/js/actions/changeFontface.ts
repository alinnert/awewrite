import { fontfaceElements } from '../elements.ts'
import { fontFamilyValue } from './font.ts'

const fontFamilies = {
  'IBM Plex Sans': fontFamilyValue.ibmPlexSans,
  'IBM Plex Serif': fontFamilyValue.ibmPlexSerif,
  'IBM Plex Mono': fontFamilyValue.ibmPlexMono,
  Duo: fontFamilyValue.duo,
  Quattro: fontFamilyValue.quattro,
  Kalam: fontFamilyValue.kalam,
  OpenDyslexic: fontFamilyValue.openDyslexic,
} as const

export type FontFamily = keyof typeof fontFamilies

export function changeFontface(font: FontFamily) {
  document.body.style.setProperty('--editor-font-family', fontFamilies[font])
  localStorage.setItem('awe.fontface', font)

  for (const button of fontfaceElements) {
    const buttonValue = button.dataset.fontface
    button.classList.toggle('is-current', buttonValue === font)
  }
}
