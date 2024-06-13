import React from 'react'

const AuthLayout = ({children}:{children: React.ReactNode}) => {
  return (
    <div className="flex flex-col items-center justify-center border border-red-900 w-screen h-screen"
    >{children}</div>
  )
}

export default AuthLayout
