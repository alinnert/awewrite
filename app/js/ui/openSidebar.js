import {
  $id,
  elementIsHidden,
  hideElement,
  showElement,
  sidebarContentElements,
  sidebarElement,
} from '../elements.js'

export function openSidebar(sidebarName) {
  const sidebarId = `sidebar_${sidebarName}`
  const sidebarByIdElement = $id(sidebarId)

  if (elementIsHidden(sidebarByIdElement)) {
    sidebarElement.style.width = '260px'
    sidebarElement.style.borderRightWidth = '1px'

    for (const element of sidebarContentElements) {
      hideElement(element)
    }

    showElement(sidebarByIdElement)
  }
}
