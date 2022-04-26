import { closeSidebar } from './closeSidebar.js'
import { closeToolbar } from './closeToolbar.js'

export function openToolbar(toolbarSection) {
  const sectionId = `toolbar_line_${toolbarSection}`
  const section = document.getElementById(sectionId)

  const allToolbarLines = Array.from(
    document.getElementsByClassName('toolbar_line_all'),
  )

  for (const element of allToolbarLines) {
    if (element.getAttribute('id') === sectionId) continue
    element.removeAttribute('data-open')
  }
  
  if (section.hasAttribute('data-open')) {
    closeToolbar()
  } else {
    document.getElementById('toolbar').style.height = '80px'
    document.getElementById('sidebar').style.top = '80px'

    for (const line of allToolbarLines) {
      if (!(line instanceof HTMLElement)) continue
      line.style.display = 'none'
    }
    
    section.style.display = null
    closeSidebar()
    section.setAttribute('data-open', '')
  }
}
