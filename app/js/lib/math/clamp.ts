export function clamp(value: number, x: number, y: number): number {
  if (x === y) {
    return x
  }

  const lower = Math.min(x, y)
  const higher = Math.max(x, y)

  return Math.max(Math.min(value, higher), lower)
}
