import { clearTexts, setSpellcheck, switchTexts } from '../actions/data.js'
import {
  changeFontface,
  changeFontsize,
  changeLineheight,
  parseLineheight,
} from '../actions/font.js'
import { changeTextWidth, moveSplitter } from '../actions/layout.js'
import {
  $class,
  $id,
  addEvent,
  expandToolbarButtonElements,
  fontSizeElement,
  isHTMLElement,
  leftBoxElement,
  lineHeightElement,
  rightBoxElement,
  textareaElements,
} from '../elements.js'
import { onTextareaInput } from '../textarea/onTextareaInput.js'
import { supportTab } from '../textarea/supportTab.js'
import { changeTheme } from '../themes/changeTheme.js'
import { closeToolbar } from './closeToolbar.js'
import { openSidebar } from './openSidebar.js'
import { openToolbar } from './openToolbar.js'

export function initDomEvents() {
  // Textareas
  addEvent(leftBoxElement, 'click', closeToolbar)
  addEvent(rightBoxElement, 'click', closeToolbar)
  addEvent(textareaElements, 'input', onTextareaInput)
  addEvent(textareaElements, 'keydown', supportTab)

  // Toolbar
  addEvent(expandToolbarButtonElements, 'click', (event) => {
    const target = event.currentTarget
    if (!isHTMLElement(target)) return
    openToolbar(target.dataset.toolbar)
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
  addEvent($id('toolbar_fontsize_dec'), 'click', () => {
    const currentFontsize = parseInt(fontSizeElement.textContent)
    changeFontsize(currentFontsize - 1)
  })
  addEvent($id('toolbar_fontsize_inc'), 'click', () => {
    const currentFontsize = parseInt(fontSizeElement.textContent)
    changeFontsize(currentFontsize + 1)
  })

  // Line height
  addEvent($id('toolbar_lineheight_dec'), 'click', () => {
    const currentLineheight = parseLineheight(lineHeightElement.textContent)
    changeLineheight(currentLineheight - 1)
  })
  addEvent($id('toolbar_lineheight_inc'), 'click', () => {
    const currentLineheight = parseLineheight(lineHeightElement.textContent)
    changeLineheight(currentLineheight + 1)
  })

  // Splitter
  addEvent($id('toolbar_splitter_left'), 'click', () => {
    moveSplitter(parseInt(localStorage.getItem('awe.splitter')) - 1)
  })
  addEvent($id('toolbar_splitter_right'), 'click', () => {
    moveSplitter(parseInt(localStorage.getItem('awe.splitter')) + 1)
  })
  addEvent($id('toolbar_splitter_reset'), 'click', () => {
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
  addEvent($class('sidebar_icon'), 'click', (event) => {
    const target = event.currentTarget
    if (!isHTMLElement(target)) return
    changeTheme(target.getAttribute('id'), target.hasAttribute('data-dark'))
  })
}
