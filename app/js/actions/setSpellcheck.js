import { spellcheckElement, textareaElements } from '../elements.js'

export function setSpellcheck(value) {
  const spellcheck = value !== undefined ? value : spellcheckElement.checked ? 'true' : 'false'

  if (spellcheck === 'true' && !spellcheckElement.checked) {
    spellcheckElement.checked = true
  }

  for (const textarea of textareaElements) {
    textarea.setAttribute('spellcheck', spellcheck)
  }

  localStorage.setItem('awe.spellcheck', spellcheck)
}
