import { fontSizeElement } from '../elements.js'

export function changeFontsize(size) {
  if (size < 10 || size > 30) return

  fontSizeElement.textContent = size
  document.body.style.setProperty('--editor-font-size', `${size}px`)
  localStorage.setItem('awe.fontsize', size)
}
