export function textwidthNumber(textwidth) {
  switch (textwidth) {
    case 'narrow':
      return 0
    case 'wide':
      return 1
    case 'full':
      return 2
    default:
      return -1
  }
}