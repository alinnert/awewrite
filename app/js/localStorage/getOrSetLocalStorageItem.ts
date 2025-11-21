export function getOrSetLocalStorageItem(key: string, defaultValue: string): string {
  const value = localStorage.getItem(key)
  if (value === null) {
    localStorage.setItem(key, defaultValue)
  }
  return value ?? defaultValue
}