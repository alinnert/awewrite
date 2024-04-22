import { WordCounter } from './components/WordCounter'

// #region selector functions
export function $id(id: string): HTMLElement
export function $id(id: string, { errorOnNotFound }: { errorOnNotFound: true }): HTMLElement
export function $id(id: string, { errorOnNotFound }: { errorOnNotFound: false }): HTMLElement | null
export function $id(
  id: string,
  { errorOnNotFound }: { errorOnNotFound: boolean } = { errorOnNotFound: true }
): HTMLElement | null {
  const element = document.getElementById(id)

  if (!(element instanceof HTMLElement) && errorOnNotFound) {
    throw new Error(`Element with id "${id}" not found`)
  }

  return element
}

export function $class(className: string): HTMLElement[] {
  const result: HTMLElement[] = []
  for (const element of document.getElementsByClassName(className)) {
    if (!(element instanceof HTMLElement)) continue
    result.push(element)
  }
  return result
}
// #endregion selector functions

// #region selected elements
// head
export const metaThemeColorElement = $id('meta-theme-color')

// app frame
export const clockElement = $id('clock')
export const toolbarElement = $id('toolbar')

// settings
export const expandToolbarButtonElements = $class('expand-toolbar-button')
export const openSidebarElements = $class('open-sidebar-button')
export const toolbarLineAllElements = $class('toolbar-bottom-content')
export const sidebarContentElements = $class('sidebar-content')
export const spellcheckElement = $id('spellcheck') as HTMLInputElement
export const fontfaceElements = $class('change-fontface-button')
export const fontSizeElement = $id('toolbar-fontsize')
export const lineHeightElement = $id('toolbar-lineheight')
export const textBoxLayoutElements = $class('change-textbox-layout-button')
export const textWidthElements = $class('change-text-width-button')
export const sidebarElement = $id('sidebar')

// editors
export const textareaElements = document.getElementsByTagName('textarea')
export const textareaBoxElements = $class('textarea-box')
export const boxAreaElement = $id('editors')
export const wordCounterElements = $class('word-counter') as WordCounter[]

export const leftBoxElement = $id('left-box')
export const leftTextareaElement = $id('left-textarea') as HTMLTextAreaElement
export const leftWordCounterElement = $id('left-word-counter') as WordCounter

export const rightBoxElement = $id('right-box')
export const rightTextareaElement = $id('right-textarea') as HTMLTextAreaElement
export const rightWordCounterElement = $id('right-word-counter') as WordCounter
// #endregion selected elements

// #region helper functions
export function isHTMLElement(element: EventTarget): element is HTMLElement {
  return element instanceof HTMLElement
}

export function showElement(element: Element) {
  if (!isHTMLElement(element)) return
  element.style.display = ''
}

export function hideElement(element: Element) {
  if (!isHTMLElement(element)) return
  element.style.display = 'none'
}

export function elementIsHidden(element: HTMLElement): boolean {
  return element.style.display === 'none'
}

export function addEvent<T extends keyof HTMLElementEventMap>(
  elements: HTMLElement | Node | Node[] | HTMLCollectionOf<Element> | null | undefined,
  eventName: T,
  handler: (event: HTMLElementEventMap[T]) => void
) {
  if (elements === null || elements === undefined) return

  const elementList = elements instanceof Node ? [elements] : elements

  for (const element of elementList) {
    if (!(element instanceof HTMLElement)) continue
    element.addEventListener(eventName, handler)
  }
}
// #endregion helper functions
