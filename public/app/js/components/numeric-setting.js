export class NumericSetting extends HTMLElement {
  get label() {
    return this.getAttribute('label')
  }
  set label(value) {
    this.setAttribute('label', value)
  }

  get value() {
    return this.getAttribute('value')
  }
  set value(value) {
    this.setAttribute('value', value)
  }

  get min() {
    return this.getAttribute('min')
  }
  set min(value) {
    this.setAttribute('min', value)
  }

  get max() {
    return this.getAttribute('max')
  }
  set max(value) {
    this.setAttribute('max', value)
  }

  connectedCallback() {
    this.classList.add('settings-menu-item', 'settings-menu-item/type:numeric')
    this.update()
  }

  update() {
    this.innerHTML = `
      <div>${this.label}</div>
      <div>${this.value}</div>
      <div>-</div>
      <div>+</div>
    `
  }
}

customElements.define('numeric-setting', NumericSetting)
