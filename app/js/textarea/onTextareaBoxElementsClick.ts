import { closeToolbar } from '../ui/toolbar.ts'
import { setFocusedTextareaId } from './onTextareaFocus.ts'

export function onTextareaBoxElementsClick() {
  setFocusedTextareaId()
  closeToolbar()
}
