// #region selector functions
/**
 * @param { string } className
 * @returns { HTMLCollectionOf<Element> }
 */
export const $class = (className) => document.getElementsByClassName(className)

/**
 * @param { string } id
 * @returns { HTMLElement | null }
 */
export const $id = (id) => document.getElementById(id)

/**
 * @param { string } name
 * @returns { NodeListOf<HTMLElement> }
 */
export const $name = (name) => document.getElementsByName(name)
// #endregion selector functions

// #region selected elements
export const textareaElements = document.getElementsByTagName('textarea')

export const sidebarContentElements = $class('sidebar-content')
export const expandToolbarButtonElements = $class('expand-toolbar-button')
export const toolbarLineAllElements = $class('toolbar-line-all')
export const textareaBoxElements = $class('textarea-box')

export const fontFaceElement = $name('fontface')
export const textWidthElement = $name('textwidth')

export const clockElement = /** @type { HTMLSpanElement } */ ($id('clock'))
export const wordCounterElement =
  /** @type { HTMLSpanElement } */
  ($id('word-counter'))
export const toolbarElement = /** @type { HTMLDivElement } */ ($id('toolbar'))
export const sidebarElement = /** @type { HTMLDivElement } */ ($id('sidebar'))
export const leftBoxElement = /** @type { HTMLDivElement } */ ($id('left-box'))
export const rightBoxElement = /** @type { HTMLDivElement } */ ($id('right-box'))
export const leftTextareaElement =
  /** @type { HTMLTextAreaElement } */
  ($id('left-textarea'))
export const rightTextareaElement =
  /** @type { HTMLTextAreaElement } */
  ($id('right-textarea'))
export const metaThemeColorElement =
  /** @type { HTMLMetaElement } */
  ($id('meta-theme-color'))
export const spellcheckElement =
  /** @type { HTMLInputElement } */
  ($id('spellcheck'))
export const fontSizeElement =
  /** @type { HTMLSpanElement } */
  ($id('toolbar-fontsize'))
export const lineHeightElement =
  /** @type { HTMLSpanElement } */
  ($id('toolbar-lineheight'))
// #endregion selected elements

// #region helper functions
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
 * @param { Node | Node[] | HTMLCollectionOf<Element> } elements
 * @param { T } eventName
 * @param { (event: HTMLElementEventMap[T]) => void } handler
 */
export function addEvent(elements, eventName, handler) {
  const elementList = elements instanceof Node ? [elements] : elements
  for (const element of elementList) {
    element.addEventListener(eventName, handler)
  }
}
// #endregion helper functions
