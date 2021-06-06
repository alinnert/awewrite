import { atomFamily } from 'recoil'

export type EditorId = 'left' | 'right'

const editorStorageKeys: Record<EditorId, string> = {
  left: 'webwrite:left-editor-content',
  right: 'webwrite:right-editor-content',
}

export const editorContentStateFamily = atomFamily<string, EditorId>({
  key: 'editorContent',
  default(id: EditorId) {
    return localStorage.getItem(editorStorageKeys[id]) ?? ''
  },
  effects_UNSTABLE: (id) => [
    ({ onSet }) => {
      onSet((newValue) => {
        if (typeof newValue !== 'string') return
        localStorage.setItem(editorStorageKeys[id], newValue)
      })
    },
  ],
})
