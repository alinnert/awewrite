import { sidebarThemeGroupElements } from '../elements'
import themeData from '../themes/data.json'
import { createThemeSection } from './createThemeSection'

type GroupName = keyof typeof themeData
export type ThemeSection = (typeof themeData)[GroupName]['sections'][number]

export const flatThemeList = Object.fromEntries(
  Object.entries(themeData).flatMap(([groupName, group]) => {
    return group.sections.flatMap((section) => {
      return section.themes.map((theme) => [theme.id, { groupName, theme }])
    })
  })
)

function isValidGroupName(groupName: string): groupName is GroupName {
  return Object.keys(themeData).includes(groupName)
}

export function initThemeElements(): void {
  for (const target of sidebarThemeGroupElements) {
    const groupName = target.dataset.themeGroup
    if (groupName === undefined) return
    if (!isValidGroupName(groupName)) return

    const groupData = themeData[groupName]

    const titleElement = document.createElement('h1')
    titleElement.innerText = groupData.title
    target.insertAdjacentElement('afterbegin', titleElement)

    groupData.sections
      .flatMap(createThemeSection)
      .forEach((s) => target.insertAdjacentElement('beforeend', s))
  }
}
