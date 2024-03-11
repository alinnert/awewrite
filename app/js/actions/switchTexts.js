import { leftTextareaElement, rightTextareaElement } from '../elements.js'
import { onTextareaInput } from '../textarea/onTextareaInput.js'

export function switchTexts() {
  const leftText = leftTextareaElement.value
  leftTextareaElement.value = rightTextareaElement.value
  rightTextareaElement.value = leftText

  onTextareaInput()
}
