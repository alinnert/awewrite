import { changeTheme, currentTheme$ } from '../actions/changeTheme.ts'
import { addEvent } from '../elements.ts'
import { createTargets } from '../lib/components/targets.ts'
import { getThumbnailFilename } from '../lib/themes/getThumbnailFilename.ts'

export type ThemeData = {
  displayName: string
  id: string
  textColor: string
  backgroundColor: string
  backgroundImage?: string
  isDarkTheme: boolean
  creditsName?: string
  creditsUrl?: string
}

export class ThemeItem extends HTMLElement {
  #targets = createTargets(this, 'theme-item')

  #themeData!: ThemeData

  get themeData() {
    return this.#themeData
  }

  get #hasCredits() {
    return this.#themeData.creditsName !== null && this.#themeData.creditsUrl !== null
  }

  connectedCallback() {
    //#region check attributes
    if (!this.hasAttribute('theme-name')) {
      throw new Error('Theme item has no attribute "theme-name".')
    }

    if (!this.hasAttribute('id')) {
      throw new Error('Theme item has no attribute "id".')
    }

    if (!this.hasAttribute('text-color')) {
      throw new Error('Theme item has no attribute "text-color".')
    }

    if (!this.hasAttribute('background-color')) {
      throw new Error('Theme item has no attribute "background-color".')
    }
    //#endregion check attributes

    this.#themeData = {
      displayName: this.getAttribute('theme-name')!,
      id: this.getAttribute('id')!,
      textColor: this.getAttribute('text-color')!,
      backgroundColor: this.getAttribute('background-color')!,
      backgroundImage: this.getAttribute('background-image') ?? undefined,
      isDarkTheme: this.hasAttribute('dark-theme'),
      creditsName: this.getAttribute('credits-name') ?? undefined,
      creditsUrl: this.getAttribute('credits-url') ?? undefined,
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

    const nameElement = this.#targets.first('name')
    const previewElement = this.#targets.first('preview')

    nameElement.style.color = this.#themeData.textColor
    previewElement.style.backgroundColor = this.#themeData.backgroundColor

    if (this.#themeData.backgroundImage !== undefined) {
      const thumbnailImageFilename = getThumbnailFilename(this.#themeData.backgroundImage)
      previewElement.style.backgroundImage = `url(themes/${thumbnailImageFilename})`
    }

    addEvent(previewElement, 'click', this.#handlePreviewClick.bind(this))

    currentTheme$.onChange((themeData) => {
      if (themeData === null) return
      const isCurrentTheme = this.#themeData.id === themeData.id
      this.classList.toggle('theme-item--is-current', isCurrentTheme)
    })
  }

  #handlePreviewClick() {
    changeTheme(this.#themeData)
  }
}

customElements.define('theme-item', ThemeItem)
