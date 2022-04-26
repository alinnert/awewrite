// selector functions
/** @param { string } className @returns { HTMLCollectionOf<Element> } */
export const $class = (className) => document.getElementsByClassName(className)
/** @param { string } id @returns { Element | null } */
export const $id = (id) => document.getElementById(id)
/** @param { string } tagName @returns { HTMLCollectionOf<Element> } */
export const $tag = (tagName) => document.getElementsByTagName(tagName)

// by tag
export const textareaElements = $tag('textarea')

// by class
export const sidebarContentElements = $class('sidebar_content')
export const expandToolbarButtonElements = $class('expand-toolbar-button')

// by id
export const leftBoxElement = $id('leftBox')
export const rightBoxElement = $id('rightBox')
export const leftTextareaElement = $id('leftTextarea')
export const rightTextareaElement = $id('rightTextarea')
export const metaThemeColorElement = $id('meta-theme-color')

/** @param { EventTarget } element @returns { element is HTMLElement } */
export function isHTMLElement(element) {
  return element instanceof HTMLElement
}

/** @param { Element } element */
export function showElement(element) {
  if (!isHTMLElement(element)) return
  element.style.display = ''
}

/** @param { Element } element */
export function hideElement(element) {
  if (!isHTMLElement(element)) return
  element.style.display = 'none'
}

/** @param { HTMLElement } element @returns { boolean } */
export function elementIsHidden(element) {
  return element.style.display === 'none'
}

/**
 * @template { keyof HTMLElementEventMap } [T = keyof HTMLElementEventMap]
 * @param { Element | Element[] | HTMLCollectionOf<Element> } elements
 * @param { T } eventName
 * @param { (event: HTMLElementEventMap[T]) => void } handler
 */
export function addEvent(elements, eventName, handler) {
  for (const element of elements instanceof Element ? [elements] : elements) {
    element.addEventListener(eventName, handler)
  }
}
