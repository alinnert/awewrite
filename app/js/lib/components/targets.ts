export type Targets = {
  all: (targetName: string) => HTMLElement[]
  first: (targetName: string) => HTMLElement | undefined
  firstOrThrow: (targetName: string) => HTMLElement
  getFullName: (targetName: string) => string
}

export function createTargets(element: HTMLElement, componentName: string): Targets {
  function all(targetName: string): HTMLElement[] {
    const result: HTMLElement[] = []
    for (const el of element.getElementsByClassName(getFullName(targetName))) {
      if (!(el instanceof HTMLElement)) continue
      result.push(el)
    }
    return result
  }

  function first(targetName: string): HTMLElement | undefined {
    return all(targetName)[0]
  }

  function firstOrThrow(targetName: string): HTMLElement {
    const target = first(targetName)
    if (target === undefined) {
      throw new Error(
        `Target "${targetName}" is required for component "${componentName}" but was not found.`
      )
    }
    return target
  }

  function getFullName(targetName: string): string {
    return `${componentName}__${targetName}`
  }

  return { all, first, firstOrThrow, getFullName }
}
