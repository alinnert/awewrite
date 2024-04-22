import { TextWidth } from '../actions/changeTextWidth'

export function textwidthNumber(textwidth: TextWidth) {
  switch (textwidth) {
    default:
    case 'narrow':
      return 0
    case 'medium':
      return 1
    case 'wide':
      return 2
    case 'full':
      return 3
  }
}
