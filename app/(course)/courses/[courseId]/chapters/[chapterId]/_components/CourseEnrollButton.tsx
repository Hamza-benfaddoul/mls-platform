'use client'

import { Button } from '@/components/ui/button'
import { formatPrice } from '@/components/ui/format'
import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'

interface CourseEnrollButtonProps {
  courseId: string
  price: number
}

const CourseEnrollButton = ({ courseId, price }: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const onClick = async () => {
    try {
      setIsLoading(true)
      const response = await axios.post(`/api/courses/${courseId}/checkout`)
      window.location.assign(response.data.url)
    } catch {
      toast.error('something went wrong, please try again later.')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      size='sm'
      className='w-full md:w-auto'
    >
      Enroll for {formatPrice(price)}
    </Button>
  )
}

export default CourseEnrollButton
