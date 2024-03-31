import { WordCounter } from '../components/word-counter.js'
import { saveTexts } from './saveTexts.js'

/** @param {'left'|'right'} [area] */
export function onTextareaInput(area) {
  saveTexts()

  const wordCounterSelector = area !== undefined ? `word-counter[area="${area}"]` : 'word-counter'
  const wordCounter = /** @type {WordCounter[]} */ (Array.from(document.querySelectorAll(wordCounterSelector)))

  for (const el of wordCounter) {
    el.onTextareaInput()
  }
}
