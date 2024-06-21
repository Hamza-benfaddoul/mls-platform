import Image from 'next/image'

import LoginFrom from '@/app/components/auth/login-form'

const LoginPage = () => {
  return (
    <div className='w-full h-full lg:grid  lg:grid-cols-2 '>
      <div className='flex items-center justify-center py-12'>
        <LoginFrom />
      </div>
      <div className='hidden h-screen lg:block'>
        <Image
          src='/login.svg'
          alt='Image'
          width='1920'
          height='1080'
          className='h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
        />
      </div>
    </div>
  )
}

export default LoginPage
