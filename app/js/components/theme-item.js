import { changeTheme, themeEvents } from '../actions/changeTheme.js'

/**
 * @typedef {{
 *   displayName: string,
 *   id: string,
 *   textColor: string,
 *   backgroundColor: string,
 *   backgroundImage?: string,
 *   isDarkTheme: boolean,
 *   creditsName?: string,
 *   creditsUrl?: string,
 * }} ThemeData
 */

customElements.define(
  'theme-item',
  class extends HTMLElement {
    /** @type {ThemeData} */
    #themeData

    get themeData() {
      return this.#themeData
    }

    get #hasCredits() {
      return this.#themeData.creditsName !== null && this.#themeData.creditsUrl !== null
    }

    connectedCallback() {
      this.#themeData = {
        displayName: this.getAttribute('theme-name'),
        id: this.getAttribute('id'),
        textColor: this.getAttribute('text-color'),
        backgroundColor: this.getAttribute('background-color'),
        backgroundImage: this.getAttribute('background-image'),
        isDarkTheme: this.getAttribute('dark-theme') !== null,
        creditsName: this.getAttribute('credits-name'),
        creditsUrl: this.getAttribute('credits-url'),
      }

      this.classList.add('theme-item')

      const creditsHtml = this.#hasCredits
        ? `
          <div class='theme-item__credits'>
            by <a href='${this.#themeData.creditsUrl}'>${this.#themeData.creditsName}</a>
          </div>
        `
        : ''

      this.innerHTML = `
        <div class='theme-item__preview'>
          <div class='theme-item__name'>${this.#themeData.displayName}</div>
        </div>
        ${creditsHtml}
      `

      const nameElement = /** @type {HTMLElement} */ (this.querySelector('.theme-item__name'))
      nameElement.style.color = this.#themeData.textColor

      const previewElement = /** @type {HTMLElement} */ (this.querySelector('.theme-item__preview'))
      previewElement.style.backgroundColor = this.#themeData.backgroundColor

      if (this.#themeData.backgroundImage !== null) {
        const thumbnailImageFilename = this.#themeData.backgroundImage.replace(
          /.jpg$/,
          '_thumb.jpg',
        )
        previewElement.style.backgroundImage = `url(themes/${thumbnailImageFilename})`
      }

      previewElement.addEventListener('click', this.#handlePreviewClick.bind(this))

      themeEvents.addEventListener(
        'changetheme',
        /** @param {CustomEvent} event */
        (event) => {
          const isCurrentTheme = this.#themeData.id === event.detail.id
          this.classList.toggle('theme-item--is-current', isCurrentTheme)
        },
      )
    }

    #handlePreviewClick() {
      changeTheme(this.#themeData)
    }
  },
)
