import { $id } from '../elements.ts'

export let focusedTextareaId: string | null = null

export function onTextareaFocus(e: FocusEvent) {
  const target = e.currentTarget
  if (!(target instanceof HTMLTextAreaElement)) return

  setFocusedTextareaId(target.getAttribute('id'))
}

export function restoreTextareaFocus() {
  if (focusedTextareaId === null) return
  $id(focusedTextareaId).focus()
}

export function setFocusedTextareaId(id: string | null = null) {
  if (focusedTextareaId === id) return
  focusedTextareaId = id
}
