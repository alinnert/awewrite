function changeTheme(selectionId, isDarkTheme) {
  console.log('change theme')
  const $body = $('body')
  const $textarea = $('textarea')
  const $selectedElement = $(`#${selectionId}`)
  const $metaThemeColor = $('#meta-theme-color')
  const theme_type = selectionId.substr(6, 5)

  $body.css('background-image', 'none')
  $body.css('background-color', 'transparent')

  switch (theme_type) {
    case 'color': {
      const background = $selectedElement.css('background-color')
      $body.css('background-color', background)

      const color = $selectedElement.css('color')
			$textarea.css('color', color)
			
			$metaThemeColor.attr('content', background)
      break
    }

    case 'image':
    case 'photo':
    case 'apprx': {
      const background = $selectedElement.css('background-image')
      $body.css('background-image', background.replace(/_thumb/, ''))

      const color = $selectedElement.css('color')
      $textarea.css('color', color)

			$metaThemeColor.attr('content', '#181818')
      break
    }
  }

  $body.toggleClass('light-theme', !isDarkTheme)

  localStorage.setItem('awe.themeid', selectionId)
  localStorage.setItem('awe.darkTheme', isDarkTheme ? 'true' : 'false')
}

