import { refreshClock } from './clock/refreshClock.js'
import { createValue } from './lib/dataStore.js'
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
}

const counter$ = createValue(0)

counter$.onChange((value) => {
  console.log(value)
})

counter$.set(10)