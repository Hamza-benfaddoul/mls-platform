const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col items-center justify-center w-screen h-screen'>
      {children}
    </div>
  )
}

export default AuthLayout
