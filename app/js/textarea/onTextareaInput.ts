import { leftWordCounterElement, rightWordCounterElement } from '../elements.ts'
import { saveTexts } from './saveTexts.ts'

export function onTextareaInput(area?: 'left' | 'right') {
  saveTexts()

  if (area === 'left' || area === undefined) {
    leftWordCounterElement.onTextareaInput()
  }

  if (area === 'right' || area === undefined) {
    rightWordCounterElement.onTextareaInput()
  }
}
