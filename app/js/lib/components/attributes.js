/**
 * @type {import('./attributes.js').CreateAttr<T>}
 * @template T
 */
export function createAttr(element, attrName, { type, defaultValue }) {
  function get() {
    const value = type.get(element.getAttribute(attrName))
    if (value === null || Number.isNaN(value)) {
      return defaultValue
    }
    return value
  }

  function getRaw() {
    return element.getAttribute(attrName)
  }

  function set(value) {
    element.setAttribute(attrName, type.set(value))
  }

  function update(updateFn) {
    const newValue = type.set(updateFn(type.get(element.getAttribute(attrName))))
    element.setAttribute(attrName, newValue)
    changeHandler(newValue)
  }

  let changeHandler = (_value) => {}

  function onChange(handler) {
    changeHandler = handler
  }

  return { get, getRaw, set, update, onChange }
}

/** @type {import('./attributes.js').AttrConverter<string>} */
export const stringAttr = {
  get(value) {
    return value
  },
  set(value) {
    return value
  },
}

/** @type {import('./attributes.js').AttrConverter<number>} */
export const intAttr = {
  get(value) {
    return Number.parseInt(value)
  },
  set(value) {
    return value.toString()
  },
}

/**
 * @param {number} decimalPoints
 * @returns {import('./attributes.js').AttrConverter<number>}
 */
export const floatAttr = (decimalPoints) => ({
  get(value) {
    return Number.parseFloat(value) * 10 ** decimalPoints
  },
  set(value) {
    return (value / 10 ** decimalPoints).toString()
  },
})
