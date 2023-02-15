import { saveTexts } from '../textarea/saveTexts.js'
import { updateWordCounter } from '../word-counter/updateWordCounter.js'

const leftTextarea = /** @type HTMLTextAreaElement */ (
  document.getElementById('leftTextarea')
)
const rightTextarea = /** @type HTMLTextAreaElement */ (
  document.getElementById('rightTextarea')
)

export function clearTexts() {
  leftTextarea.value = ''
  rightTextarea.value = ''

  saveTexts()
  updateWordCounter()
}

export function switchTexts() {
  const leftText = leftTextarea.value
  leftTextarea.value = rightTextarea.value
  rightTextarea.value = leftText

  saveTexts()
  updateWordCounter()
}


export function setSpellcheck(value) {
  const spellcheckInput = /** @type HTMLInputElement */ (
    document.getElementById('spellcheck')
  )
  const spellcheck =
    value !== undefined ? value : spellcheckInput.checked ? 'true' : 'false'
  
  if (spellcheck === 'true' && !spellcheckInput.checked) {
    spellcheckInput.checked = true
  }

  const textareas = document.getElementsByTagName('textarea')

  for (const textarea of textareas) {
    textarea.setAttribute('spellcheck', spellcheck)
  }

  localStorage.setItem('awe.spellcheck', spellcheck)
}
