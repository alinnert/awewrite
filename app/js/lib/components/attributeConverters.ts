export type AttrConverter<T> = {
  parse: (value: string) => T
  stringify: (value: T) => string
}

export function stringAttr(): AttrConverter<string> {
  return {
    parse: (value) => value,
    stringify: (value) => value,
  }
}

export function intAttr(): AttrConverter<number> {
  return {
    parse: (value) => Number.parseInt(value),
    stringify: (value) => value.toString(),
  }
}

export function floatAttr(decimalPoints: number): AttrConverter<number> {
  return {
    parse: (value) => Number.parseFloat(value) * 10 ** decimalPoints,
    stringify: (value) => (value / 10 ** decimalPoints).toString(),
  }
}
