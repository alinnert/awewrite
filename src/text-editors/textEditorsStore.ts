import { defineStore } from 'pinia'
import { markRaw, type Raw } from 'vue'
import type { StorageEngineInstance } from './defineStorageEngine'
import {
  createStorageEngineInstance,
  type StorageEngineType,
} from './storageEngines'

export type EditorIdentifier = 'left' | 'right'

export const useTextEditorsStore = defineStore('text-editors', {
  state: () => ({
    editors: {
      left: [] as Raw<StorageEngineInstance>[],
      right: [] as Raw<StorageEngineInstance>[],
    },
  }),
  actions: {
    newFile(
      editorIdentifier: EditorIdentifier,
      storageEngine: StorageEngineType = 'localStorageEngine',
    ) {
      const instance = markRaw(
        createStorageEngineInstance({
          engineIdentifier: storageEngine,
          targetIdentifier: editorIdentifier,
        }),
      )

      const currentInstances = this.editors[editorIdentifier] ?? []

      this.editors[editorIdentifier] = [...currentInstances, instance]
    },
  },
})
