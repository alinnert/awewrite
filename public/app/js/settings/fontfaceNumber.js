import { fontFamilyValue } from '../actions/font.js'

export function fontfaceNumber(font) {
  switch (font) {
    default:
    case fontFamilyValue.ibmPlexSans:
      return 0
    case fontFamilyValue.ibmPlexSerif:
      return 1
    case fontFamilyValue.ibmPlexMono:
      return 2
    case fontFamilyValue.duo:
      return 3
    case fontFamilyValue.quattro:
      return 4
    case fontFamilyValue.kalam:
      return 5
    case fontFamilyValue.openDyslexic:
      return 6
  }
}
