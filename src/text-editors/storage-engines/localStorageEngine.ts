import { ref, watchEffect } from 'vue'
import { defineStorageEngine } from '../defineStorageEngine'

export const localStorageEngine = defineStorageEngine(
  ({ createInstanceObject }) => ({
    createInstance(targetIdentifier) {
      const storageKey = `awe.content.${targetIdentifier}`
      const content = ref(localStorage.getItem(storageKey) ?? '')

      watchEffect(() => {
        localStorage.setItem(storageKey, content.value)
      })

      return createInstanceObject({ content, targetIdentifier })
    },
  }),
)
