import {
  $id,
  isHTMLElement,
  metaThemeColorElement,
  textareaElements,
} from '../elements.js'

export function changeTheme(selectionId, isDarkTheme) {
  const toolbarElement = /** @type { HTMLDivElement } */ ($id('toolbar'))
  const sidebarElement = /** @type { HTMLDivElement } */ ($id('sidebar'))
  const selectedElement = $id(selectionId)
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
    case 'color':
      document.body.style.backgroundColor = selectedBackgroundColor

      for (const textarea of textareaElements) {
        if (!isHTMLElement(textarea)) continue
        textarea.style.color = selectedColor
      }

      metaThemeColorElement.setAttribute('content', selectedBackgroundColor)
      toolbarElement.style.backgroundColor = selectedBackgroundColor
      sidebarElement.style.backgroundColor = selectedBackgroundColor
      break
    case 'image':
    case 'photo':
    case 'apprx':
      document.body.style.backgroundImage = selectedBackgroundImage.replace(
        /_thumb/,
        '',
      )

      for (const textarea of textareaElements) {
        if (!isHTMLElement(textarea)) continue
        textarea.style.color = selectedColor
      }

      metaThemeColorElement.setAttribute('content', selectedBackgroundColor)
      toolbarElement.style.backgroundColor = selectedBackgroundColor
      sidebarElement.style.backgroundColor = selectedBackgroundColor
      break
  }

  document.body.classList.toggle('light-theme', !isDarkTheme)

  localStorage.setItem('awe.themeid', selectionId)
  localStorage.setItem('awe.darkTheme', isDarkTheme ? 'true' : 'false')
}
