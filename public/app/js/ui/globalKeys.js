import { closeToolbar } from './closeToolbar.js'

export function globalKeys(e) {
  if (e.keyCode === 27) {
    closeToolbar()
  }
}
