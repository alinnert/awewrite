import {
  $class,
  $id,
  openSidebarElements,
  showElement,
  sidebarElement,
  toolbarElement,
  toolbarLineAllElements,
} from '../elements.js'
import { restoreTextareaFocus } from '../textarea/onTextareaFocus.ts'
import { closeSidebar, getSidebarNameFromThemeId, openSidebar, openSidebar$ } from './sidebar.ts'

export type ToolbarName = 'data' | 'font' | 'layout' | 'background' | 'about'

export function openToolbar(toolbarSection: ToolbarName) {
  const sectionId = `toolbar-line-${toolbarSection}`
  const section = $id(sectionId)

  for (const element of toolbarLineAllElements) {
    if (element.getAttribute('id') === sectionId) continue
    element.toggleAttribute('data-open', false)
  }

  const allToolbarButtons = $class('expand-toolbar-button')
  const currentToolbarButton = document.querySelector(`[data-toolbar="${toolbarSection}"]`)

  for (const element of allToolbarButtons) {
    element.classList.remove('is-current')
  }

  currentToolbarButton?.classList.add('is-current')

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
      openSidebar(getSidebarNameFromThemeId(themeId))
    } else {
      closeSidebar()
    }

    section.toggleAttribute('data-open', true)
  }
}

export function closeToolbar() {
  const allToolbarButtons = $class('expand-toolbar-button')

  for (const element of allToolbarButtons) {
    element.classList.remove('is-current')
  }

  for (const element of toolbarLineAllElements) {
    element.toggleAttribute('data-open', false)
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

openSidebar$.onChange((sidebarName) => {
  for (const element of openSidebarElements) {
    const isOpen = sidebarName !== null
    const isCurrent = element.dataset.sidebar === sidebarName

    element.classList.toggle('is-current', isOpen && isCurrent)
  }
})
