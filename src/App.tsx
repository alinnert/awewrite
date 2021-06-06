import { FC } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { CodeMirror } from './features/editor/CodeMirror'
import { EditorGrid } from './features/editor/EditorGrid'
import { editorGridLayoutState } from './features/editor/editorGridStore'
import { editorContentStateFamily } from './features/editor/editorStore'
import { AppFrame } from './ui/window/AppFrame'
import { TitleBar } from './ui/window/TitleBar'

export const App: FC = () => {
  const editorGridLayout = useRecoilValue(editorGridLayoutState)
  const [leftEditorContent, setLeftEditorContent] = useRecoilState(
    editorContentStateFamily('left'),
  )
  const [rightEditorContent, setRightEditorContent] = useRecoilState(
    editorContentStateFamily('right'),
  )

  return (
    <AppFrame>
      <TitleBar title="web.write_" />

      <EditorGrid
        layout={editorGridLayout}
        leftEditor={
          <CodeMirror
            content={leftEditorContent}
            onContentChange={setLeftEditorContent}
          />
        }
        rightEditor={
          <CodeMirror
            content={rightEditorContent}
            onContentChange={setRightEditorContent}
          />
        }
      />
    </AppFrame>
  )
}
