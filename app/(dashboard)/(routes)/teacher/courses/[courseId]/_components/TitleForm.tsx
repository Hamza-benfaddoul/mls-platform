'use client'

import * as z from 'zod'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import { fromJSON } from 'postcss'

interface TitleFormProps {
  initialData: {
    title: string
  }
  courseId: string
}

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
})

const TitleForm = ({ initialData, courseId }: TitleFormProps) => {
  const [isEditing, setEditing] = useState(false)

  const toggleEidit = () => setEditing((current) => !current)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values)
  }

  return (
    <div className='mt-6 border bg-slate-100 rounded-md p-4'>
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
              render={({ field }) => <FormItem></FormItem>}
            />
          </form>
        </Form>
      )}
    </div>
  )
}

export default TitleForm
