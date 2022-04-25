import { elementIsHidden, hideElement, showElement, sidebarContentElements } from '../elements.js'

export function openSidebar(sidebarName) {
  const sidebarId = `sidebar_${sidebarName}`
  const sidebarElement = document.getElementById(sidebarId)

  if (elementIsHidden(sidebarElement)) {
    document.getElementById('sidebar').style.width = '300px'
    document.getElementById('sidebar').style.borderRightWidth = '1px'

    for (const element of sidebarContentElements) {
      hideElement(element)
    }

    showElement(sidebarElement)
  }
}
