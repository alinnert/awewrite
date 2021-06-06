import { basicSetup, EditorState } from '@codemirror/basic-setup'
import { defaultTabBinding } from '@codemirror/commands'
import { EditorView, keymap } from '@codemirror/view'
import { RefObject, useEffect, useMemo, useRef } from 'react'

interface UseCodeMirrorParams {
  content: string
  onContentChange: (content: string) => void
}

/**
 * This hook connects CodeMirror with React.
 * @returns The `RefObject` that's meant to be attached to an element.
 * 
 * @example
 * ``` tsx
 * const editorElementRef = useCodeMirror({ content, onContentChange })
 * <div ref={editorElementRef} />
 * ```
 */
export function useCodeMirror({
  content,
  onContentChange,
}: UseCodeMirrorParams): RefObject<HTMLDivElement> {
  /**
   * A `RefObject` that references the element CodeMirror is attached to.
   */
  const editorElementRef = useRef<HTMLDivElement>(null)

  /**
   * A `MutableRefObject` that stores the `EditorView` (CodeMirror instance).
   */
  const editorViewRef = useRef<EditorView | null>(null)

  const updateListener = useMemo(() => {
    return EditorView.updateListener.of((update) => {
      if (!update.docChanged) return
      onContentChange(update.state.doc.toString())
    })
  }, [onContentChange])

  // Initialize CodeMirror on component mount
  useEffect(() => {
    if (editorElementRef.current === null) return
    if (editorViewRef.current !== null) return

    editorViewRef.current = new EditorView({
      state: EditorState.create({
        doc: content,
        extensions: [
          basicSetup,
          keymap.of([defaultTabBinding]),
          updateListener,
        ],
      }),
      parent: editorElementRef.current,
    })
  }, [content, updateListener])

  // Update document on `content` change
  useEffect(() => {
    if (editorViewRef.current === null) return

    const doc = editorViewRef.current.state.doc

    // Don't update the document if it's equal to the `content` prop.
    // Otherwise it would reset the cursor position.
    const currentDocument = doc.toString()
    if (content === currentDocument) return

    // TODO: throttle `dispatch` call
    editorViewRef.current.dispatch({
      changes: { from: 0, to: doc.length, insert: content },
    })
  }, [content])

  // Destroy CodeMirror on component unmount
  useEffect(() => {
    return () => {
      editorViewRef.current?.destroy()
    }
  }, [])

  return editorElementRef
}
