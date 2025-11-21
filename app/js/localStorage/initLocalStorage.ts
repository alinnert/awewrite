export const storageKey = {
  save: 'awe.save',
  fontFace: 'awe.fontface',
  fontSize: 'awe.fontsize',
  lineHeight: 'awe.lineheight',
  editorLayout: 'awe.splitter',
  textWidth: 'awe.textwidth',
  lightThemeId: 'awe.themeid.light',
  darkThemeId: 'awe.themeid.dark',
  spellcheck: 'awe.spellcheck',
  getTextKey(editor: string): string {
    return `awe.text.${editor}`
  },
  leftText: 'awe.text.left',
  rightText: 'awe.text.right',
}

export function cleanLocalStorage() {
  localStorage.removeItem('awe.darkTheme')
  localStorage.removeItem('awe.save')
}
