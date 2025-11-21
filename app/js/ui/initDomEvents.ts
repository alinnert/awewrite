import { updateFontsize } from '../actions/changeFontSize.ts'
import { updateLineHeight } from '../actions/changeLineHeight.ts'
import { currentTextWidth$ } from '../actions/changeTextWidth.ts'
import { applyThemeById } from '../actions/changeTheme.ts'
import { clearTexts } from '../actions/clearTexts.ts'
import { currentEditorLayout$ } from '../actions/editorLayout.ts'
import { currentSpellcheckState$ } from '../actions/spellcheck.ts'
import { switchTexts } from '../actions/switchTexts.ts'
import { texts } from '../actions/textEditors.ts'
import {
  $class,
  $id,
  addEvent,
  expandToolbarButtonElements,
  isHTMLElement,
  textareaBoxElements,
  textareaElements,
} from '../elements.js'
import { onTextareaBoxElementsClick } from '../textarea/onTextareaBoxElementsClick.ts'
import { onTextareaClick } from '../textarea/onTextareaClick.ts'
import { onTextareaFocus } from '../textarea/onTextareaFocus.ts'
import { onTextareaKeydown } from '../textarea/onTextareaKeydown.ts'
import { onKeydown } from './onKeydown.ts'
import { openSidebar } from './sidebar.ts'
import { openToolbar, ToolbarName } from './toolbar.ts'

export function initDomEvents() {
  addEvent(document.body, 'keydown', onKeydown)

  // Textareas
  addEvent(textareaBoxElements, 'click', onTextareaBoxElementsClick)
  addEvent(textareaElements, 'click', onTextareaClick)
  addEvent(textareaElements, 'input', (event) => {
    const target = event.target
    if (!(target instanceof HTMLTextAreaElement)) return
    const area = target.dataset.area

    if (area === 'left') {
      texts.leftText$.set(target.value)
    } else if (area === 'right') {
      texts.rightText$.set(target.value)
    }
  })
  addEvent(textareaElements, 'keydown', onTextareaKeydown)
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
  addEvent($id('spellcheck'), 'change', (event) => {
    if (!(event.currentTarget instanceof HTMLInputElement)) return
    currentSpellcheckState$.set(event.currentTarget.checked ? 'true' : 'false')
  })

  // Font size
  addEvent($id('toolbar-fontsize-dec'), 'click', () => {
    updateFontsize(-1)
  })
  addEvent($id('toolbar-fontsize-inc'), 'click', () => {
    updateFontsize(1)
  })

  // Line height
  addEvent($id('toolbar-lineheight-dec'), 'click', () => {
    updateLineHeight(-0.1)
  })
  addEvent($id('toolbar-lineheight-inc'), 'click', () => {
    updateLineHeight(0.1)
  })

  // Textbox layout
  addEvent($class('change-textbox-layout-button'), 'click', (event) => {
    const target = event.currentTarget
    if (target === null || !isHTMLElement(target)) return
    const rawValue = target.dataset.value
    if (rawValue === undefined) return
    currentEditorLayout$.set(rawValue)
  })

  // Text width
  addEvent($class('change-text-width-button'), 'click', (event) => {
    const target = event.currentTarget
    if (target === null || !isHTMLElement(target)) return
    const rawValue = target.dataset.textWidth
    if (rawValue === undefined) return
    currentTextWidth$.set(rawValue)
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
    applyThemeById(rawValue)
  })
}
