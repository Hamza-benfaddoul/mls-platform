import Image from 'next/image'

import RegisterFrom from '@/components/auth/register-form'

const RegisterPage = () => {
  return (
    <div className='w-full lg:grid  lg:grid-cols-2 '>
      <div className='flex items-center justify-center py-12'>
        <RegisterFrom />
      </div>
      <div className='hidden h-screen lg:block'>
        <Image
          src='/login.svg'
          alt='Image'
          width='1920'
          height='1080'
          className='h-full w-full  object-cover dark:brightness-[0.2] dark:grayscale'
        />
      </div>
    </div>
  )
}

export default RegisterPage
