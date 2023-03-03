import { hideElement, sidebarContentElements } from '../elements.js'

export function initElements() {
  for (const element of sidebarContentElements) {
    hideElement(element)
  }
}
