import { refreshClock } from './clock/refreshClock.ts'
import { initializeLocalStorage } from './localStorage/initializeLocalStorage.ts'
import { loadSettings } from './settings/loadSettings.ts'
import { initDomEvents } from './ui/initDomEvents.ts'
import { initElements } from './ui/initElements.ts'
import './components/ThemeItem.ts'
import './components/WordCounter.ts'
import './components/SettingsMenu.ts'
import './components/NumericSetting.ts'

refreshClock()
initElements()
initDomEvents()
initializeLocalStorage()
loadSettings()
setInterval(refreshClock, 5000)
