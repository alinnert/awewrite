import { FC, PropsWithChildren } from 'react'

interface Props {}

export const AppFrame: FC<PropsWithChildren<Props>> = ({ children }) => {
  return (
    <div className="fixed inset-0 grid grid-cols-1 grid-rows-[auto,1fr] bg-green-100 select-none">
      {children}
    </div>
  )
}
