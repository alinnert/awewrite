import { FC, PropsWithChildren } from 'react'

interface Props {}

export const AppFrame: FC<PropsWithChildren<Props>> = ({ children }) => {
  return (
    <div
      className="
        fixed inset-0
        grid grid-cols-1 grid-rows-[auto,1fr] gap-y-4
        bg-gray-300
        select-none
      "
    >
      {children}
    </div>
  )
}
