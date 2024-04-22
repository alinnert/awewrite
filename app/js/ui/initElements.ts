import { hideElement, sidebarContentElements } from '../elements.ts'

export function initElements() {
  for (const element of sidebarContentElements) {
    hideElement(element)
  }
}
