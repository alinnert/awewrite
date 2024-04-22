import { leftTextareaElement, rightTextareaElement } from '../elements.ts'
import { onTextareaInput } from '../textarea/onTextareaInput.ts'

export function switchTexts() {
  const leftText = leftTextareaElement.value
  leftTextareaElement.value = rightTextareaElement.value
  rightTextareaElement.value = leftText

  onTextareaInput()
}
