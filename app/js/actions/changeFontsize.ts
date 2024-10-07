import { fontSizeElement } from '../elements.ts'

export function changeFontsize(size: number) {
  if (size < 10 || size > 30) return

  fontSizeElement.textContent = size.toString()
  document.body.style.setProperty('--editor-font-size', `${size}px`)
  localStorage.setItem('awe.fontsize', size.toString())
}

export function updateFontsize(delta: number) {
  const rawValue = fontSizeElement.textContent
  if (rawValue === null) return
  const currentFontsize = Number.parseInt(rawValue)
  changeFontsize(currentFontsize + delta)
}
