export const textareaElements = document.getElementsByTagName('textarea')

export const sidebarContentElements =
  /** @type { HTMLCollectionOf<HTMLElement> } */ (
    document.getElementsByClassName('sidebar_content')
  )

export const leftBoxElement = document.getElementById('leftBox')
export const rightBoxElement = document.getElementById('rightBox')
export const metaThemeColorElement = document.getElementById('meta-theme-color')

/**
 * @param { HTMLElement } element
 */
export function showElement(element) {
  element.style.display = null
}

/**
 * @param { HTMLElement } element
 */
export function hideElement(element) {
  element.style.display = 'none'
}

/**
 * @param { HTMLElement } element
 * @returns { boolean }
 */
export function elementIsHidden(element) {
  return element.style.display === 'none'
}
