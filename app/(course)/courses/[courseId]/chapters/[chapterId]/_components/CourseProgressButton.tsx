'use client'

import { Button } from '@/components/ui/button'
import { useConfettiStore } from '@/hooks/use-conmfetti-store'
import axios, { Axios } from 'axios'
import { CheckCircle, XCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

interface CourseProgressButtonProps {
  isCompleted?: boolean
  courseId: string
  chapterId: string
  nextChapterId?: string
}

const CourseProgressButton = ({
  courseId,
  chapterId,
  nextChapterId,
  isCompleted,
}: CourseProgressButtonProps) => {
  const router = useRouter()
  const confetti = useConfettiStore()
  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    try {
      setIsLoading(true)
      await axios.put(
        `/api/courses/${chapterId}/chapters/${chapterId}/progress`,
        {
          isCompleted: !isCompleted,
        },
      )

      if (!isCompleted && !nextChapterId) {
        confetti.onOpen()
      }

      if (!isCompleted && nextChapterId) {
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`)
      }

      toast.success('Progress updated.')
      router.refresh()
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const Icon = isCompleted ? XCircle : CheckCircle

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      type='button'
      variant={isCompleted ? 'outline' : 'success'}
      className='w-full md:w-auto'
    >
      {isCompleted ? 'Not completed' : 'Mark as complete'}
      <Icon className='h-4 w-4 ml-2' />
    </Button>
  )
}

export default CourseProgressButton