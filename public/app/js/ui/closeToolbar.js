import { closeSidebar } from './closeSidebar.js'

export function closeToolbar() {
  const allToolbarLines = Array.from(
    document.getElementsByClassName('toolbar_line_all'),
  )

  for (const element of allToolbarLines) {
    element.removeAttribute('data-open')
  }

  document.getElementById('toolbar').style.height = '40px'
  document.getElementById('sidebar').style.top = '40px'

  for (const line of allToolbarLines) {
    if (!(line instanceof HTMLElement)) continue
    line.style.display = 'none'
  }
  
  closeSidebar()
}
