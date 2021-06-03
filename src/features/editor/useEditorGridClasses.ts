import { useMemo } from 'react'
import { EditorGridLayout } from './EditorGrid'

const dockedPaneWidth = '300px'

export function useEditorGridClasses(layout: EditorGridLayout): {
  editorGridClasses: string
  editorPaneClasses: string
} {
  const baseClasses =
    'mt-4 w-full h-full grid justify-items-center items-stretch'

  const gridCols = useMemo<string>(() => {
    switch (layout) {
      case 'default':
        return 'grid-cols-2'
      case 'left-only':
        return 'grid-cols-[1fr,0]'
      case 'right-only':
        return 'grid-cols-[0,1fr]'
      case 'left-focused':
        return `grid-cols-[1fr,${dockedPaneWidth}]`
      case 'right-focused':
        return `grid-cols-[${dockedPaneWidth},1fr]`
    }
  }, [layout])

  return {
    editorGridClasses: `${baseClasses} ${gridCols}`,
    editorPaneClasses: 'bg-white rounded-t shadow-xl min-w-[500px]'
  }
}
