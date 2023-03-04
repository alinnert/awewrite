import {
  $id,
  isHTMLElement,
  metaThemeColorElement,
  sidebarElement,
  textareaElements,
  toolbarElement,
} from '../elements.js'

export function changeTheme(selectionId, isDarkTheme) {
  const selectedElement = /** @type { HTMLDivElement } */ ($id(selectionId))
  const styles = getComputedStyle(selectedElement)
  const backgroundColor = styles.getPropertyValue('background-color')
  const backgroundImage = styles.getPropertyValue('background-image')
  const color = styles.getPropertyValue('color')
  const themeType = selectionId.substr(6, 5)

  document.body.style.backgroundImage = 'none'
  document.body.style.backgroundColor = 'transparent'

  switch (themeType) {
    case 'color':
      document.body.style.backgroundColor = backgroundColor
      document.body.classList.remove('has-background-image')

      updateTextareas(color)
      updateTitleAndToolbar(backgroundColor)
      break
    case 'image':
    case 'photo':
    case 'apprx':
      document.body.style.backgroundImage = backgroundImage.replace(
        /_thumb/,
        '',
      )
      document.body.classList.add('has-background-image')

      updateTextareas(color)
      updateTitleAndToolbar(backgroundColor)
      break
  }

  document.body.classList.toggle('light-theme', !isDarkTheme)

  localStorage.setItem('awe.themeid', selectionId)
  localStorage.setItem('awe.darkTheme', isDarkTheme ? 'true' : 'false')
}

/** @param { string } backgroundColor */
function updateTitleAndToolbar(backgroundColor) {
  metaThemeColorElement.setAttribute('content', backgroundColor)
  toolbarElement.style.backgroundColor = backgroundColor
  sidebarElement.style.backgroundColor = backgroundColor
}

/** @param { string } color */
function updateTextareas(color) {
  for (const textarea of textareaElements) {
    if (!isHTMLElement(textarea)) continue
    textarea.style.color = color
  }
}
