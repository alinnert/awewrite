import { addEvent } from '../elements.ts'
import { floatAttr, intAttr, stringAttr } from '../lib/components/attributeConverters.ts'
import { DynamicAttr, createAttr } from '../lib/components/createAttr.ts'
import { createTargets } from '../lib/components/targets.ts'
import { parseTemplate } from '../lib/template/templateParser.ts'
import template from './NumericSetting.html?raw'

export class NumericSetting extends HTMLElement {
  #label: DynamicAttr<string> = createAttr(this, 'label', { type: stringAttr() })

  #decimalPoints: DynamicAttr<number> = createAttr(this, 'decimal-points', {
    type: intAttr(),
    defaultValue: 0,
  })

  #min: DynamicAttr<number> = createAttr(this, 'min', {
    type: floatAttr(this.#decimalPoints.get()),
    defaultValue: -Infinity,
  })

  #max: DynamicAttr<number> = createAttr(this, 'max', {
    type: floatAttr(this.#decimalPoints.get()),
    defaultValue: Infinity,
  })

  #step: DynamicAttr<number> = createAttr(this, 'step', {
    type: floatAttr(this.#decimalPoints.get()),
    defaultValue: 1,
  })

  #value: DynamicAttr<number> = createAttr(this, 'value', {
    type: floatAttr(this.#decimalPoints.get()),
    defaultValue: 0,
  })

  // value, decrement-value, increment-value
  #targets = createTargets(this, 'settings-menu-item')

  connectedCallback() {
    this.classList.add('settings-menu-item', 'numeric-setting')

    // Enable/disable [-] [+] buttons.
    this.#value.onChange((value) => {
      this.#targets.first('decrement-value')?.toggleAttribute('disabled', value === this.#min.get())
      this.#targets.first('increment-value')?.toggleAttribute('disabled', value === this.#max.get())
    })

    this.innerHTML = parseTemplate(template, {
      label: this.#label.get(),
      value: this.#value.get(),
    })

    addEvent(this.#targets.first('decrement-value'), 'click', () => {
      this.#value.update((v) => v - this.#step.get())
      this.update()
    })

    addEvent(this.#targets.first('increment-value'), 'click', () => {
      this.#value.update((v) => v + this.#step.get())
      this.update()
    })

    this.update()
  }

  attributeChangedCallback() {
    this.update()
  }

  update() {
    const valueTarget = this.#targets.first('value')
    if (valueTarget === undefined) return
    valueTarget.textContent = this.#value.getRaw()
  }
}

customElements.define('numeric-setting', NumericSetting)
