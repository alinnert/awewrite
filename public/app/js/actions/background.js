import { $id, metaThemeColorElement, textareaElements } from '../elements.js'

function changeTheme(selectionId, isDarkTheme) {
  const selectedElement = $id(selectionId)
  const theme_type = selectionId.substr(6, 5)

  document.body.style.backgroundImage = 'none'
  document.body.style.backgroundColor = 'transparent'

  switch (theme_type) {
    case 'color': {
      const background = selectedElement.style.backgroundColor
      const color = selectedElement.style.color

      document.body.style.backgroundColor = background

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
      const color = selectedElement.style.color

      document.body.style.backgroundImage = background.replace(/_thumb/, '')

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
