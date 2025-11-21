import { currentTheme$ } from '../actions/changeTheme.ts'
import {
  $class,
  $id,
  openSidebarElements,
  showElement,
  toolbarElement,
  toolbarLineAllElements,
} from '../elements.js'
import { restoreTextareaFocus } from '../textarea/onTextareaFocus.ts'
import { flatThemeList } from '../themes/initThemeElements.ts'
import { closeSidebar, openSidebar, openSidebar$ } from './sidebar.ts'

export type ToolbarName = 'data' | 'font' | 'layout' | 'background' | 'about'

export function openToolbar(toolbarSection: ToolbarName) {
  const sectionId = `toolbar-${toolbarSection}`
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
    $id('toolbar').style.height = '80px'

    for (const line of toolbarLineAllElements) {
      if (!(line instanceof HTMLElement)) continue
      line.style.display = 'none'
    }

    showElement(section)

    if (toolbarSection === 'background') {
      const themeId = currentTheme$.value?.id ?? null
      openSidebar(`themes-${flatThemeList[themeId].groupName}`)
    } else if (toolbarSection === 'font') {
      openSidebar('fonts')
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
