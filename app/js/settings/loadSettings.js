import { changeFontsize } from '../actions/changeFontsize.js'
import { changeLineheight } from '../actions/changeLineheight.js'
import { changeTextWidth } from '../actions/changeTextWidth.js'
import { changeThemeById } from '../actions/changeTheme.js'
import { moveSplitter } from '../actions/moveSplitter.js'
import { setSpellcheck } from '../actions/setSpellcheck.js'
import { leftTextareaElement, rightTextareaElement, textWidthElement } from '../elements.js'
import { textwidthNumber } from './textwidthNumber.js'
import { changeFontface } from '../actions/changeFontface.js'
import { onTextareaInput } from '../textarea/onTextareaInput.js'

export function loadSettings() {
  if (!(leftTextareaElement instanceof HTMLTextAreaElement)) return
  if (!(rightTextareaElement instanceof HTMLTextAreaElement)) return

  // Font family
  changeFontface(localStorage.getItem('awe.fontface'))

  // const fontFaceButtonIndex = fontfaceNumber(localStorage.getItem('awe.fontface'))
  // fontFaceElement[fontFaceButtonIndex].click()

  // Text width
  changeTextWidth(localStorage.getItem('awe.textwidth'))
  const textWidthButtonIndex = textwidthNumber(localStorage.getItem('awe.textwidth'))
  textWidthElement[textWidthButtonIndex].click()

  // Remaining settings
  changeFontsize(localStorage.getItem('awe.fontsize'))
  changeLineheight(localStorage.getItem('awe.lineheight'))
  moveSplitter(Number.parseInt(localStorage.getItem('awe.splitter')))
  const themeId = localStorage.getItem('awe.themeid')?.replace(/_/g, '-') ?? null
  changeThemeById(themeId)
  setSpellcheck(localStorage.getItem('awe.spellcheck'))
  leftTextareaElement.value = localStorage.getItem('awe.text.left')
  rightTextareaElement.value = localStorage.getItem('awe.text.right')
  onTextareaInput()
}
