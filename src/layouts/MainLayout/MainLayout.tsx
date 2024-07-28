import { ReactNode } from 'react'
import MainHeader from './MainHeader'

interface Props {
  children: ReactNode
}

export default function MainLayout({ children }: Props) {
  return (
    <div
      className='flex min-h-screen bg-darkblue-100 w-full shrink-0 flex-col justify-between items-center duration-200 text-white'
      style={{
        minHeight: 'inherit'
      }}
    >
      <div className='fixed w-full z-20'>
        <MainHeader />
      </div>
      <div className='pt-20 w-full h-full grow'>{children}</div>
    </div>
  )
}
