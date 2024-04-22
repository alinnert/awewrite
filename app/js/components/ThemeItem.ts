import { changeTheme, currentTheme$ } from '../actions/changeTheme.ts'
import { addEvent } from '../elements.ts'
import { createTargets } from '../lib/components/targets.ts'
import { parseTemplate } from '../lib/template/templateParser.ts'
import { getThumbnailFilename } from '../lib/themes/getThumbnailFilename.ts'
import template from './ThemeItem.html?raw'

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
    return this.#themeData.creditsName !== undefined && this.#themeData.creditsUrl !== undefined
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

    this.innerHTML = parseTemplate(template, {
      displayName: this.#themeData.displayName,
      creditsName: this.#themeData.creditsName,
      creditsUrl: this.#themeData.creditsUrl,
      hasCredits: this.#hasCredits,
    })

    const previewElement = this.#targets.first('preview')
    const nameElement = this.#targets.first('name')

    addEvent(previewElement, 'click', () => this.#handlePreviewClick())

    if (previewElement === undefined) {
      throw new Error('Preview element not found.')
    }

    if (nameElement === undefined) {
      throw new Error('Name element not found.')
    }

    previewElement.style.backgroundColor = this.#themeData.backgroundColor
    nameElement.style.color = this.#themeData.textColor

    if (this.#themeData.backgroundImage !== undefined) {
      const thumbnailImageFilename = getThumbnailFilename(this.#themeData.backgroundImage)
      previewElement.style.backgroundImage = `url(themes/${thumbnailImageFilename})`
    }


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
