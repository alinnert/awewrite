import { sidebarContentElements, sidebarElement } from '../elements.js'

export function closeSidebar() {
  sidebarElement.style.width = '0'
  sidebarElement.style.borderRightWidth = '0px'

  for (const item of sidebarContentElements) {
    if (!(item instanceof HTMLElement)) continue
    item.style.display = 'none'
  }
}
