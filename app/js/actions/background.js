function changeTheme(selectionId, isDarkTheme) {
  const textareas = document.getElementsByTagName('textarea')
  const selectedElement = document.getElementById(selectionId)
  const metaThemeColor = document.getElementById('meta-theme-color')
  const theme_type = selectionId.substr(6, 5)

  document.body.style.backgroundImage = 'none'
  document.body.style.backgroundColor = 'transparent'

  switch (theme_type) {
    case 'color': {
      const background = selectedElement.style.backgroundColor
      const color = selectedElement.style.color

      document.body.style.backgroundColor = background

      for (const textarea of textareas) {
        textarea.style.color = color
      }

      metaThemeColor.setAttribute('content', background)
      break
    }

    case 'image':
    case 'photo':
    case 'apprx': {
      const background = selectedElement.style.backgroundImage
      const color = selectedElement.style.color

      document.body.style.backgroundImage = background.replace(/_thumb/, '')

      for (const textarea of textareas) {
        textarea.style.color = color
      }

      metaThemeColor.setAttribute('content', '#181818')
      break
    }
  }

  document.body.classList.toggle('light-theme', !isDarkTheme)

  localStorage.setItem('awe.themeid', selectionId)
  localStorage.setItem('awe.darkTheme', isDarkTheme ? 'true' : 'false')
}
