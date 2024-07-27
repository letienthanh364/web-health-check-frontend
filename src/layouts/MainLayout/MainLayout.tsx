import { ReactNode, useEffect } from 'react'

interface Props {
  children: ReactNode
}

export default function MainLayout({ children }: Props) {
  return <div>{children}</div>
}
