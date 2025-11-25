import type {
  StorageEngineDefinition,
  StorageEngineInstance,
} from './defineStorageEngine'
import { localStorageEngine } from './storage-engines/localStorageEngine'

const storageEngines = {
  localStorageEngine,
} satisfies Record<string, StorageEngineDefinition>

export type StorageEngineType = keyof typeof storageEngines

export function getStorageEngine(
  engineIdentifier: StorageEngineType,
): StorageEngineDefinition {
  return storageEngines[engineIdentifier]
}

type CreateStorageEngineInstanceOptions = {
  engineIdentifier: StorageEngineType
  targetIdentifier: string
}

export function createStorageEngineInstance({
  engineIdentifier,
  targetIdentifier,
}: CreateStorageEngineInstanceOptions): StorageEngineInstance {
  return getStorageEngine(engineIdentifier).createInstance(targetIdentifier)
}
