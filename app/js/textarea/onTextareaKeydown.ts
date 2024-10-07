import { leftTextareaElement, rightTextareaElement } from '../elements.ts'
import { defineKeyboardShortcut } from '../lib/events/defineKeyboardShortcut.ts'
import { onTextareaInput } from './onTextareaInput.ts'

export function onTextareaKeydown(event: KeyboardEvent) {
  defineKeyboardShortcut(event, { key: 'Tab' }, () => {
    const target = event.currentTarget
    if (!(target instanceof HTMLTextAreaElement)) return

    event.preventDefault()

    const start = target.value.substring(0, target.selectionStart)
    const end = target.value.substring(target.selectionEnd)

    target.value = `${start}\t${end}`
    target.selectionStart = target.selectionEnd = start.length + 1

    const area = target.dataset.area
    if (area !== 'left' && area !== 'right') return
    onTextareaInput(area)
  })

  defineKeyboardShortcut(event, { key: 'Tab', shift: true }, () => {
    event.preventDefault()

    if (document.activeElement === leftTextareaElement) {
      rightTextareaElement.focus()
      return
    }

    if (document.activeElement === rightTextareaElement) {
      leftTextareaElement.focus()
      return
    }
  })
}
