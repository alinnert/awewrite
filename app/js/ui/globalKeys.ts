import { closeToolbar } from './toolbar.ts'

export function globalKeys(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    closeToolbar()
  }
}
