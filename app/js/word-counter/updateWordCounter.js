import {
  leftTextareaElement,
  rightTextareaElement,
  wordCounterElement,
} from '../elements.js'
import { getWordCount } from './getWordCount.js'

export function updateWordCounter() {
  const leftCounter = getWordCount(leftTextareaElement.value)
  const rightCounter = getWordCount(rightTextareaElement.value)
  wordCounterElement.textContent = `Words [ ${leftCounter} ] [ ${rightCounter} ]`
}
