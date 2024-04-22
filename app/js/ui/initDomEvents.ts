import { FontFamily, changeFontface } from '../actions/changeFontface.ts'
import { changeFontsize } from '../actions/changeFontsize.ts'
import { changeLineheight } from '../actions/changeLineheight.ts'
import { TextWidth, changeTextWidth } from '../actions/changeTextWidth.ts'
import { changeThemeById } from '../actions/changeTheme.ts'
import { clearTexts } from '../actions/clearTexts.ts'
import { parseLineheight } from '../actions/font.ts'
import { moveSplitter } from '../actions/moveSplitter.ts'
import { updateSpellcheck } from '../actions/spellcheck.ts'
import { switchTexts } from '../actions/switchTexts.ts'
import {
  $class,
  $id,
  addEvent,
  expandToolbarButtonElements,
  fontSizeElement,
  isHTMLElement,
  lineHeightElement,
  textareaBoxElements,
  textareaElements,
} from '../elements.js'
import { onTextareaBoxElementsClick } from '../textarea/onTextareaBoxElementsClick.ts'
import { onTextareaClick } from '../textarea/onTextareaClick.ts'
import { onTextareaFocus } from '../textarea/onTextareaFocus.ts'
import { onTextareaInput } from '../textarea/onTextareaInput.ts'
import { supportTab } from '../textarea/supportTab.ts'
import { globalKeys } from './globalKeys.ts'
import { openSidebar } from './sidebar.ts'
import { ToolbarName, openToolbar } from './toolbar.ts'

export function initDomEvents() {
  addEvent(document.getRootNode(), 'keydown', globalKeys)

  // Textareas
  addEvent(textareaBoxElements, 'click', onTextareaBoxElementsClick)
  addEvent(textareaElements, 'click', onTextareaClick)
  addEvent(textareaElements, 'input', (event) => {
    const target = event.target
    if (!(target instanceof HTMLTextAreaElement)) return
    const area = target.dataset.area
    if (area !== 'left' && area !== 'right') return
    onTextareaInput(area)
  })
  addEvent(textareaElements, 'keydown', supportTab)
  addEvent(textareaElements, 'focus', onTextareaFocus)

  // Toolbar
  addEvent(expandToolbarButtonElements, 'click', (event) => {
    const target = event.currentTarget
    if (target === null || !isHTMLElement(target)) return

    const toolbarName = target.dataset.toolbar as ToolbarName
    openToolbar(toolbarName)
  })

  // Data
  addEvent($class('switch-texts-button'), 'click', switchTexts)
  addEvent($class('clear-texts-button'), 'click', clearTexts)
  addEvent($id('spellcheck'), 'change', updateSpellcheck)

  // Font face
  addEvent($class('change-fontface-button'), 'click', (event) => {
    const target = event.currentTarget
    if (target === null || !isHTMLElement(target)) return
    changeFontface(target.dataset.fontface as FontFamily)
  })

  // Font size
  addEvent($id('toolbar-fontsize-dec'), 'click', () => {
    const rawValue = fontSizeElement.textContent
    if (rawValue === null) return
    const currentFontsize = Number.parseInt(rawValue)
    changeFontsize(currentFontsize - 1)
  })
  addEvent($id('toolbar-fontsize-inc'), 'click', () => {
    const rawValue = fontSizeElement.textContent
    if (rawValue === null) return
    const currentFontsize = Number.parseInt(rawValue)
    changeFontsize(currentFontsize + 1)
  })

  // Line height
  addEvent($id('toolbar-lineheight-dec'), 'click', () => {
    const rawValue = lineHeightElement.textContent
    if (rawValue === null) return
    const currentLineheight = parseLineheight(rawValue)
    changeLineheight(currentLineheight - 1)
  })
  addEvent($id('toolbar-lineheight-inc'), 'click', () => {
    const rawValue = lineHeightElement.textContent
    if (rawValue === null) return
    const currentLineheight = parseLineheight(rawValue)
    changeLineheight(currentLineheight + 1)
  })

  // Textbox layout
  addEvent($class('change-textbox-layout-button'), 'click', (event) => {
    const target = event.currentTarget
    if (target === null || !isHTMLElement(target)) return
    const rawValue = target.dataset.value
    if (rawValue === undefined) return
    moveSplitter(Number.parseInt(rawValue))
  })

  // Text width
  addEvent($class('change-text-width-button'), 'click', (event) => {
    const target = event.currentTarget
    if (target === null || !isHTMLElement(target)) return
    const rawValue = target.dataset.textWidth
    if (rawValue === undefined) return
    changeTextWidth(rawValue as TextWidth)
  })

  // Sidebar
  addEvent($class('open-sidebar-button'), 'click', (event) => {
    const target = event.currentTarget
    if (target === null || !isHTMLElement(target)) return
    const rawValue = target.dataset.sidebar
    if (rawValue === undefined) return
    openSidebar(rawValue)
  })
  addEvent($class('sidebar-icon'), 'click', (event) => {
    const target = event.currentTarget
    if (target === null || !isHTMLElement(target)) return
    const rawValue = target.getAttribute('id')
    if (rawValue === null) return
    changeThemeById(rawValue)
  })
}
