import { mutableValue } from '@alinnert/reactive'
import {
  $id,
  hideElement,
  showElement,
  sidebarContentElements,
  sidebarElement,
} from '../elements.js'

export const openSidebar$ = mutableValue<string | null>(null)

export function openSidebar(sidebarName: string | null) {
  if (sidebarName === null) return

  const sidebarByIdElement = $id(`sidebar-${sidebarName}`)

  sidebarElement.classList.add('is-open')

  for (const element of sidebarContentElements) {
    hideElement(element)
  }

  showElement(sidebarByIdElement)

  openSidebar$.set(sidebarName)
}

export function closeSidebar() {
  sidebarElement.classList.remove('is-open')

  for (const item of sidebarContentElements) {
    if (!(item instanceof HTMLElement)) continue
    // item.style.display = 'none'
  }

  openSidebar$.set(null)
}

export function getSidebarNameFromThemeId(themeId: string | null): string | null {
  if (themeId === null) {
    return null
  }

  const sidebarContentElement = $id(themeId).closest('.sidebar-content')
  if (sidebarContentElement === null) {
    return null
  }

  const sidebarContentId = sidebarContentElement.getAttribute('id')
  if (sidebarContentId === null) {
    return null
  }

  return sidebarContentId.replace(/^sidebar-/, '')
}
