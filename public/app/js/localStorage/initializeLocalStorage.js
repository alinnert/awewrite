/**
 * If no data is present initialize local storage with default settings.
 */
export function initializeLocalStorage() {
  if (localStorage.getItem('awe.save') !== 'true') {
    localStorage.setItem('awe.save', 'true')
    localStorage.setItem('awe.fontface', '"IBM Plex Sans", sans-serif')
    localStorage.setItem('awe.fontsize', '16')
    localStorage.setItem('awe.lineheight', '4')
    localStorage.setItem('awe.splitter', '0')
    localStorage.setItem('awe.textwidth', 'narrow')
    localStorage.setItem('awe.themeid', 'theme_color_blue')
    localStorage.setItem('awe.darkTheme', 'true')
    localStorage.setItem('awe.spellcheck', 'true')
    localStorage.setItem(
      'awe.text.left',
      'Welcome! You can find the settings here ↑\n\nYou can use them to tweak the look and feel of AWE.write.',
    )
    localStorage.setItem(
      'awe.text.right',
      'Just enter or paste some text in any of the two text areas.\n\nYour text will be saved automatically locally on your machine only.\n\nHappy typing :)',
    )
  }
}
