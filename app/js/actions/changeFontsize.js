import {
  fontSizeElement,
  isHTMLElement,
  textareaElements,
} from '../elements.js'

export function changeFontsize(size) {
  if (size < 10 || size > 30) return

  fontSizeElement.textContent = size

  for (const textarea of textareaElements) {
    if (!isHTMLElement(textarea)) continue
    textarea.style.fontSize = `${size}px`
  }

  localStorage.setItem('awe.fontsize', size)
}
