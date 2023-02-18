export function createValue(initialValue) {
  let value = initialValue
  const target = new EventTarget()

  return {
    get value() {
      return value
    },

    set(newValue) {
      value = newValue
      const changeEvent = new CustomEvent('change', {
        detail: newValue,
      })
      target.dispatchEvent(changeEvent)
    },

    onChange(listener) {
      target.addEventListener(
        'change',
        /** @param { CustomEvent<number> } event */
        (event) => {
          listener(event.detail)
        },
      )
      listener(value)
    },
  }
}
