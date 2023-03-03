import { closeToolbar } from '../ui/closeToolbar.js'

/** @param { MouseEvent } event */
export function onTextareaClick(event) {
  event.stopPropagation()
  closeToolbar()
}
