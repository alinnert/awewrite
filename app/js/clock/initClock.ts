import { refreshClock } from './refreshClock'

export function initClock(): void {
  refreshClock()
  setInterval(refreshClock, 5000)
}
