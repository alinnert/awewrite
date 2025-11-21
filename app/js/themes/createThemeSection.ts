import { ThemeSection } from './initThemeElements'

export function createThemeSection(section: ThemeSection): HTMLElement[] {
  const result: HTMLElement[] = []

  const headingElement = document.createElement('h2')
  headingElement.innerText = section.heading
  result.push(headingElement)

  if ('infoText' in section && section.infoText !== undefined) {
    const infoTextElement = document.createElement('p')
    infoTextElement.classList.add('copyinfo')

    if ('infoUrl' in section && section.infoUrl !== undefined) {
      const infoLinkElement = document.createElement('a')
      infoLinkElement.setAttribute('href', section.infoUrl)
      infoLinkElement.innerText = section.infoText
      infoTextElement.insertAdjacentElement('afterbegin', infoLinkElement)
    } else {
      infoTextElement.innerText = section.infoText
    }

    result.push(infoTextElement)
  }

  const themeItemElements = section.themes.map((t) => {
    const themeItemElement = document.createElement('theme-item')
    themeItemElement.setAttribute('theme-name', t.themeName)
    themeItemElement.setAttribute('id', t.id)
    themeItemElement.setAttribute('text-color', t.textColor)
    themeItemElement.setAttribute('background-color', t.backgroundColor)
    if ('backgroundImage' in t) {
      themeItemElement.setAttribute('background-image', t.backgroundImage)
    }
    if ('isDarkTheme' in t) {
      themeItemElement.toggleAttribute('dark-theme', t.isDarkTheme ?? false)
    }
    if ('creditsName' in t) {
      themeItemElement.setAttribute('credits-name', t.creditsName)
    }
    if ('creditsUrl' in t) {
      themeItemElement.setAttribute('credits-url', t.creditsUrl)
    }
    return themeItemElement
  })

  const themeListElement = document.createElement('div')
  themeListElement.classList.add('theme-list')
  themeItemElements.forEach((el) => themeListElement.insertAdjacentElement('beforeend', el))
  result.push(themeListElement)

  return result
}
