import './js/external/jquery-1.10.0.min.js'
import './js/external/jquery-ui-1.8.9.custom.min.js'
import { initApplication } from './js/index.js'

globalThis.addEventListener('load', () => {
  initApplication()
})
