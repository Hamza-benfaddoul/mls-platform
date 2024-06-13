'use client'

import * as z from 'zod'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { cn } from '@/lib/utils'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'

import { Button } from '@/components/ui/button'
import { Loader2, PlusCircle } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Chapter, Course } from '@prisma/client'
import { Input } from '@/components/ui/input'
import TrainingList from './TrainingList'
import { Textarea } from '@/components/ui/textarea'

interface TrainingDetaisFromProps {
  initialData: Course & { trainingDetails: [] }
  courseId: string
}

const formSchema = z.object({
  property: z.string().min(1),
  value: z.string().min(1),
})

const TrainingDetaisFrom = ({
  initialData,
  courseId,
}: TrainingDetaisFromProps) => {
  const router = useRouter()
  const [isCreating, setCreating] = useState(false)
  const [isUpdating, setUpdating] = useState(false)

  const toggleCreating = () => setCreating((current) => !current)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      property: '',
      value: '',
    },
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/trainingDetails`, values)
      toast.success('Training Detais created')
      toggleCreating()
      router.refresh()
    } catch {
      toast.error('Something went worng')
    }
  }

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setUpdating(true)
      await axios.put(`/api/courses/${courseId}/trainingDetails/reorder`, {
        list: updateData,
      })
      toast.success('Chapter reordered')
      router.refresh()
    } catch {
      toast.error('Something went worng')
    } finally {
      setUpdating(false)
    }
  }

  const onEdit = (id: string) => {
    router.push(`/teacher/courses/${courseId}/chapters/${id}`)
  }

  return (
    <div className='mt-6 relative border bg-white rounded-md p-4'>
      {isUpdating && (
        <div className='absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-md flex items-center justify-center'>
          <Loader2 className='h-6 w-6 text-sky-700 animate-spin' />
        </div>
      )}
      <div className='font-medium flex justify-between items-center'>
        Training Details
        <Button variant='ghost' onClick={toggleCreating}>
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className='h-4 w-4 mr-2' />
              Add Details
            </>
          )}
        </Button>
      </div>
      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4 mt-4'
          >
            <FormField
              control={form.control}
              name='property'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Duration'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='value'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="e.g. '15 minutes'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={!isValid || isSubmitting} type='submit'>
              Create
            </Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div className={cn('text-sm mt-2')}>
          {!initialData.trainingDetails.length && 'No chapters yet'}
          <TrainingList
            courseId={courseId}
            onEdit={onEdit}
            onReorder={onReorder}
            items={initialData.trainingDetails || []}
          />
        </div>
      )}
      {!isCreating && (
        <p className='text-xs text-muted-foreground mt-4'>
          Drag and drop to reorder Chapters
        </p>
      )}
    </div>
  )
}

export default TrainingDetaisFrom
