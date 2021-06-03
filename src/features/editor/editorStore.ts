import { atom } from 'recoil';

export const leftEditorContentState = atom({
  key: 'leftEditor',
  default: ''
})

export const rightEditorContentState = atom({
  key: 'rightEditor',
  default: ''
})