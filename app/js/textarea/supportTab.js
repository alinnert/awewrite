export function supportTab(e) {
  if (e.keyCode === 9) {
    const start = this.selectionStart
    const end = this.selectionEnd
    const $this = $(this)
    $this.val(
      $this.val().substring(0, start) + '\t' + $this.val().substring(end),
    )
    this.selectionStart = this.selectionEnd = start + 1
    return false
  }
}