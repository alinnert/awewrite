export function clamp(value, x, y) {
  if (x === y) {
    return x
  }

  const lower = Math.min(x, y)
  const higher = Math.max(x, y)

  return Math.max(Math.min(value, higher), lower)
}
