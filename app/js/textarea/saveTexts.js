import { leftTextareaElement, rightTextareaElement } from '../elements.js'

export function saveTexts() {
  if (!(leftTextareaElement instanceof HTMLTextAreaElement)) return
  if (!(rightTextareaElement instanceof HTMLTextAreaElement)) return

  localStorage.setItem('awe.text.left', leftTextareaElement.value)
  localStorage.setItem('awe.text.right', rightTextareaElement.value)
}
