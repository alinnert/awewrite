export function saveTexts() {
  localStorage.setItem(
    'awe.text.left',
    document.getElementById('leftTextarea').value,
  )
  localStorage.setItem(
    'awe.text.right',
    document.getElementById('rightTextarea').value,
  )
}