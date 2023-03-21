import {
  isHTMLElement,
  lineHeightElement,
  textareaElements,
} from '../elements.js'
import { getRealLineheight } from './font.js'

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
