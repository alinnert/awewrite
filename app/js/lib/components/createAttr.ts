export type CreateAttrOptions<T> = {
  type: { parse: (value: string) => T; stringify: (value: T) => string }
  defaultValue?: T
}

export type UpdateFn<T> = (value: T) => T

export type ChangeHandler<T> = (value: T) => void

export type DynamicAttr<T> = {
  get: () => T
  getRaw: () => string | null
  set: (value: T) => void
  update: (updateFn: UpdateFn<T>) => void
  onChange: (changeHandler: ChangeHandler<T>) => void
}

export function createAttr<T>(
  element: HTMLElement,
  attrName: string,
  { type, defaultValue }: CreateAttrOptions<T>
): DynamicAttr<T> {
  function get(): T {
    const rawValue = element.getAttribute(attrName)
    if (rawValue === null) {
      if (defaultValue === undefined) {
        throw new Error(`No default value given for missing attribute "${attrName}".`)
      }
      return defaultValue
    }

    const value = type.parse(rawValue)
    if (Number.isNaN(value)) {
      throw new Error('Parsing numeric value returned NaN.')
    }

    return value
  }

  function getRaw() {
    return element.getAttribute(attrName)
  }

  function set(value: T) {
    element.setAttribute(attrName, type.stringify(value))
  }

  function update(updateFn: UpdateFn<T>) {
    const newValue = updateFn(get())
    const newRawValue = type.stringify(newValue)
    element.setAttribute(attrName, newRawValue)

    for (const handler of changeHandlers) {
      handler(newValue)
    }
  }

  const changeHandlers: ChangeHandler<T>[] = []

  function onChange(handler: ChangeHandler<T>) {
    changeHandlers.push(handler)
  }

  return { get, getRaw, set, update, onChange }
}
