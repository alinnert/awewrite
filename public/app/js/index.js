import { refreshClock } from './clock/refreshClock.js'
import { initializeLocalStorage } from './localStorage/initializeLocalStorage.js'
import { loadSettings } from './settings/loadSettings.js'
import { initDomEvents } from './ui/initDomEvents.js'
import { initElements } from './ui/initElements.js'
import './components/theme-item.js'
import './components/word-counter.js'
import './components/settings-menu.js'
import './components/numeric-setting.js'

refreshClock()
initElements()
initDomEvents()
initializeLocalStorage()
loadSettings()
setInterval(refreshClock, 5000)
