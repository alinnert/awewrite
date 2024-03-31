import {
  $class,
  $id,
  showElement,
  sidebarElement,
  toolbarElement,
  toolbarLineAllElements,
} from '../elements.js'
import { closeSidebar, openSidebar, sidebarEvents } from './sidebar.js'
import { restoreTextareaFocus } from '../textarea/onTextareaFocus.js'

/**
 * @typedef { 'data' | 'font' | 'layout' | 'background' | 'about' } ToolbarName
 */

/**
 * @typedef { 'data' | 'font' | 'layout' | 'background' | 'about' } ToolbarName
 */

/**
 * @param { ToolbarName } toolbarSection
 */
export function openToolbar(toolbarSection) {
  const sectionId = `toolbar-line-${toolbarSection}`
  const section = $id(sectionId)

  for (const element of toolbarLineAllElements) {
    if (element.getAttribute('id') === sectionId) continue
    element.removeAttribute('data-open')
  }

  const allToolbarButtons = $class('expand-toolbar-button')
  const currentToolbarButton = document.querySelector(`[data-toolbar="${toolbarSection}"]`)

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
        const sidebarContentElement = $id(themeId).closest('.sidebar-content')
        const sidebarContentId = sidebarContentElement.getAttribute('id')
        const sidebarName = sidebarContentId.replace(/^sidebar-/, '')
        openSidebar(sidebarName)
      }
    } else {
      closeSidebar()
    }

    section.setAttribute('data-open', '')
  }
}

export function closeToolbar() {
  const allToolbarButtons = $class('expand-toolbar-button')

  for (const element of allToolbarButtons) {
    element.classList.remove('is-current')
  }

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

sidebarEvents.addEventListener('opensidebar', (event) => {
  for (const element of Array.from($class('open-sidebar-button'))) {
    element.classList.toggle('current', element.dataset.sidebar === event.detail.sidebarName)
  }
})

sidebarEvents.addEventListener('closesidebar', () => {
  document.querySelector('.open-sidebar-button.current')?.classList.remove('current')
})
