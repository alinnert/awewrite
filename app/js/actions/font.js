export function changeFontface(font) {
  const fontFamilies = {
    'IBM Plex Sans': () => '"IBM Plex Sans", sans-serif',
    'IBM Plex Serif': () => '"IBM Plex Serif", serif',
    'IBM Plex Mono': () => '"IBM Plex Mono", sans-serif',
    Kalam: () => '"Kalam", cursive',
  }

  const fontFamily = fontFamilies[font]()

  $('textarea').css('font-family', fontFamily)
  localStorage.setItem('awe.fontface', fontFamily)
}

export function changeFontsize(size) {
  if (size >= 10 && size <= 24) {
    document.getElementById('toolbar_fontsize').innerHTML = size
    $('textarea').css('font-size', size + 'px')
  }

  localStorage.setItem('awe.fontsize', size)
}
