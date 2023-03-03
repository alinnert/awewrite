import {
  $id,
  elementIsHidden,
  hideElement,
  showElement,
  sidebarContentElements,
  sidebarElement,
} from '../elements.js'

export function openSidebar(sidebarName) {
  const sidebarByIdElement = $id(`sidebar_${sidebarName}`)

  if (elementIsHidden(sidebarByIdElement)) {
    sidebarElement.style.width = '260px'
    sidebarElement.style.borderRightWidth = '1px'

    for (const element of sidebarContentElements) {
      hideElement(element)
    }

    showElement(sidebarByIdElement)
  }
}
