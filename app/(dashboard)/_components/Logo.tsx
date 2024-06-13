import React from 'react'
import Image from 'next/image'

const Logo = () => {
  return <Image height={40} sizes='lg' width={40} alt='logo' src='/logo.svg' />
}

export default Logo
