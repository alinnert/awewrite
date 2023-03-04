import { leftTextareaElement, rightTextareaElement } from '../elements.js'
import { saveTexts } from '../textarea/saveTexts.js'
import { updateWordCounter } from '../word-counter/updateWordCounter.js'

export function clearTexts() {
  leftTextareaElement.value = ''
  rightTextareaElement.value = ''

  saveTexts()
  updateWordCounter()
}
