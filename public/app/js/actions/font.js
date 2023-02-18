import {
  fontSizeElement,
  isHTMLElement,
  textareaElements,
} from '../elements.js'

export function changeFontface(font) {
  const fontFamilies = {
    'IBM Plex Sans': () => '"IBM Plex Sans", sans-serif',
    'IBM Plex Serif': () => '"IBM Plex Serif", serif',
    'IBM Plex Mono': () => '"IBM Plex Mono", sans-serif',
    Kalam: () => '"Kalam", cursive',
  }

  const fontFamily = fontFamilies[font]()

  for (const textarea of textareaElements) {
    if (!isHTMLElement(textarea)) continue
    textarea.style.fontFamily = fontFamily
  }

  localStorage.setItem('awe.fontface', fontFamily)
}

export function changeFontsize(size) {
  if (size >= 10 && size <= 24) {
    fontSizeElement.innerHTML = size
    for (const textarea of textareaElements) {
      if (!isHTMLElement(textarea)) continue
      textarea.style.fontSize = `${size}px`
    }
  }

  localStorage.setItem('awe.fontsize', size)
}
