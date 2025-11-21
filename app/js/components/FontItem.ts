import { currentFont$ } from '../actions/changeFontFace'
import { stringAttr } from '../lib/components/attributeConverters'
import { createAttr } from '../lib/components/createAttr'
import { createTargets } from '../lib/components/targets'
import { parseTemplate } from '../lib/template/templateParser'
import template from './FontItem.html?raw'

export class FontItem extends HTMLElement {
  #font = createAttr(this, 'font', { type: stringAttr() })
  #label = createAttr(this, 'label', { type: stringAttr() })

  #targets = createTargets(this, 'font-item')

  connectedCallback() {
    this.classList.add('font-item')

    this.innerHTML = parseTemplate(template, { label: this.#label.get() })

    const previewTarget = this.#targets.first('preview')
    if (previewTarget !== undefined) {
      previewTarget.style.fontFamily = this.#font.get()
    }

    this.addEventListener('click', this.#handleClick.bind(this))

    currentFont$.onChange((font) => {
      if (font === null) return
      const isCurrentFont = this.#font.get() === font
      this.classList.toggle('font-item--is-current', isCurrentFont)
    })
  }

  #handleClick() {
    currentFont$.set(this.#font.get())
  }
}

customElements.define('font-item', FontItem)
