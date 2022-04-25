export function supportTab(e) {
  if (e.keyCode === 9) {
    const { selectionStart, selectionEnd } = this
    const start = this.value.substring(0, selectionStart)
    const end = this.value.substring(selectionEnd)

    this.value = `${start}\t${end}`
    this.selectionStart = this.selectionEnd = start + 1

    return false
  }
}
