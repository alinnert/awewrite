export type DynamicBoolAttr = {
  get: () => boolean
  toggle: (force: boolean) => void
}

export function createBoolAttr(element: HTMLElement, attrName: string): DynamicBoolAttr {
  function get(): boolean {
    return element.hasAttribute(attrName)
  }

  function toggle(force: boolean) {
    element.toggleAttribute(attrName, force)
  }

  return { get, toggle }
}
