import { saveTexts } from '../textarea/saveTexts.js'
import { updateWordCounter } from '../word-counter/updateWordCounter.js'

export function clearTexts() {
  document.getElementById('leftTextarea').value = ''
  document.getElementById('rightTextarea').value = ''

  saveTexts()
  updateWordCounter()
}

export function switchTexts() {
  const leftText = document.getElementById('leftTextarea').value

  document.getElementById('leftTextarea').value =
    document.getElementById('rightTextarea').value
  document.getElementById('rightTextarea').value = leftText

  saveTexts()
  updateWordCounter()
}

export function setSpellcheck(value) {
  const spellcheckInput = $('#spellcheck')
  const spellcheck =
    value !== undefined
      ? value
      : spellcheckInput.prop('checked')
      ? 'true'
      : 'false'

  if (spellcheck === 'true' && !spellcheckInput.prop('checked')) {
    spellcheckInput.prop('checked', true)
  }

  console.log(spellcheck)
  $('textarea').attr('spellcheck', spellcheck)
  localStorage.setItem('awe.spellcheck', spellcheck)
}
