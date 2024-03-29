import { isHTMLElement, textareaElements } from '../elements.js'

export function changeTextWidth(width) {
  for (const textarea of textareaElements) {
    if (!isHTMLElement(textarea)) continue

    switch (width) {
      case 'full':
        textarea.style.maxWidth = 'initial'
        break
      case 'narrow':
        textarea.style.maxWidth = '35em'
        break
      case 'medium':
        textarea.style.maxWidth = '45em'
        break
      case 'wide':
        textarea.style.maxWidth = '55em'
        break
    }
  }

  localStorage.setItem('awe.textwidth', width)

  const textWidthButtons = document.getElementsByClassName('change-text-width-button')

  for (const button of textWidthButtons) {
    const buttonValue = button.dataset.textWidth
    button.classList.toggle('current', buttonValue === width)
  }
}
