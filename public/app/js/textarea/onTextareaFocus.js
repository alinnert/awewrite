import { $id } from '../elements.js'

/** @type { string | null } */
export let focusedTextareaId = null

/** @param { FocusEvent } e */
export function onTextareaFocus(e) {
  const target = e.currentTarget
  if (!(target instanceof HTMLTextAreaElement)) return

  setFocusedTextareaId(target.getAttribute('id'))
}

export function restoreTextareaFocus() {
  if (focusedTextareaId === null) return
  $id(focusedTextareaId).focus()
}

/** @param { string | null } id */
export function setFocusedTextareaId(id = null) {
  if (focusedTextareaId === id) return
  focusedTextareaId = id
}
