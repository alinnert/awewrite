import { clockElement } from '../elements.js'

export function refreshClock() {
  const now = new Date()
  const hours = now.getHours().toString()
  const minutes = now.getMinutes().toString()
  const time = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`

  clockElement.innerHTML = time
}
