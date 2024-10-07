import { lineHeightElement } from '../elements.ts'
import { getRealLineHeight, parseLineheight } from './font.ts'

export function changeLineheight(height: number) {
  if (height < 0 || height > 20) return

  const lineHeight = getRealLineHeight(height)
  lineHeightElement.textContent = lineHeight
  document.body.style.setProperty('--editor-line-height', lineHeight)
  localStorage.setItem('awe.lineheight', height.toString())
}

export function updateLineheight(delta: number) {
  const rawValue = lineHeightElement.textContent
  if (rawValue === null) return
  const currentLineheight = parseLineheight(rawValue)
  changeLineheight(currentLineheight + delta)
}
