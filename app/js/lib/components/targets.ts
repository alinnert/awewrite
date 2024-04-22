export type Targets = {
  all: (targetName: string) => HTMLElement[]
  first: (targetName: string) => HTMLElement | undefined
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

  function getFullName(targetName: string): string {
    return `${componentName}__${targetName}`
  }

  return { all, first, getFullName }
}
