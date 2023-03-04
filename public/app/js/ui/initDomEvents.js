import { changeTextWidth } from '../actions/changeTextWidth.js'
import { clearTexts } from '../actions/clearTexts.js'
import {
  changeFontface,
  changeFontsize,
  changeLineheight,
  parseLineheight,
} from '../actions/font.js'
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
import { changeTheme } from '../actions/changeTheme.js'
import { globalKeys } from './globalKeys.js'
import { openSidebar } from './openSidebar.js'
import { openToolbar } from './openToolbar.js'

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
      /** @type {import('./openToolbar.js').ToolbarName} */
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

  // Splitter
  addEvent($id('toolbar-splitter-left'), 'click', () => {
    moveSplitter(Number.parseInt(localStorage.getItem('awe.splitter')) - 1)
  })
  addEvent($id('toolbar-splitter-right'), 'click', () => {
    moveSplitter(Number.parseInt(localStorage.getItem('awe.splitter')) + 1)
  })
  addEvent($id('toolbar-splitter-reset'), 'click', () => {
    moveSplitter(0)
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
    changeTheme(target.getAttribute('id'), target.hasAttribute('data-dark'))
  })
}
