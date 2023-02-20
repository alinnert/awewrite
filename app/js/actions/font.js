import {
  fontSizeElement,
  isHTMLElement,
  lineHeightElement,
  textareaElements,
} from '../elements.js'

export const fontFamilyValue = {
  ibmPlexSans: '"IBM Plex Sans", sans-serif',
  ibmPlexSerif: '"IBM Plex Serif", serif',
  ibmPlexMono: '"IBM Plex Mono", monospace',
  duo: '"Duo", monospace',
  quattro: '"Quattro", monospace',
  kalam: '"Kalam", cursive',
  openDyslexic: '"OpenDyslexic", cursive',
}

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

export function changeFontsize(size) {
  if (size < 10 || size > 30) return

  fontSizeElement.textContent = size

  for (const textarea of textareaElements) {
    if (!isHTMLElement(textarea)) continue
    textarea.style.fontSize = `${size}px`
  }

  localStorage.setItem('awe.fontsize', size)
}

function getRealLineheight(height) {
  return (height / 10 + 1).toFixed(1).toString()
}

export function parseLineheight(lineHeight) {
  const lineHeightValue = parseFloat(lineHeight)
  return lineHeightValue * 10 - 10
}

export function changeLineheight(height) {
  if (height < 0 || height > 20) return

  const lineHeight = getRealLineheight(height)
  lineHeightElement.textContent = lineHeight

  for (const textarea of textareaElements) {
    if (!isHTMLElement(textarea)) continue
    textarea.style.lineHeight = lineHeight
  }

  localStorage.setItem('awe.lineheight', height)
}
