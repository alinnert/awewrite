export function getRealLineHeight(height: number): string {
  return (height / 10 + 1).toFixed(1).toString()
}

export function parseLineheight(lineHeight: string): number {
  const lineHeightValue = Number.parseFloat(lineHeight)
  return lineHeightValue * 10 - 10
}
