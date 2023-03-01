import { closeToolbar } from '../ui/closeToolbar.js'
import { setFocusedTextareaId } from './onTextareaFocus.js'

export function onTextareaBoxElementsClick() {
  setFocusedTextareaId()
  closeToolbar()
}
