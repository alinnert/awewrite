import { createAttr, floatAttr, intAttr, stringAttr } from '../lib/components/attributes.js'
import { createTargets } from '../lib/components/targets.js'

export class NumericSetting extends HTMLElement {
  /** @type {import('../lib/components/attributes.js').DynamicAttr<string>} */
  #label = createAttr(this, 'label', { type: stringAttr })

  /** @type {import('../lib/components/attributes.js').DynamicAttr<number>} */
  #decimalPoints = createAttr(this, 'decimal-points', {
    type: intAttr,
    defaultValue: 0,
  })

  /** @type {import('../lib/components/attributes.js').DynamicAttr<number>} */
  #min = createAttr(this, 'min', {
    type: floatAttr(this.#decimalPoints.get()),
    defaultValue: -Infinity,
  })

  /** @type {import('../lib/components/attributes.js').DynamicAttr<number>} */
  #max = createAttr(this, 'max', {
    type: floatAttr(this.#decimalPoints.get()),
    defaultValue: Infinity,
  })

  /** @type {import('../lib/components/attributes.js').DynamicAttr<number>} */
  #step = createAttr(this, 'step', {
    type: floatAttr(this.#decimalPoints.get()),
    defaultValue: 1,
  })

  /** @type {import('../lib/components/attributes.js').DynamicAttr<number>} */
  #value = createAttr(this, 'value', {
    type: floatAttr(this.#decimalPoints.get()),
    defaultValue: 0,
  })

  // value, decrement-value, increment-value
  #targets = createTargets(this, 'settings-menu-item')

  connectedCallback() {
    this.classList.add('settings-menu-item', 'settings-menu-item/type:numeric')

    this.#value.onChange((value) => {
      this.#targets
        .getOne('decrement-value')
        .toggleAttribute('disabled', value === this.#min.getRaw())
      this.#targets
        .getOne('increment-value')
        .toggleAttribute('disabled', value === this.#max.getRaw())
    })

    this.innerHTML = `
      <div>${this.#label.get()}</div>
      <div class="settings-menu-item__value">${this.#value.get()}</div>
      <button class="settings-menu-item__decrement-value">-</button>
      <button class="settings-menu-item__increment-value">+</button>
    `

    this.#targets.getOne('decrement-value').addEventListener('click', () => {
      this.#value.update((v) => v - this.#step.get())
      this.update()
    })

    this.#targets.getOne('increment-value').addEventListener('click', () => {
      this.#value.update((v) => v + this.#step.get())
      this.update()
    })

    this.update()
  }

  attributeChangedCallback() {
    this.update()
  }

  update() {
    this.#targets.getOne('value').textContent = this.#value.getRaw()
  }
}

customElements.define('numeric-setting', NumericSetting)
