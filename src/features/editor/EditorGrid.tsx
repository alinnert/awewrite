import { FC, ReactElement } from 'react'
import { useEditorGridClasses } from './useEditorGridClasses'

export type EditorPanePosition = 'left' | 'right'
export type EditorGridLayout =
  | 'default'
  | `${EditorPanePosition}-only`
  | `${EditorPanePosition}-focused`

interface Props {
  layout: EditorGridLayout
  leftEditor: ReactElement
  rightEditor: ReactElement
}

export const EditorGrid: FC<Props> = ({ layout, leftEditor, rightEditor }) => {
  const { editorGridClasses, editorPaneClasses } = useEditorGridClasses(layout)

  return (
    <div className={editorGridClasses}>
      <div className={editorPaneClasses}>{leftEditor}</div>
      <div className={editorPaneClasses}>{rightEditor}</div>
    </div>
  )
}
