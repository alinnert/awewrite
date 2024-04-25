import throttle from 'lodash.throttle'
import {
  leftTextareaElement,
  leftWordCounterElement,
  rightTextareaElement,
  rightWordCounterElement,
} from '../elements.ts'

const isLeftArea = (area?: 'left' | 'right') => area === 'left' || area === undefined
const isRightArea = (area?: 'left' | 'right') => area === 'right' || area === undefined

const throtteledSaveText = throttle(saveText, 1000, { leading: true, trailing: true })

export function onTextareaInput(area?: 'left' | 'right') {
  throtteledSaveText(area)

  if (isLeftArea(area)) {
    leftWordCounterElement.onTextareaInput()
  }

  if (isRightArea(area)) {
    rightWordCounterElement.onTextareaInput()
  }
}

function saveText(area?: 'left' | 'right') {
  if (isLeftArea(area) && leftTextareaElement instanceof HTMLTextAreaElement) {
    localStorage.setItem('awe.text.left', leftTextareaElement.value)
  }

  if (isRightArea(area) && rightTextareaElement instanceof HTMLTextAreaElement) {
    localStorage.setItem('awe.text.right', rightTextareaElement.value)
  }
}
