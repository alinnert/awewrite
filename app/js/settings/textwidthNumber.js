export function textwidthNumber(textwidth) {
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