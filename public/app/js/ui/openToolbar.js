import {
  $class,
  $id,
  showElement,
  toolbarLineAllElements,
} from '../elements.js'
import { closeSidebar } from './closeSidebar.js'
import { closeToolbar } from './closeToolbar.js'
import { openSidebar } from './openSidebar.js'

/**
 * @param { 'data' | 'font' | 'layout' | 'background' | 'about' } toolbarSection
 */
export function openToolbar(toolbarSection) {
  const sectionId = `toolbar_line_${toolbarSection}`
  const section = $id(sectionId)

  for (const element of toolbarLineAllElements) {
    if (element.getAttribute('id') === sectionId) continue
    element.removeAttribute('data-open')
  }

  const allToolbarButtons = $class('expand-toolbar-button')
  const currentToolbarButton = document.querySelector(
    `[data-toolbar="${toolbarSection}"]`,
  )

  for (const element of allToolbarButtons) {
    element.classList.remove('is-current')
  }

  currentToolbarButton.classList.add('is-current')

  if (section.hasAttribute('data-open')) {
    closeToolbar()
  } else {
    $id('toolbar').style.height = toolbarSection === 'font' ? '120px' : '80px'
    $id('sidebar').style.top = '80px'

    for (const line of toolbarLineAllElements) {
      if (!(line instanceof HTMLElement)) continue
      line.style.display = 'none'
    }

    showElement(section)

    if (toolbarSection === 'background') {
      const themeId = localStorage.getItem('awe.themeid')
      if (themeId !== null) {
        const sidebarContentElement = $id(themeId).closest('.sidebar_content')
        const sidebarContentId = sidebarContentElement.getAttribute('id')
        const sidebarName = sidebarContentId.replace(/^sidebar_/, '')
        openSidebar(sidebarName)
      }
    } else {
      closeSidebar()
    }

    section.setAttribute('data-open', '')
  }
}
