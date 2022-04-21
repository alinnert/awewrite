import { closeSidebar } from './closeSidebar.js'
import { shrinkToolbar } from './shrinkToolbar.js'

export function expandToolbar(toolbarSection) {
  const sectionId = `toolbar_line_${toolbarSection}`
  const $section = $(`#${sectionId}`)

  if ($section.is(':visible')) {
    shrinkToolbar()
  } else {
    document.getElementById('toolbar').style.height = '80px'
    document.getElementById('sidebar').style.top = '80px'

    $('.toolbar_line_all').hide()
    $section.show()
    closeSidebar()
  }
}