import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { LayoutDashboard } from 'lucide-react'

import { db } from '@/lib/db'
import IconBadge from '@/components/icon-badge'

import TitleForm from './_components/TitleForm'

const CourseId = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth()

  if (!userId) {
    redirect('/')
  }

  const course = await db.course.findUniqe({
    where: {
      id: params.courseId,
    },
  })

  if (!course) {
    redirect('/')
  }

  const requireFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
  ]

  const totalFields = requireFields.length
  const compeletedFields = requireFields.filter(Boolean).length

  const completionText = `(${compeletedFields}/${totalFields})`

  return (
    <div className='p-6'>
      {/*Info of completion fields*/}
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-y-2'>
          <h1 className='text-2xl font-medium'>Course setup</h1>
          <span className='text-sm text-slate-700'>
            Complete all flieds {completionText}
          </span>
        </div>
      </div>

      {/*customize course*/}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-16'>
        <div>
          <div className='flex items-center gap-x-2'>
            <IconBadge icon={LayoutDashboard} />
            <h2 className='text-xl'>Customize your course</h2>
          </div>
          <TitleForm initialData={course} courseId={course.id} />
        </div>
      </div>
    </div>
  )
}

export default CourseId
