import {
  $id,
  boxAreaElement,
  isHTMLElement,
  metaThemeColorElement,
  sidebarElement,
  textareaElements,
  toolbarElement,
} from '../elements.js'
import { getThemeImagePath } from '../lib/themes/getThemeImagePath.js'

export const themeEvents = new EventTarget()

/** @type {import('../components/theme-item.js').ThemeData} */
const fallbackThemeData = {
  displayName: 'Fallback Theme',
  id: 'fallback',
  isDarkTheme: true,
  textColor: 'white',
  backgroundColor: 'oklch(30% 0 none)',
}

export function changeThemeById(selectionId) {
  const selectedElement = $id(selectionId)

  const themeData =
    selectedElement !== null
      ? selectedElement.themeData
      : document.querySelector('[default-theme]')?.themeData ?? fallbackThemeData

  changeTheme(themeData)
}

/** @param {import('../components/theme-item.js').ThemeData} themeData */
export function changeTheme(themeData) {
  document.body.classList.toggle('has-background-image', themeData.backgroundImage !== undefined)
  document.body.classList.toggle('light-theme', !themeData.isDarkTheme)

  document.body.style.backgroundImage = getThemeImagePath(themeData.backgroundImage) ?? 'none'
  document.body.style.backgroundColor = themeData.backgroundColor ?? 'transparent'

  boxAreaElement.style.backgroundImage = `linear-gradient(to bottom, ${themeData.backgroundColor}, transparent 100px)`

  updateTextareas(themeData.textColor)
  updateTitleAndToolbar(themeData.backgroundColor)

  localStorage.setItem('awe.themeid', themeData.id)
  localStorage.setItem('awe.darkTheme', themeData.isDarkTheme ? 'true' : 'false')

  themeEvents.dispatchEvent(new CustomEvent('changetheme', { detail: themeData }))
}

/** @param { string } backgroundColor */
function updateTitleAndToolbar(backgroundColor) {
  metaThemeColorElement.setAttribute('content', backgroundColor)
  toolbarElement.style.backgroundColor = backgroundColor
  sidebarElement.style.backgroundColor = backgroundColor
}

/** @param { string } color */
function updateTextareas(color) {
  for (const textarea of textareaElements) {
    if (!isHTMLElement(textarea)) continue
    textarea.style.color = color
  }
}
