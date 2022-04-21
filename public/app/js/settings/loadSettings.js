import { setSpellcheck } from '../actions/data.js'
import { changeFontsize } from '../actions/font.js'
import { changeTextWidth, moveSplitter } from '../actions/layout.js'
import { fontfaceNumber } from './fontfaceNumber.js'
import { textwidthNumber } from './textwidthNumber.js'
import { changeTheme } from '../themes/changeTheme.js'

export function loadSettings() {
  let buttonIndex

  // FONT FAMILY
  $('textarea').css('font-family', localStorage.getItem('awe.fontface'))
  buttonIndex = fontfaceNumber(localStorage.getItem('awe.fontface'))

  if (buttonIndex == -1) {
    buttonIndex = 0
  }

  document.getElementsByName('fontface')[buttonIndex].click()

  // TEXT WIDTH
  changeTextWidth(localStorage.getItem('awe.textwidth'))
  buttonIndex = textwidthNumber(localStorage.getItem('awe.textwidth'))

  if (buttonIndex == -1) {
    buttonIndex = 0
  }

  document.getElementsByName('textwidth')[buttonIndex].click()

  const darkThemeValue = localStorage.getItem('awe.darkTheme')
  const isDarkTheme = darkThemeValue !== 'false'

  changeFontsize(localStorage.getItem('awe.fontsize'))
  moveSplitter(parseInt(localStorage.getItem('awe.splitter')))
  changeTheme(localStorage.getItem('awe.themeid'), isDarkTheme)
  setSpellcheck(localStorage.getItem('awe.spellcheck'))
  document.getElementById('leftTextarea').value =
    localStorage.getItem('awe.text.left')
  document.getElementById('rightTextarea').value =
    localStorage.getItem('awe.text.right')
}
