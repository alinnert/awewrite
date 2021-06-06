import { atom } from 'recoil'
import { EditorGridLayout } from './EditorGrid'

export const editorGridLayoutState = atom<EditorGridLayout>({
  key: 'editorGridLayout',
  default: 'default',
})
