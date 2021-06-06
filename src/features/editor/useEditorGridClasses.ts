import { useMemo } from 'react'
import { EditorGridLayout } from './EditorGrid'

const dockedPaneWidth = '300px'

export function useEditorGridClasses(layout: EditorGridLayout): {
  editorGridClasses: string
  editorPaneClasses: string
} {
  const editorGridBaseClasses =
    'w-full h-full grid justify-items-center items-stretch overflow-hidden'

  const editorGridColsClasses = useMemo<string>(() => {
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
    editorGridClasses: `${editorGridBaseClasses} ${editorGridColsClasses}`,
    editorPaneClasses: `
      w-[500px] max-h-full overflow-auto
      bg-gray-100 rounded-t border border-gray-400
      font-mono text-gray-800
    `,
  }
}
