import { FC } from 'react'

interface Props {
  title: string
}

export const TitleBar: FC<Props> = ({ title }) => {
  return (
    <div className="px-4 py-2 app-drag">
      <div className="font-bold">{title}</div>
    </div>
  )
}
