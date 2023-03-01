import {
  sidebarElement,
  toolbarElement,
  toolbarLineAllElements
} from '../elements.js'
import { restoreTextareaFocus } from '../textarea/onTextareaFocus.js'
import { closeSidebar } from './closeSidebar.js'

export function closeToolbar() {
  for (const element of toolbarLineAllElements) {
    element.removeAttribute('data-open')
  }

  toolbarElement.style.height = '40px'
  sidebarElement.style.top = '40px'

  for (const line of toolbarLineAllElements) {
    if (!(line instanceof HTMLElement)) continue
    line.style.display = 'none'
  }

  closeSidebar()
  restoreTextareaFocus()
}
