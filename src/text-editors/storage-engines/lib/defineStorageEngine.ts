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
export type StorageEngine = {
  /**
   * Creates a storage engine instance.
   * @param targetIdentifier The `identifier` identifies an individual target, e.g. a filename, localStorage key, etc.
   * @returns The storage engine instance.
   */
  createInstance: (targetIdentifier: string) => StorageEngineInstance
}

type CreateInstanceObjectOptions = {
  content: Ref<string>
  targetIdentifier: string
}

type CreateInstanceObject = (
  options: CreateInstanceObjectOptions,
) => StorageEngineInstance

export type StorageEngineFactoryOptions = {
  createInstanceObject: CreateInstanceObject
}

export type StorageEngineFactory = (
  options: StorageEngineFactoryOptions,
) => StorageEngine

export function defineStorageEngine(
  factory: StorageEngineFactory,
): StorageEngine {
  return factory({
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
