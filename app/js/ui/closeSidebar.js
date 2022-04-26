export function closeSidebar() {
  document.getElementById('sidebar').style.width = '0'
  document.getElementById('sidebar').style.borderRightWidth = '0px'

  const sidebarContent = document.getElementsByClassName('sidebar_content')

  for (const item of sidebarContent) {
    if (!(item instanceof HTMLElement)) continue
    item.style.display = 'none'
  }
}
