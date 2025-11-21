export type EditorId = 'left' | 'right' | 'all'

const isLeftArea = (area: EditorId) => area === 'left' || area === 'all'
const isRightArea = (area: EditorId) => area === 'right' || area === 'all'

export function onTextareaInput(area: EditorId) {
  if (isLeftArea(area)) {
    leftWordCounterElement.onTextareaInput()
  }

  if (isRightArea(area)) {
    rightWordCounterElement.onTextareaInput()
  }
}
