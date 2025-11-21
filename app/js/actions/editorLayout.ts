import { mutableValue } from '@alinnert/reactive'
import { textBoxLayoutElements } from '../elements.ts'
import { getOrSetLocalStorageItem } from '../localStorage/getOrSetLocalStorageItem.ts'
import { storageKey } from '../localStorage/initLocalStorage.ts'

type EditorLayoutMode = 'focus' | 'max'
type EditorSide = 'left' | 'right'
export type EditorLayout = 'default' | `${EditorLayoutMode}-${EditorSide}`

export const currentEditorLayout$ = mutableValue<string>(
  getOrSetLocalStorageItem(storageKey.editorLayout, 'default')
)

currentEditorLayout$.onChange((layout) => {
  // const editorLayout = layout as EditorLayout
  // leftBoxElement.classList.toggle('textarea-box--is-minimized', editorLayout === 'max-right')
  // rightBoxElement.classList.toggle('textarea-box--is-minimized', editorLayout === 'max-left')

  // const [leftBoxValue, rightBoxValue] = getBoxWidths(editorLayout)

  // leftBoxElement.style.right = leftBoxValue
  // rightBoxElement.style.left = rightBoxValue

  for (const element of textBoxLayoutElements) {
    element.classList.toggle('is-current', element.dataset.value === layout)
  }

  localStorage.setItem(storageKey.editorLayout, layout)
})

// type BoxWidths = [leftBoxValue: string, rightBoxValue: string]

// function getBoxWidths(layout: EditorLayout): BoxWidths {
//   const defaultResult: BoxWidths = ['50%', '50%']

//   if (layout === 'default') {
//     return defaultResult
//   }

//   const dockedWidth = '400px'
//   const focusedWidth = `calc(100% - ${dockedWidth})`
//   const [mode, side] = layout.split('-') as [EditorLayoutMode, EditorSide]

//   if (mode === 'max') {
//     return side === 'left' ? ['0', '100%'] : ['100%', '0']
//   }
//   if (mode === 'focus') {
//     return side === 'left' ? [dockedWidth, focusedWidth] : [focusedWidth, dockedWidth]
//   }

//   return defaultResult
// }
