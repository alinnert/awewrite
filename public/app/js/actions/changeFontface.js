import { isHTMLElement, textareaElements } from '../elements.js'
import { fontFamilyValue } from './font.js'

export function changeFontface(font) {
  const fontFamilies = {
    'IBM Plex Sans': () => fontFamilyValue.ibmPlexSans,
    'IBM Plex Serif': () => fontFamilyValue.ibmPlexSerif,
    'IBM Plex Mono': () => fontFamilyValue.ibmPlexMono,
    Duo: () => fontFamilyValue.duo,
    Quattro: () => fontFamilyValue.quattro,
    Kalam: () => fontFamilyValue.kalam,
    OpenDyslexic: () => fontFamilyValue.openDyslexic,
  }

  const fontFamily = fontFamilies[font]()

  for (const textarea of textareaElements) {
    if (!isHTMLElement(textarea)) continue
    textarea.style.fontFamily = fontFamily
  }

  localStorage.setItem('awe.fontface', fontFamily)
}
