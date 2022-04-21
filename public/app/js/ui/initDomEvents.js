import { clearTexts, setSpellcheck, switchTexts } from '../actions/data.js'
import { changeFontface, changeFontsize } from '../actions/font.js'
import { changeTextWidth, moveSplitter } from '../actions/layout.js'
import { onTextareaInput } from '../textarea/onTextareaInput.js'
import { changeTheme } from '../themes/changeTheme.js'
import { expandToolbar } from './expandToolbar.js'
import { openSidebar } from './openSidebar.js'
import { shrinkToolbar } from './shrinkToolbar.js'

export function initDomEvents() {
  $('textarea').on({ click: shrinkToolbar, input: onTextareaInput })
  $('.expand-toolbar-button').on({
    click() {
      expandToolbar(this.dataset.toolbar)
    },
  })

  $('.switch-texts-button').on({ click: switchTexts })

  $('.clear-texts-button').on({ click: clearTexts })

  $('#spellcheck').on({
    change() {
      setSpellcheck()
    },
  })

  $('.change-fontface-button').on({
    click() {
      changeFontface(this.dataset.fontface)
    },
  })

  $('#toolbar_fontsize_dec').on({
    click() {
      const currentFontsize = parseInt(
        document.getElementById('toolbar_fontsize').innerHTML,
      )
      changeFontsize(currentFontsize - 1)
    },
  })
  $('#toolbar_fontsize_inc').on({
    click() {
      const currentFontsize = parseInt(
        document.getElementById('toolbar_fontsize').innerHTML,
      )
      changeFontsize(currentFontsize + 1)
    },
  })

  $('#toolbar_splitter_left').on({
    click() {
      moveSplitter(parseInt(localStorage.getItem('awe.splitter')) - 1)
    },
  })
  $('#toolbar_splitter_right').on({
    click() {
      moveSplitter(parseInt(localStorage.getItem('awe.splitter')) + 1)
    },
  })
  $('#toolbar_splitter_reset').on({
    click() {
      moveSplitter(0)
    },
  })

  $('.change-text-width-button').on({
    click() {
      changeTextWidth(this.dataset.textWidth)
    },
  })

  $('.open-sidebar-button').on({
    click() {
      openSidebar(this.dataset.sidebar)
    },
  })

  $('.sidebar_icon').on({
    click() {
      console.log('click')
      changeTheme(this.getAttribute('id'), this.hasAttribute('data-dark'))
    },
  })
}
