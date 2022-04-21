import { refreshClock } from './clock/refreshClock.js'
import { initializeLocalStorage } from './localStorage/initializeLocalStorage.js'
import { loadSettings } from './settings/loadSettings.js'
import { supportTab } from './textarea/supportTab.js'
import { globalKeys } from './ui/globalKeys.js'
import { initDomEvents } from './ui/initDomEvents.js'
import { initJQueryUi } from './ui/initJQueryUi.js'
import { updateWordCounter } from './word-counter/updateWordCounter.js'

export function initApplication() {
  initJQueryUi()
  initDomEvents()
  initializeLocalStorage()
  loadSettings()
  refreshClock()
  setInterval(refreshClock, 5000)
  updateWordCounter()
  $('html').on({ keydown: globalKeys })
  $('#leftTextarea, #rightTextarea').on({ keydown: supportTab })
}
