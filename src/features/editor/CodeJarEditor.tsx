import { CodeJar } from 'codejar'
import { FC, useEffect, useMemo, useRef } from 'react'
import { SetterOrUpdater } from 'recoil'

interface Props {
  editorState: [string, SetterOrUpdater<string>]
}

export const CodeJarEditor: FC<Props> = ({
  editorState: [editorContent, setEditorContent],
}) => {
  console.log('render CodeJarEditor')
  
  const codeJarRef = useRef<HTMLDivElement>(null)

  const codeJar = useMemo(() => {
    console.log('pre init editor')
    if (codeJarRef.current === null) return null
    console.log('init editor')
    return CodeJar(codeJarRef.current, () => {}, {})
  }, [codeJarRef])

  useEffect(() => {
    if (codeJar === null) return
    console.log('set editor on update')
    codeJar.onUpdate((value) => {
      setEditorContent(value)
    })
  }, [codeJar, setEditorContent])
  
  useEffect(() => {
    if (codeJar === null) return
    console.log('update editor content')
    codeJar.updateCode(editorContent)
  }, [codeJar, editorContent])

  return (
    <div className="w-full h-full px-4 py-2 !resize-none" ref={codeJarRef} />
  )
}
