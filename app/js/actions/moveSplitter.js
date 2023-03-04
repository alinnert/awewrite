import {
  hideElement,
  isHTMLElement,
  leftBoxElement,
  rightBoxElement,
  showElement,
} from '../elements.js'

export function moveSplitter(position) {
  if (!isHTMLElement(leftBoxElement)) return
  if (!isHTMLElement(rightBoxElement)) return

  if (position >= -3 && position <= 3) {
    let left

    switch (position) {
      case -3:
        left = 1
        break
      case -2:
        left = 20
        break
      case -1:
        left = 35
        break
      case 0:
        left = 50
        break
      case 1:
        left = 65
        break
      case 2:
        left = 80
        break
      case 3:
        left = 99
        break
    }

    const right = 100 - left

    showElement(leftBoxElement)
    showElement(rightBoxElement)

    if (right == 99) {
      hideElement(leftBoxElement)
    } else if (left == 99) {
      hideElement(rightBoxElement)
    }

    leftBoxElement.style.right = `${right}%`
    rightBoxElement.style.left = `${left}%`

    localStorage.setItem('awe.splitter', position)
  }
}
