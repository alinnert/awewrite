import { spellcheckElement, textareaElements } from '../elements.ts'

export function setSpellcheck(value: boolean) {
  spellcheckElement.checked = value
  applySpellcheck(value)
}

export function applySpellcheck(value: boolean) {
  for (const textarea of textareaElements) {
    textarea.toggleAttribute('spellcheck', value)
  }
}

export function updateSpellcheck(event: Event) {
  if (!(event.currentTarget instanceof HTMLInputElement)) return

  const value = event.currentTarget.checked

  applySpellcheck(value)
  localStorage.setItem('awe.spellcheck', value.toString())
}
