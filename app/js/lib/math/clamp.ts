export function clamp(value: number, minValue: number, maxValue: number): number {
  if (minValue === maxValue) {
    return minValue
  }

  const lower = Math.min(minValue, maxValue)
  const higher = Math.max(minValue, maxValue)

  return Math.max(Math.min(value, higher), lower)
}
