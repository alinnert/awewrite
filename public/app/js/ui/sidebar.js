import {
  $id,
  elementIsHidden,
  hideElement,
  showElement,
  sidebarContentElements,
  sidebarElement,
} from '../elements.js'

export const sidebarEvents = new EventTarget()

export function openSidebar(sidebarName) {
  const sidebarByIdElement = $id(`sidebar-${sidebarName}`)

  if (elementIsHidden(sidebarByIdElement)) {
    sidebarElement.style.width = '400px'
    sidebarElement.style.borderRightWidth = '1px'

    for (const element of sidebarContentElements) {
      hideElement(element)
    }

    showElement(sidebarByIdElement)

    sidebarEvents.dispatchEvent(new CustomEvent('opensidebar', { detail: { sidebarName } }))
  }
}

export function closeSidebar() {
  sidebarElement.style.width = '0'
  sidebarElement.style.borderRightWidth = '0px'

  for (const item of sidebarContentElements) {
    if (!(item instanceof HTMLElement)) continue
    item.style.display = 'none'
  }

  sidebarEvents.dispatchEvent(new CustomEvent('closesidebar'))
}
