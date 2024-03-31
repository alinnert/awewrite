import { closeToolbar } from '../ui/toolbar.ts'

export function onTextareaClick(event: MouseEvent) {
  event.stopPropagation()
  closeToolbar()
}
