export function fontfaceNumber(font) {
  switch (font) {
    case '"IBM Plex Sans", sans-serif':
      return 0
    case '"IBM Plex Serif", serif':
      return 1
    case '"IBM Plex Mono", sans-serif':
      return 2
    case '"Kalam", cursive':
      return 3
    default:
      return -1
  }
}
