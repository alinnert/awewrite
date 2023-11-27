import { lineHeightElement } from '../elements.js'
import { getRealLineheight } from './font.js'

export function changeLineheight(height) {
  if (height < 0 || height > 20) return

  const lineHeight = getRealLineheight(height)
  lineHeightElement.textContent = lineHeight
  document.body.style.setProperty('--editor-line-height', lineHeight)
  localStorage.setItem('awe.lineheight', height)
}
