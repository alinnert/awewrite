import type { StorageEngine } from './storage-engines/lib/defineStorageEngine'
import { localStorageEngine } from './storage-engines/localStorageEngine'

const storageEngines = {
  localStorageEngine,
} satisfies Record<string, StorageEngine>

export type StorageEngineType = keyof typeof storageEngines

export function getStorageEngine(
  engineIdentifier: StorageEngineType,
): StorageEngine {
  return storageEngines[engineIdentifier]
}
