export const fontFamilyValue = {
  ibmPlexSans: '"IBM Plex Sans", sans-serif',
  ibmPlexSerif: '"IBM Plex Serif", serif',
  ibmPlexMono: '"IBM Plex Mono", monospace',
  duo: '"Duo", monospace',
  quattro: '"Quattro", monospace',
  kalam: '"Kalam", cursive',
  openDyslexic: '"OpenDyslexic", cursive',
}

export function getRealLineHeight(height: number): string {
  return (height / 10 + 1).toFixed(1).toString()
}

export function parseLineheight(lineHeight: string): number {
  const lineHeightValue = Number.parseFloat(lineHeight)
  return lineHeightValue * 10 - 10
}
