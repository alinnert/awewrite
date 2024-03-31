import { addEvent, leftTextareaElement, rightTextareaElement } from '../elements.js'

export class WordCounter extends HTMLElement {
  get area() {
    return this.getAttribute('area')
  }

  get textarea() {
    if (this.area === 'left') {
      return leftTextareaElement
    } else {
      return rightTextareaElement
    }
  }

  connectedCallback() {
    this.classList.add('word-counter')
    addEvent(this.textarea, 'input', this.onTextareaInput.bind(this))
    this.onTextareaInput()
  }

  onTextareaInput() {
    const chars = this.textarea.value.length
    const charsWording = chars === 1 ? 'character' : 'characters'
    const words = this.getWordCount(this.textarea.value)
    const wordsWording = words === 1 ? 'word' : 'words'
    this.textContent = `${chars} ${charsWording} / ${words} ${wordsWording}`
  }

  getWordCount(text) {
    return (text.replace(/['";:,.?¿\-!¡]+/g, '').match(/\S+/g) || []).length
  }
}

customElements.define('word-counter', WordCounter)
