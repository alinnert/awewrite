export function openSidebar(sidebarName) {
  const sidebarId = `sidebar_${sidebarName}`
  const $sidebar = $(`#${sidebarId}`)

  if ($sidebar.is(':hidden')) {
    document.getElementById('sidebar').style.width = '300px'
    document.getElementById('sidebar').style.borderRightWidth = '1px'

    $('.sidebar_content').hide()
    $sidebar.show('fade', 300)
  }
}
