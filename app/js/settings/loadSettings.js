import { changeFontsize } from '../actions/changeFontsize.js'
import { changeLineheight } from '../actions/changeLineheight.js'
import { changeTextWidth } from '../actions/changeTextWidth.js'
import { changeTheme } from '../actions/changeTheme.js'
import { moveSplitter } from '../actions/moveSplitter.js'
import { setSpellcheck } from '../actions/setSpellcheck.js'
import {
  fontFaceElement,
  isHTMLElement,
  leftTextareaElement,
  rightTextareaElement,
  textareaElements,
  textWidthElement,
} from '../elements.js'
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

  fontFaceElement[buttonIndex].click()

  // TEXT WIDTH
  changeTextWidth(localStorage.getItem('awe.textwidth'))
  buttonIndex = textwidthNumber(localStorage.getItem('awe.textwidth'))

  if (buttonIndex == -1) {
    buttonIndex = 0
  }

  textWidthElement[buttonIndex].click()

  const darkThemeValue = localStorage.getItem('awe.darkTheme')
  const isDarkTheme = darkThemeValue !== 'false'

  changeFontsize(localStorage.getItem('awe.fontsize'))
  changeLineheight(localStorage.getItem('awe.lineheight'))
  moveSplitter(Number.parseInt(localStorage.getItem('awe.splitter')))
  const themeId =
    localStorage.getItem('awe.themeid')?.replace(/_/g, '-') ?? null
  changeTheme(themeId, isDarkTheme)
  setSpellcheck(localStorage.getItem('awe.spellcheck'))
  leftTextareaElement.value = localStorage.getItem('awe.text.left')
  rightTextareaElement.value = localStorage.getItem('awe.text.right')
}
