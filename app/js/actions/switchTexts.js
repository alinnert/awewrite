import { leftTextareaElement, rightTextareaElement } from '../elements.js'
import { saveTexts } from '../textarea/saveTexts.js'
import { updateWordCounter } from '../word-counter/updateWordCounter.js'

export function switchTexts() {
  const leftText = leftTextareaElement.value
  leftTextareaElement.value = rightTextareaElement.value
  rightTextareaElement.value = leftText

  saveTexts()
  updateWordCounter()
}
