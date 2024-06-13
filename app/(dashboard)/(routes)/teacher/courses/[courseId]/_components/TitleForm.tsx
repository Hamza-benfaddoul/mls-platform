'use client'

import * as z from 'zod'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Course } from '@prisma/client'

interface TitleFormProps {
  initialData: Course;
  courseId: string
}

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
})

const TitleForm = ({ initialData, courseId }: TitleFormProps) => {
  const router = useRouter()
  const [isEditing, setEditing] = useState(false)

  const toggleEidit = () => setEditing((current) => !current)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      title: initialData?.title || ''
    } 

  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success('Course updated')
      toggleEidit()
      router.refresh()
    } catch {
      toast.error('Something went worng')
    }
  }

  return (
    <div className='mt-6 border bg-white rounded-md p-4'>
      <div className='font-medium flex justify-between items-center'>
        Course title
        <Button variant='ghost' onClick={toggleEidit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className='h-4 w-4 mr-2' />
              Edit title
            </>
          )}
        </Button>
      </div>
      {!isEditing && <p className='text-sm mt-2'>{initialData.title}</p>}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4 mt-4'
          >
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Advanced web developement'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex items-center gap-x-2'>
              <Button disabled={!isValid || isSubmitting} type='submit'>
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}

export default TitleForm
