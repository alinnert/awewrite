import {
  isHTMLElement,
  leftBoxElement,
  rightBoxElement,
  textBoxLayoutElements,
} from '../elements.ts'
import { clamp } from '../lib/math/clamp.ts'

export function moveSplitter(position: number) {
  if (!isHTMLElement(leftBoxElement)) return
  if (!isHTMLElement(rightBoxElement)) return

  const minValue = -2
  const maxValue = 2
  const clampedPosition = clamp(position, minValue, maxValue)

  leftBoxElement.classList.toggle('textarea-box--is-minimized', clampedPosition === minValue)
  rightBoxElement.classList.toggle('textarea-box--is-minimized', clampedPosition === maxValue)

  const [left, right] = getBoxWidth(clampedPosition)

  if (left !== null) {
    leftBoxElement.style.right = left
  }
  if (right !== null) {
    rightBoxElement.style.left = right
  }

  localStorage.setItem('awe.splitter', clampedPosition.toString())

  for (const button of textBoxLayoutElements) {
    const buttonValue = button.dataset.value
    button.classList.toggle('is-current', buttonValue === position.toString())
  }
}

function getBoxWidth(position: number): [left: string | null, right: string | null] {
  const dockedWidth = '400px'
  const fullWidthMinusDockedWidth = `calc(100% - ${dockedWidth})`

  if (Math.abs(position) === 1) {
    return position < 0
      ? [fullWidthMinusDockedWidth, dockedWidth]
      : [dockedWidth, fullWidthMinusDockedWidth]
  }

  if (Math.abs(position) === 2) {
    return position < 0 ? [null, '0'] : ['0', null]
  }

  return ['50%', '50%']
}
