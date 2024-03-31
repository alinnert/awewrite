import { floatAttr, intAttr, stringAttr } from '../lib/components/attributeConverters.ts'
import { DynamicAttr, createAttr } from '../lib/components/createAttr.ts'
import { createTargets } from '../lib/components/targets.ts'

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
    this.classList.add('settings-menu-item', 'settings-menu-item/type:numeric')

    // Enable/disable [-] [+] buttons.
    this.#value.onChange((value) => {
      this.#targets.first('decrement-value').toggleAttribute('disabled', value === this.#min.get())
      this.#targets.first('increment-value').toggleAttribute('disabled', value === this.#max.get())
    })

    this.innerHTML = `
      <div>${this.#label.get()}</div>
      <div class="settings-menu-item__value">${this.#value.get()}</div>
      <button class="settings-menu-item__decrement-value">-</button>
      <button class="settings-menu-item__increment-value">+</button>
    `

    this.#targets.first('decrement-value').addEventListener('click', () => {
      this.#value.update((v) => v - this.#step.get())
      this.update()
    })

    this.#targets.first('increment-value').addEventListener('click', () => {
      this.#value.update((v) => v + this.#step.get())
      this.update()
    })

    this.update()
  }

  attributeChangedCallback() {
    this.update()
  }

  update() {
    this.#targets.first('value').textContent = this.#value.getRaw()
  }
}

customElements.define('numeric-setting', NumericSetting)
