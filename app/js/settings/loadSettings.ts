import { changeFontface } from '../actions/changeFontface.ts'
import { changeFontsize } from '../actions/changeFontsize.ts'
import { changeLineheight } from '../actions/changeLineheight.ts'
import { TextWidth, changeTextWidth } from '../actions/changeTextWidth.ts'
import { changeThemeById } from '../actions/changeTheme.ts'
import { moveSplitter } from '../actions/moveSplitter.ts'
import { setSpellcheck } from '../actions/spellcheck.ts'
import { leftTextareaElement, rightTextareaElement } from '../elements.ts'
import { onTextareaInput } from '../textarea/onTextareaInput.ts'

function getSetting(key: string): string {
  const value = localStorage.getItem(key)
  if (value === null) {
    throw new Error(`Key "${key}" could not be loaded from Local Storage.`)
  }
  return value
}

function getIntSetting(key: string): number {
  const rawValue = getSetting(key)
  const value = Number.parseInt(rawValue)
  if (Number.isNaN(value)) {
    throw new Error(`Key "${key}" could be loaded from Local Storage but could not be parsed.`)
  }
  return value
}

export function loadSettings() {
  if (!(leftTextareaElement instanceof HTMLTextAreaElement)) return
  if (!(rightTextareaElement instanceof HTMLTextAreaElement)) return

  // Font family
  changeFontface(getSetting('awe.fontface'))

  // Text width
  changeTextWidth(getSetting('awe.textwidth') as TextWidth)

  // Remaining settings
  changeFontsize(getIntSetting('awe.fontsize'))
  changeLineheight(getIntSetting('awe.lineheight'))
  moveSplitter(getIntSetting('awe.splitter'))
  const themeId = getSetting('awe.themeid')?.replace(/_/g, '-') ?? null
  changeThemeById(themeId)
  setSpellcheck(getSetting('awe.spellcheck') === 'true')
  leftTextareaElement.value = getSetting('awe.text.left')
  rightTextareaElement.value = getSetting('awe.text.right')
  onTextareaInput()
}
