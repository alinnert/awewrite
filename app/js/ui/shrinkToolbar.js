import { closeSidebar } from './closeSidebar.js'

export function shrinkToolbar() {
  document.getElementById('toolbar').style.height = '40px'
  document.getElementById('sidebar').style.top = '40px'
  $('.toolbar_line_all').hide()
  closeSidebar()
}
