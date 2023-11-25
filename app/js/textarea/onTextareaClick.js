import { closeToolbar } from '../ui/toolbar.js'

/** @param { MouseEvent } event */
export function onTextareaClick(event) {
  event.stopPropagation()
  closeToolbar()
}
