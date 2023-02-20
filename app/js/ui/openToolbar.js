import { $id, toolbarLineAllElements } from '../elements.js'
import { closeSidebar } from './closeSidebar.js'
import { closeToolbar } from './closeToolbar.js'

export function openToolbar(toolbarSection) {
  const sectionId = `toolbar_line_${toolbarSection}`
  const section = $id(sectionId)

  for (const element of toolbarLineAllElements) {
    if (element.getAttribute('id') === sectionId) continue
    element.removeAttribute('data-open')
  }

  if (section.hasAttribute('data-open')) {
    closeToolbar()
  } else {
    $id('toolbar').style.height = '80px'
    $id('sidebar').style.top = '80px'

    for (const line of toolbarLineAllElements) {
      if (!(line instanceof HTMLElement)) continue
      line.style.display = 'none'
    }

    section.style.display = null
    closeSidebar()
    section.setAttribute('data-open', '')
  }
}
