export function refreshClock() {
  const now = new Date()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  const time = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`

  document.getElementById('clock').innerHTML = time
}
