import { updateWordCounter } from '../word-counter/updateWordCounter.js'
import { saveTexts } from './saveTexts.js'

export function onTextareaInput() {
  saveTexts()
  updateWordCounter()
}