export type CreateAttrOptions<T> = {
  type: {
    get: (value: string) => T
    set: (value: T) => string
  }
  defaultValue?: T
}

export type DynamicAttr<T> = {
  get: () => T
  getRaw: () => string | null
  set: (value: T) => void
  update: (updateFn: (value: T) => T) => void
  onChange: (changeHandler: (value: string) => void) => void
}

export type CreateAttr<T> = (
  element: HTMLElement,
  attrName: string,
  options: CreateAttrOptions<T>,
) => DynamicAttr<T>

export const createAttr: CreateAttr<T>

export type AttrConverter<T> = {
  get: (value: string) => T
  set: (value: T) => string
}

export const stringAttr: AttrConverter<string>
export const intAttr: AttrConverter<number>
export const floatAttr: (decimalPoints: number) => AttrConverter<number>
