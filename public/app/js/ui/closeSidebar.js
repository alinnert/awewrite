export function closeSidebar() {
  document.getElementById('sidebar').style.width = '0'
  document.getElementById('sidebar').style.borderRightWidth = '0px'

  $('.sidebar_content').hide('fade', 300)
}
