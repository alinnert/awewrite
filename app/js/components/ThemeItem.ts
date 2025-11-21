import { currentDarkThemeId$, currentLightThemeId$, currentTheme$ } from '../actions/changeTheme.ts'
import { addEvent } from '../elements.ts'
import { stringAttr } from '../lib/components/attributeConverters.ts'
import { createAttr } from '../lib/components/createAttr.ts'
import { createBoolAttr } from '../lib/components/createBoolAttr.ts'
import { createTargets } from '../lib/components/targets.ts'
import { parseTemplate } from '../lib/template/templateParser.ts'
import { getThumbnailFilename } from '../lib/themes/getThumbnailFilename.ts'
import template from './ThemeItem.html?raw'

export type ThemeData = {
  themeName: string
  id: string
  textColor: string
  backgroundColor: string
  backgroundImage?: string
  isDarkTheme: boolean
  creditsName?: string
  creditsUrl?: string
}

export class ThemeItem extends HTMLElement {
  #themeName = createAttr(this, 'theme-name', { type: stringAttr() })
  #id = createAttr(this, 'id', { type: stringAttr() })
  #textColor = createAttr(this, 'text-color', { type: stringAttr() })
  #backgroundColor = createAttr(this, 'background-color', { type: stringAttr() })
  #backgroundImage = createAttr(this, 'background-image', {
    type: stringAttr(),
    defaultValue: '',
  })
  #darkTheme = createBoolAttr(this, 'dark-theme')
  #creditsName = createAttr(this, 'credits-name', { type: stringAttr(), defaultValue: '' })
  #creditsUrl = createAttr(this, 'credits-url', { type: stringAttr(), defaultValue: '' })

  #targets = createTargets(this, 'theme-item')

  #themeData!: ThemeData

  get themeData(): ThemeData {
    return this.#themeData
  }

  get #hasCredits(): boolean {
    return this.#themeData.creditsName !== '' && this.#themeData.creditsUrl !== ''
  }

  connectedCallback() {
    this.#themeData = {
      themeName: this.#themeName.get(),
      id: this.#id.get(),
      textColor: this.#textColor.get(),
      backgroundColor: this.#backgroundColor.get(),
      backgroundImage: this.#backgroundImage.get(),
      isDarkTheme: this.#darkTheme.get(),
      creditsName: this.#creditsName.get(),
      creditsUrl: this.#creditsUrl.get(),
    }

    this.classList.add('theme-item')

    this.innerHTML = parseTemplate(template, {
      displayName: this.#themeData.themeName,
      creditsName: this.#themeData.creditsName,
      creditsUrl: this.#themeData.creditsUrl,
      hasCredits: this.#hasCredits,
    })

    const previewElement = this.#targets.firstOrThrow('preview')
    const detailsElement = this.#targets.firstOrThrow('details')
    const setLightThemeElement = this.#targets.firstOrThrow('toggle-button--light')
    const setDarkThemeElement = this.#targets.firstOrThrow('toggle-button--dark')

    addEvent(setLightThemeElement, 'click', () => this.#handleSetLightThemeClick())
    addEvent(setDarkThemeElement, 'click', () => this.#handleSetDarkThemeClick())

    this.style.setProperty('--background', this.#themeData.backgroundColor)

    previewElement.style.backgroundColor = this.#themeData.backgroundColor
    detailsElement.style.color = this.#themeData.textColor

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

  #handleSetLightThemeClick() {
    currentLightThemeId$.set(this.#themeData.id)
  }

  #handleSetDarkThemeClick() {
    currentDarkThemeId$.set(this.#themeData.id)
  }
}

customElements.define('theme-item', ThemeItem)
