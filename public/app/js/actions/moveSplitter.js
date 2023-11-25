import { isHTMLElement, leftBoxElement, rightBoxElement } from '../elements.js'
import { clamp } from '../lib/math/clamp.js'

export function moveSplitter(position) {
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

  localStorage.setItem('awe.splitter', clampedPosition)
}

function getBoxWidth(position) {
  const dockedWidth = '400px'
  const fullWidthMinusDockedWidth = `calc(100% - ${dockedWidth})`

  if (position === 0) {
    return ['50%', '50%']
  }

  if (Math.abs(position) === 1) {
    return position < 0
      ? [fullWidthMinusDockedWidth, dockedWidth]
      : [dockedWidth, fullWidthMinusDockedWidth]
  }

  if (Math.abs(position) === 2) {
    return position < 0 ? [null, '0'] : ['0', null]
  }
}
