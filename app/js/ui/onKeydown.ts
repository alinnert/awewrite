import { updateFontsize } from '../actions/changeFontsize.ts'
import { updateLineheight } from '../actions/changeLineheight.ts'
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
    updateLineheight(1)
  })

  defineKeyboardShortcut(event, { key: '_', alt: true, shift: true }, () => {
    event.preventDefault()
    updateLineheight(-1)
  })
}
