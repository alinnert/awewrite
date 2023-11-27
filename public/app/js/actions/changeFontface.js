import { fontFamilyValue } from './font.js'

const fontFamilies = {
  'IBM Plex Sans': fontFamilyValue.ibmPlexSans,
  'IBM Plex Serif': fontFamilyValue.ibmPlexSerif,
  'IBM Plex Mono': fontFamilyValue.ibmPlexMono,
  Duo: fontFamilyValue.duo,
  Quattro: fontFamilyValue.quattro,
  Kalam: fontFamilyValue.kalam,
  OpenDyslexic: fontFamilyValue.openDyslexic,
}

export function changeFontface(font) {
  const fontFamily = fontFamilies[font]

  // This is for compatibility reasons. The value instead of the id used to be stored in local storage.
  if (fontFamily === undefined) {
    const entry = Object.entries(fontFamilies).find(([_fontId, value]) => value === font)
    if (entry === undefined) return
    changeFontface(entry[0])
    return
  }

  document.body.style.setProperty('--editor-font-family', fontFamily)
  localStorage.setItem('awe.fontface', font)

  for (const button of document.getElementsByClassName('change-fontface-button')) {
    const buttonValue = button.dataset.fontface
    button.classList.toggle('current', buttonValue === font)
  }
}
