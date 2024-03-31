import { onTextareaInput } from './onTextareaInput.js'

/** @param { KeyboardEvent } event */
export function supportTab(event) {
  const target = event.currentTarget
  if (!(target instanceof HTMLTextAreaElement)) return

  if (event.key === 'Tab') {
    event.preventDefault()

    const start = target.value.substring(0, target.selectionStart)
    const end = target.value.substring(target.selectionEnd)

    target.value = `${start}\t${end}`
    target.selectionStart = target.selectionEnd = start.length + 1

    const area = target.dataset.area
    if (area !== 'left' && area !== 'right') return
    onTextareaInput(area)
  }
}
