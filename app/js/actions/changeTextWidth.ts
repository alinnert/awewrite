import { isHTMLElement, textWidthElements, textareaElements } from '../elements.ts'

export type TextWidth = 'narrow' | 'medium' | 'wide' | 'full'

export function changeTextWidth(width: TextWidth) {
  for (const textarea of textareaElements) {
    if (!isHTMLElement(textarea)) continue

    switch (width) {
      case 'narrow':
        textarea.style.maxWidth = '35em'
        break
      case 'medium':
        textarea.style.maxWidth = '45em'
        break
      case 'wide':
        textarea.style.maxWidth = '55em'
        break
      case 'full':
        textarea.style.maxWidth = 'initial'
        break
    }
  }

  localStorage.setItem('awe.textwidth', width)

  for (const button of textWidthElements) {
    const buttonValue = button.dataset.textWidth
    button.classList.toggle('is-current', buttonValue === width)
  }
}
