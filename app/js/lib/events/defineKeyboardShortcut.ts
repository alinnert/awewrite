type ShortcutDefinition = {
  key: string
  shift?: boolean
  control?: boolean
  alt?: boolean
  meta?: boolean
}

type ShortcutCallback = () => void

export function defineKeyboardShortcut(
  event: KeyboardEvent,
  definition: ShortcutDefinition,
  callback: ShortcutCallback
) {
  if (event.key !== definition.key) return
  if (event.shiftKey !== (definition.shift ?? false)) return
  if (event.ctrlKey !== (definition.control ?? false)) return
  if (event.altKey !== (definition.alt ?? false)) return
  if (event.metaKey !== (definition.meta ?? false)) return

  callback()
}
