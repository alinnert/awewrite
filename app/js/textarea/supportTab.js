/** @param { KeyboardEvent } event */
export function supportTab(event) {
  const target = event.currentTarget
  if (!(target instanceof HTMLTextAreaElement)) return

  if (event.keyCode === 9) {
    const start = target.value.substring(0, target.selectionStart)
    const end = target.value.substring(target.selectionEnd)

    this.value = `${start}\t${end}`
    this.selectionStart = this.selectionEnd = start + 1

    return false
  }
}
