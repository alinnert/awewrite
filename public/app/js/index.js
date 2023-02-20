import { refreshClock } from './clock/refreshClock.js'
import { initializeLocalStorage } from './localStorage/initializeLocalStorage.js'
import { loadSettings } from './settings/loadSettings.js'
import { initDomEvents } from './ui/initDomEvents.js'
import { updateWordCounter } from './word-counter/updateWordCounter.js'

export function initApplication() {
  refreshClock()
  initDomEvents()
  initializeLocalStorage()
  loadSettings()
  setInterval(refreshClock, 5000)
  updateWordCounter()
}
