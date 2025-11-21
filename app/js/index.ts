import { initClock } from './clock/initClock.ts'
import './components/FontItem.ts'
import './components/NumericSetting.ts'
import './components/SettingsMenu.ts'
import './components/TextEditor.ts'
import './components/ThemeItem.ts'
// import './components/WordCounter.ts'
import { cleanLocalStorage } from './localStorage/initLocalStorage.ts'
import { initThemeElements } from './themes/initThemeElements.ts'
import { initDomEvents } from './ui/initDomEvents.ts'
import { initElements } from './ui/initElements.ts'

initThemeElements()
initElements()
initDomEvents()
cleanLocalStorage()
initClock()
