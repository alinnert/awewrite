export function moveSplitter(position) {
  if (position >= -3 && position <= 3) {
    let left

    switch (position) {
      case -3:
        left = 1
        break
      case -2:
        left = 20
        break
      case -1:
        left = 35
        break
      case 0:
        left = 50
        break
      case 1:
        left = 65
        break
      case 2:
        left = 80
        break
      case 3:
        left = 99
        break
    }

    const right = 100 - left

    $(function () {
      $('#leftBox').show('fade', 500)
      $('#rightBox').show('fade', 500)

      if (right == 99) {
        $('#leftBox').hide('fade', 500)
      } else if (left == 99) {
        $('#rightBox').hide('fade', 500)
      }

      $('#leftBox').css('right', right + '%')
      $('#rightBox').css('left', left + '%')
    })

    localStorage.setItem('awe.splitter', position)
  }
}

export function changeTextWidth(width) {
  let $textareas = $('textarea')

  switch (width) {
    case 'full':
      $textareas.css('max-width', 'initial')
      break
    case 'narrow':
      $textareas.css('max-width', '35em')
      break
    case 'wide':
      $textareas.css('max-width', '45em')
      break
  }

  localStorage.setItem('awe.textwidth', width)
}
