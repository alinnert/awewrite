import { FC, useMemo } from 'react'
import { useRecoilState } from 'recoil'
import { CodeJarEditor } from './features/editor/CodeJarEditor'
import { EditorGrid } from './features/editor/EditorGrid'
import {
  leftEditorContentState,
  rightEditorContentState,
} from './features/editor/editorStore'
import { AppFrame } from './ui/window/AppFrame'
import { TitleBar } from './ui/window/TitleBar'

export const App: FC = () => {
  const leftEditorState = useRecoilState(leftEditorContentState)
  const rightEditorState = useRecoilState(rightEditorContentState)

  const leftEditor = useMemo(
    () => <CodeJarEditor editorState={leftEditorState} />,
    [leftEditorState],
  )

  const rightEditor = useMemo(
    () => <CodeJarEditor editorState={rightEditorState} />,
    [rightEditorState],
  )

  return (
    <AppFrame>
      <TitleBar title="web.write_" />
      <EditorGrid
        layout="default"
        leftEditor={leftEditor}
        rightEditor={rightEditor}
      />
    </AppFrame>
  )
}
