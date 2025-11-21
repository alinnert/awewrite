import { mutableValue } from '@alinnert/reactive'
import { currentTextWidth$ } from '../actions/changeTextWidth'
import { currentEditorLayout$ } from '../actions/editorLayout'
import { texts } from '../actions/textEditors'
import { addEvent } from '../elements'
import { stringAttr } from '../lib/components/attributeConverters'
import { createAttr } from '../lib/components/createAttr'
import { createTargets } from '../lib/components/targets'
import { parseTemplate } from '../lib/template/templateParser'
import template from './TextEditor.html?raw'

const textWidths: Record<string, string> = {
  narrow: '35em',
  medium: '45em',
  wide: '55em',
  full: 'initial',
}

export class TextEditor extends HTMLElement {
  #area = createAttr(this, 'area', { type: stringAttr() })

  #targets = createTargets(this, 'text-editor')

  #value = mutableValue<string>('')

  get text$() {
    return texts[`${this.#area}Text$`]
  }

  connectedCallback() {
    this.classList.add('text-editor')
    this.innerHTML = parseTemplate(template, {
      area: this.#area.get(),
    })

    if (this.#area.get() === 'left') {
      this.style.left = '0'
      this.style.right = '50%'
    } else {
      this.style.left = '50%'
      this.style.right = '0'
    }

    const textareaElement = this.#targets.firstOrThrow('textarea')

    addEvent(textareaElement, 'input', () => this.#handleTextareaInput)

    this.#value.onChange(() => this.#handleValueChange)
    currentEditorLayout$.onChange(() => this.#handleEditorLayoutChange)
    currentTextWidth$.onChange(() => this.#handleTextWidthChange)
  }

  #handleValueChange(value: string) {
    const textarea = this.#targets.firstOrThrow('textarea')
    if (!(textarea instanceof HTMLTextAreaElement)) return
    if (textarea.value === value) return
    textarea.value = value
  }

  #handleTextareaInput(event: Event) {
    const target = event.target
    if (!(target instanceof HTMLTextAreaElement)) return
    this.#value.set(target.value)
  }

  #handleEditorLayoutChange(layout: string) {
    const area = this.#area.get()
    if (layout === 'default') {
      if (area === 'left') {
        this.style.right = '50%'
      } else {
        this.style.left = '50%'
      }
    }

    const match = layout.match(/^(focus|max)-(left|right)$/)
    if (match === null) return
    // const [, layoutMode, editorSide] = match

    // if (layoutMode === 'focus') {
    // }
  }

  #handleTextWidthChange(textWidth: string) {
    const frameTarget = this.#targets.firstOrThrow('frame')
    frameTarget.style.width = textWidths[textWidth] ?? textWidths.narrow
  }
}

customElements.define('text-editor', TextEditor)
