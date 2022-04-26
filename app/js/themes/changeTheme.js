import {
  isHTMLElement,
  metaThemeColorElement,
  textareaElements,
} from '../elements.js'

export function changeTheme(selectionId, isDarkTheme) {
  const selectedElement = document.getElementById(selectionId)
  const selectedElementStyles = getComputedStyle(selectedElement)
  const selectedBackgroundColor =
    selectedElementStyles.getPropertyValue('background-color')
  const selectedBackgroundImage =
    selectedElementStyles.getPropertyValue('background-image')
  const selectedColor = selectedElementStyles.getPropertyValue('color')
  const themeType = selectionId.substr(6, 5)

  document.body.style.backgroundImage = 'none'
  document.body.style.backgroundColor = 'transparent'

  switch (themeType) {
    case 'color': {
      const background = selectedBackgroundColor
      document.body.style.backgroundColor = background

      const color = selectedColor
      for (const textarea of textareaElements) {
        if (!isHTMLElement(textarea)) continue
        textarea.style.color = color
      }

      metaThemeColorElement.setAttribute('content', background)
      break
    }

    case 'image':
    case 'photo':
    case 'apprx': {
      const background = selectedBackgroundImage
      document.body.style.backgroundImage = background.replace(/_thumb/, '')

      const color = selectedColor
      for (const textarea of textareaElements) {
        if (!isHTMLElement(textarea)) continue
        textarea.style.color = color
      }

      metaThemeColorElement.setAttribute('content', '#181818')
      break
    }
  }

  document.body.classList.toggle('light-theme', !isDarkTheme)

  localStorage.setItem('awe.themeid', selectionId)
  localStorage.setItem('awe.darkTheme', isDarkTheme ? 'true' : 'false')
}
