'use client'

import * as z from 'zod'
import axios from 'axios'
import { toast } from 'react-hot-toast'

import { Button } from '@/components/ui/button'
import { File, ImageIcon, Loader2, Pencil, PlusCircle, X } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Attachment, Course } from '@prisma/client'
import FileUpload from '@/components/FileUpload'

interface AttachmentFromProps {
  initialData: Course & { attachments: Attachment[] }
  courseId: string
}

const formSchema = z.object({
  url: z.string().min(1),
})

const AttachmentFrom = ({ initialData, courseId }: AttachmentFromProps) => {
  const router = useRouter()
  const [isEditing, setEditing] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const toggleEidit = () => setEditing((current) => !current)

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values)
      toast.success('Course updated')
      toggleEidit()
      router.refresh()
    } catch {
      toast.error('Something went worng')
    }
  }

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id)
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`)
      toast.success('Attachment deleted')
      router.refresh()
    } catch {
      toast.error('Something went worng')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className='mt-6 border bg-white rounded-md p-4'>
      <div className='font-medium flex justify-between items-center'>
        Course attachments
        <Button variant='ghost' onClick={toggleEidit}>
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <PlusCircle className='h-4 w-4 mr-2' />
              Add an file
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData.attachments.length === 0 && (
            <p className='text-sm mt-2 text-slate-500 italic'>
              No attachments yet
            </p>
          )}
          {initialData.attachments.length > 0 && (
            <div className='space-y-2 '>
              {initialData.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className='flex items-center p-3 w-full bg-slky-100 border border-sky-200 text-sky-700 rounded-md '
                >
                  <File className='h-4 w-4 mr-2 flex flex-shrink-0' />
                  <p className='text-xs line-clamp-1'>{attachment.name}</p>
                  {deletingId === attachment.id && (
                    <div>
                      <Loader2 className='h-4 w-4 animate-spin' />
                    </div>
                  )}

                  {deletingId !== attachment.id && (
                    <button
                      onClick={() => onDelete(attachment.id)}
                      className='ml-auto hover:opacity-75 trasition'
                    >
                      <X className='h-4 w-4 ' />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint='courseAttachment'
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url })
              }
            }}
          />
          <div className='text-xs text-muted-foreground mt-4'>
            Add anything your students might need to complete the course.
          </div>
        </div>
      )}
    </div>
  )
}

export default AttachmentFrom
