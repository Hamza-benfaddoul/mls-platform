import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}
const layout = ({ children }: LayoutProps) => {
  return (
    <div className='flex w-screen h-screen items-center justify-center '>{children}</div>
  )
}

export default layout



/*
bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800
*/
