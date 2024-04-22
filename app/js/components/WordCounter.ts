import { addEvent, leftTextareaElement, rightTextareaElement } from '../elements.ts'

export class WordCounter extends HTMLElement {
  get #area() {
    return this.getAttribute('area')
  }

  get #textarea(): HTMLTextAreaElement {
    if (this.#area === 'left' && leftTextareaElement instanceof HTMLTextAreaElement) {
      return leftTextareaElement
    }

    if (this.#area === 'right' && rightTextareaElement instanceof HTMLTextAreaElement) {
      return rightTextareaElement
    }

    throw new Error('No textarea element found.')
  }

  connectedCallback() {
    if (this.#textarea === null) return

    this.classList.add('word-counter')

    addEvent(this.#textarea, 'input', this.onTextareaInput.bind(this))
    this.onTextareaInput()
  }

  onTextareaInput() {
    const chars = this.#textarea.value.length
    const charsWording = chars === 1 ? 'character' : 'characters'
    const words = this.getWordCount(this.#textarea.value)
    const wordsWording = words === 1 ? 'word' : 'words'
    this.textContent = `${chars} ${charsWording} / ${words} ${wordsWording}`
  }

  getWordCount(text: string) {
    return (text.replace(/['";:,.?¿\-!¡]+/g, '').match(/\S+/g) || []).length
  }
}

customElements.define('word-counter', WordCounter)
