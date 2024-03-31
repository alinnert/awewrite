export class SettingsMenu extends HTMLElement {
  get open() {
    return this.hasAttribute('open')
  }

  /** @param {boolean} value */
  set open(value) {
    if (value) {
      this.setAttribute('open', '')
    } else {
      this.removeAttribute('open')
    }
  }
  
  connectedCallback() {
    this.classList.add('settings-menu')
  }
}

customElements.define('settings-menu', SettingsMenu)
