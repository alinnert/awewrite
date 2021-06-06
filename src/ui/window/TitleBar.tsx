import { FC } from 'react'
import { useSetRecoilState } from 'recoil'
import { editorContentStateFamily } from '../../features/editor/editorStore'

interface Props {
  title: string
}

export const TitleBar: FC<Props> = ({ title }) => {
  const setLeftEditorContent = useSetRecoilState(
    editorContentStateFamily('left'),
  )

  return (
    <div className="px-4 py-2 app-drag">
      <div className="font-bold">{title}</div>

      <div onClick={() => {
        setLeftEditorContent('Hallo, Welt!')
      }}>Set left editor content!</div>
    </div>
  )
}
