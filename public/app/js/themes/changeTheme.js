import { metaThemeColorElement, textareaElements } from '../elements.js'

export function changeTheme(selectionId, isDarkTheme) {
  const selectedElement = document.getElementById(selectionId)
  const theme_type = selectionId.substr(6, 5)

  document.body.style.backgroundImage = 'none'
  document.body.style.backgroundColor = 'transparent'

  switch (theme_type) {
    case 'color': {
      const background = selectedElement.style.backgroundColor
      document.body.style.backgroundColor = background

      const color = selectedElement.style.color
      for (const textarea of textareaElements) {
        textarea.style.color = color
      }

      metaThemeColorElement.setAttribute('content', background)
      break
    }

    case 'image':
    case 'photo':
    case 'apprx': {
      const background = selectedElement.style.backgroundImage
      document.body.style.backgroundImage = background.replace(/_thumb/, '')

      const color = selectedElement.style.color

      for (const textarea of textareaElements) {
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
