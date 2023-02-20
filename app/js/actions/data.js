import {
  leftTextareaElement,
  rightTextareaElement,
  spellcheckElement,
  textareaElements,
} from '../elements.js'
import { saveTexts } from '../textarea/saveTexts.js'
import { updateWordCounter } from '../word-counter/updateWordCounter.js'

export function clearTexts() {
  leftTextareaElement.value = ''
  rightTextareaElement.value = ''

  saveTexts()
  updateWordCounter()
}

export function switchTexts() {
  const leftText = leftTextareaElement.value
  leftTextareaElement.value = rightTextareaElement.value
  rightTextareaElement.value = leftText

  saveTexts()
  updateWordCounter()
}

export function setSpellcheck(value) {
  const spellcheck =
    value !== undefined ? value : spellcheckElement.checked ? 'true' : 'false'

  if (spellcheck === 'true' && !spellcheckElement.checked) {
    spellcheckElement.checked = true
  }

  for (const textarea of textareaElements) {
    textarea.setAttribute('spellcheck', spellcheck)
  }

  localStorage.setItem('awe.spellcheck', spellcheck)
}
