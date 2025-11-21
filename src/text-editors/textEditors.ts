import { reactive } from 'vue'
import type { StorageEngineInstance } from './storage-engines/lib/defineStorageEngine'
import { getStorageEngine, type StorageEngineType } from './storageEngines'

export const textEditors = reactive<Record<string, StorageEngineInstance>>({})

export type AddEditorOptions = {
  editorIdentifier: string
  engineIdentifier: StorageEngineType
  targetIdentifier: string
}

export function registerEditor(editorIdentifier: string) {
  const engine = getStorageEngine('localStorageEngine')
  const instance = engine.createInstance(
    editorIdentifier === 'left' ? 'editor-a' : 'editor-b',
  )
  textEditors[editorIdentifier] = instance
}

export function swapEditors(identifierA: string, identifierB: string): void {
  const editorA = textEditors[identifierA]
  const editorB = textEditors[identifierB]
  if (editorA === undefined || editorB === undefined) return
  textEditors[identifierA] = editorB
  textEditors[identifierB] = editorA

  console.log(
    'left:',
    textEditors.left!.targetIdentifier,
    'right:',
    textEditors.right!.targetIdentifier,
  )
}
