import { refreshClock } from './clock/refreshClock.js'
import { initializeLocalStorage } from './localStorage/initializeLocalStorage.js'
import { loadSettings } from './settings/loadSettings.js'
import { supportTab } from './textarea/supportTab.js'
import { globalKeys } from './ui/globalKeys.js'
import { initDomEvents } from './ui/initDomEvents.js'
import { updateWordCounter } from './word-counter/updateWordCounter.js'

export function initApplication() {
  initDomEvents()
  initializeLocalStorage()
  loadSettings()
  refreshClock()
  setInterval(refreshClock, 5000)
  updateWordCounter()

  document.getRootNode().addEventListener('keydown', globalKeys)

  document
    .getElementById('leftTextarea')
    .addEventListener('keydown', supportTab)

  document
    .getElementById('rightTextarea')
    .addEventListener('keydown', supportTab)

  if (location.protocol === 'http:' && location.port === '80') {
    const modalElement = document.getElementById('http-info-dialog')
    // @ts-ignore
    if (modalElement instanceof HTMLDialogElement) {
      // @ts-ignore
      modalElement.showModal()
    }
  }
}
