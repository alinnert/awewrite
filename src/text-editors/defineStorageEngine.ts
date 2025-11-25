import { readonly, type Ref } from 'vue'

/**
 * An individual storage engine instance.
 * E.g. a single file or a single localStorage key.
 */
export type StorageEngineInstance = {
  targetIdentifier: string
  content: Readonly<Ref<string>>
  read: () => string
  write: (content: string) => void
}

/**
 * An entire storage engine that can create individual instances.
 */
export type StorageEngineDefinition = {
  /**
   * Creates a storage engine instance.
   * @param targetIdentifier The `identifier` identifies an individual target, e.g. a filename, localStorage key, etc.
   * @returns The storage engine instance.
   */
  createInstance: (targetIdentifier: string) => StorageEngineInstance
}

export type CreateInstanceObjectOptions = {
  content: Ref<string>
  targetIdentifier: string
}
export type CreateInstanceObject = (
  options: CreateInstanceObjectOptions,
) => StorageEngineInstance

export type StorageEngineInitializerOptions = {
  createInstanceObject: CreateInstanceObject
}
export type StorageEngineInitializer = (
  options: StorageEngineInitializerOptions,
) => StorageEngineDefinition

export function defineStorageEngine(
  initStorageEngine: StorageEngineInitializer,
): StorageEngineDefinition {
  return initStorageEngine({
    createInstanceObject({ content, targetIdentifier }): StorageEngineInstance {
      return {
        get targetIdentifier() {
          return targetIdentifier
        },
        get content() {
          return readonly(content)
        },
        read() {
          return content.value
        },
        write(value) {
          content.value = value
        },
      }
    },
  })
}
