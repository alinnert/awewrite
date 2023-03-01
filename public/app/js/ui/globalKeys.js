import { closeToolbar } from './closeToolbar.js'

/** @param { KeyboardEvent } e */
export function globalKeys(e) {
  if (e.key === 'Escape') {
    closeToolbar()
  }
}
