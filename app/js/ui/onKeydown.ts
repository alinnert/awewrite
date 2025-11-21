import { updateFontsize } from '../actions/changeFontSize.ts'
import { updateLineHeight } from '../actions/changeLineHeight.ts'
import { defineKeyboardShortcut } from '../lib/events/defineKeyboardShortcut.ts'
import { closeToolbar } from './toolbar.ts'

export function onKeydown(event: KeyboardEvent) {
  defineKeyboardShortcut(event, { key: 'Escape' }, () => {
    closeToolbar()
  })

  defineKeyboardShortcut(event, { key: '+', alt: true }, () => {
    console.log('inc')
    event.preventDefault()
    updateFontsize(1)
  })

  defineKeyboardShortcut(event, { key: '-', alt: true }, () => {
    event.preventDefault()
    updateFontsize(-1)
  })

  defineKeyboardShortcut(event, { key: '*', alt: true, shift: true }, () => {
    event.preventDefault()
    updateLineHeight(0.1)
  })

  defineKeyboardShortcut(event, { key: '_', alt: true, shift: true }, () => {
    event.preventDefault()
    updateLineHeight(-0.1)
  })
}
