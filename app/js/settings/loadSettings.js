import { setSpellcheck } from '../actions/data.js'
import { changeFontsize } from '../actions/font.js'
import { changeTextWidth, moveSplitter } from '../actions/layout.js'
import {
  isHTMLElement,
  leftTextareaElement,
  rightTextareaElement,
  textareaElements,
} from '../elements.js'
import { changeTheme } from '../themes/changeTheme.js'
import { fontfaceNumber } from './fontfaceNumber.js'
import { textwidthNumber } from './textwidthNumber.js'

export function loadSettings() {
  if (!(leftTextareaElement instanceof HTMLTextAreaElement)) return
  if (!(rightTextareaElement instanceof HTMLTextAreaElement)) return

  let buttonIndex

  // FONT FAMILY
  for (const textarea of textareaElements) {
    if (!isHTMLElement(textarea)) continue
    textarea.style.fontFamily = localStorage.getItem('awe.fontface')
  }

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
  leftTextareaElement.value = localStorage.getItem('awe.text.left')
  rightTextareaElement.value = localStorage.getItem('awe.text.right')
}
