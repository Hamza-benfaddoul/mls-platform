import React from 'react'
import Image from 'next/image'

const Logo = () => {
  return <Image height={200} sizes='lg' width={230} alt='logo' src='/logo.png' />
}

export default Logo
