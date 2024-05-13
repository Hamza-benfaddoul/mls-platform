'use client'

import ReactConfetti from 'react-confetti'
import { useConfettiStore } from '@/hooks/use-conmfetti-store'

export const ConfettiProvider = () => {
  const confetti = useConfettiStore()

  if (!confetti.isOpen) return null
  return (
    <ReactConfetti
      className='pointer-events-none z-[100] w-full h-full'
      numberOfPieces={100}
      recycle={false}
      onConfettiComplete={() => {
        confetti.onClose()
      }}
    />
  )
}
