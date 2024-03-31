import { leftTextareaElement, rightTextareaElement } from '../elements.js'
import { onTextareaInput } from '../textarea/onTextareaInput.js'

export function clearTexts() {
  leftTextareaElement.value = ''
  rightTextareaElement.value = ''

  onTextareaInput()
}
