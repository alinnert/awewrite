import { changeFontface } from '../actions/changeFontface.js'
import { changeFontsize } from '../actions/changeFontsize.js'
import { changeLineheight } from '../actions/changeLineheight.js'
import { changeTextWidth } from '../actions/changeTextWidth.js'
import { changeThemeById } from '../actions/changeTheme.js'
import { clearTexts } from '../actions/clearTexts.js'
import { parseLineheight } from '../actions/font.js'
import { moveSplitter } from '../actions/moveSplitter.js'
import { setSpellcheck } from '../actions/setSpellcheck.js'
import { switchTexts } from '../actions/switchTexts.js'
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
import { onTextareaBoxElementsClick } from '../textarea/onTextareaBoxElementsClick.js'
import { onTextareaClick } from '../textarea/onTextareaClick.js'
import { onTextareaFocus } from '../textarea/onTextareaFocus.js'
import { onTextareaInput } from '../textarea/onTextareaInput.js'
import { supportTab } from '../textarea/supportTab.js'
import { globalKeys } from './globalKeys.js'
import { openSidebar } from './sidebar.js'
import { openToolbar } from './toolbar.js'

export function initDomEvents() {
  addEvent(document.getRootNode(), 'keydown', globalKeys)

  // Textareas
  addEvent(textareaBoxElements, 'click', onTextareaBoxElementsClick)
  addEvent(textareaElements, 'click', onTextareaClick)
  addEvent(textareaElements, 'input', onTextareaInput)
  addEvent(textareaElements, 'keydown', supportTab)
  addEvent(textareaElements, 'focus', onTextareaFocus)

  // Toolbar
  addEvent(expandToolbarButtonElements, 'click', (event) => {
    const target = event.currentTarget
    if (!isHTMLElement(target)) return
    const toolbarName =
      /** @type {import('./toolbar.js').ToolbarName} */
      (target.dataset.toolbar)
    openToolbar(toolbarName)
  })

  // Data
  addEvent($class('switch-texts-button'), 'click', switchTexts)
  addEvent($class('clear-texts-button'), 'click', clearTexts)
  addEvent($id('spellcheck'), 'change', () => setSpellcheck())

  // Font face
  addEvent($class('change-fontface-button'), 'click', (event) => {
    const target = event.currentTarget
    if (!isHTMLElement(target)) return
    changeFontface(target.dataset.fontface)
  })

  // Font size
  addEvent($id('toolbar-fontsize-dec'), 'click', () => {
    const currentFontsize = Number.parseInt(fontSizeElement.textContent)
    changeFontsize(currentFontsize - 1)
  })
  addEvent($id('toolbar-fontsize-inc'), 'click', () => {
    const currentFontsize = Number.parseInt(fontSizeElement.textContent)
    changeFontsize(currentFontsize + 1)
  })

  // Line height
  addEvent($id('toolbar-lineheight-dec'), 'click', () => {
    const currentLineheight = parseLineheight(lineHeightElement.textContent)
    changeLineheight(currentLineheight - 1)
  })
  addEvent($id('toolbar-lineheight-inc'), 'click', () => {
    const currentLineheight = parseLineheight(lineHeightElement.textContent)
    changeLineheight(currentLineheight + 1)
  })

  // Textbox layout
  addEvent($class('change-textbox-layout-button'), 'click', (event) => {
    const target = event.currentTarget
    if (!isHTMLElement(target)) return
    moveSplitter(Number.parseInt(target.dataset.value))
  })

  // Text width
  addEvent($class('change-text-width-button'), 'click', (event) => {
    const target = event.currentTarget
    if (!isHTMLElement(target)) return
    changeTextWidth(target.dataset.textWidth)
  })

  // Sidebar
  addEvent($class('open-sidebar-button'), 'click', (event) => {
    const target = event.currentTarget
    if (!isHTMLElement(target)) return
    openSidebar(target.dataset.sidebar)
  })
  addEvent($class('sidebar-icon'), 'click', (event) => {
    const target = event.currentTarget
    if (!isHTMLElement(target)) return
    changeThemeById(target.getAttribute('id'), target.hasAttribute('data-dark'))
  })
}
