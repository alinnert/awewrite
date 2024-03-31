import { closeToolbar } from '../ui/toolbar.js'
import { setFocusedTextareaId } from './onTextareaFocus.js'

export function onTextareaBoxElementsClick() {
  setFocusedTextareaId()
  closeToolbar()
}
