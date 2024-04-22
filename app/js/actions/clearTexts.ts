import { leftTextareaElement, rightTextareaElement } from '../elements.ts'
import { onTextareaInput } from '../textarea/onTextareaInput.ts'

export function clearTexts() {
  leftTextareaElement.value = ''
  rightTextareaElement.value = ''

  onTextareaInput()
}
