export class SettingsMenu extends HTMLElement {
  static get name() {
    return 'settings-menu'
  }

  get open() {
    return this.hasAttribute('open')
  }

  set open(value: boolean) {
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

customElements.define(SettingsMenu.name, SettingsMenu)
