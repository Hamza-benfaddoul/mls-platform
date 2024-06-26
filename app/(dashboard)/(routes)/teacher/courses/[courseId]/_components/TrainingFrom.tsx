'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Pencil } from 'lucide-react'
import { useState } from 'react'

import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Chapter } from '@prisma/client'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'

interface TrainingFromProps {
  value: string
  courseId: string
  id: string
  property: string
}

const TrainingFrom = ({ id, courseId, property, value }: TrainingFromProps) => {
  const router = useRouter()

  const [propertyDetails, setPropertyDetails] = useState(property)
  const [valueDetails, setValueDetails] = useState(value)

  const [isCreating, setCreating] = useState(false)
  const [isUpdating, setUpdating] = useState(false)

  const toggleCreating = () => setCreating((current) => !current)
  const onSubmit = async () => {
    try {
      await axios.put(`/api/courses/${courseId}/trainingDetails`, {
        id: id,
        property: propertyDetails,
        value: valueDetails,
      })
      toast.success('Training Detais Updated')
      toggleCreating()
      router.refresh()
    } catch {
      toast.error('Something went worng')
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Pencil className='w-4 h-4 cursor-pointer hover:opacity-75 transition' />
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Edit Training Detail</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&aposre done.
          </DialogDescription>
        </DialogHeader>

        <Label />
        <div className='grid grid-row-2 items-center gap-4'>
          <Label htmlFor='property' className='text-left'>
            Property
          </Label>
          <Input
            id='property'
            disabled={false}
            placeholder="e.g. 'Duration'"
            value={propertyDetails}
            onChange={(e) => setPropertyDetails(e.target.value)}
          />
          <Label htmlFor='value' className='text-left'>
            Value
          </Label>
          <Textarea
            id='value'
            disabled={false}
            placeholder="e.g. '15 minutes'"
            value={valueDetails}
            onChange={(e) => setValueDetails(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button onClick={onSubmit} className='cursor-pointer' type='submit'>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default TrainingFrom
