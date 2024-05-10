import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import {
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListChecks,
} from 'lucide-react'

import { db } from '@/lib/db'
import IconBadge from '@/components/icon-badge'

import TitleForm from './_components/TitleForm'
import DescriptionForm from './_components/DescriptionForm'
import ImageForm from './_components/ImageForm'
import PriceForm from './_components/PriceFrom'
import CategoryFrom from './_components/CategoryForm'
import AttachmentFrom from './_components/AttachmentForm'
import ChaptersFrom from './_components/ChaptersFrom'
import Banner from '@/components/banner'
import CourseAction from './_components/CourseActions'

const CourseId = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth()

  if (!userId) {
    redirect('/')
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId,
    },
    include: {
      chapters: {
        orderBy: {
          position: 'asc',
        },
      },
      attachments: {
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  })

  if (!course) {
    redirect('/')
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  const requireFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
/*     course.categoryId, */
    course.chapters.some((chapter) => chapter.isPublished),
  ]

  const totalFields = requireFields.length
  const compeletedFields = requireFields.filter(Boolean).length

  const completionText = `(${compeletedFields}/${totalFields})`
  const isCompleted = requireFields.every(Boolean)

  return (
    <>
      {!course.published && (
        <Banner label='This course is not published. It will not be visible to students.' variant='warning' />
      )}
      <div className='p-6'>
        {/*Info of completion fields*/}
        <div className='flex items-center justify-between'>
          <div className='flex flex-col gap-y-2'>
            <h1 className='text-2xl font-medium'>Course setup</h1>
            <span className='text-sm text-slate-700'>
              Complete all flieds {completionText}
            </span>
          </div>
          <CourseAction
            courseId={params.courseId}
            disabled={!isCompleted}
            isPublished={course.published}
          />
        </div>

        {/*customize course*/}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-16'>
          <div>
            <div className='flex items-center gap-x-2'>
              <IconBadge icon={LayoutDashboard} />
              <h2 className='text-xl'>Customize your course</h2>
            </div>
            <TitleForm initialData={course} courseId={course.id} />
            <DescriptionForm initialData={course} courseId={course.id} />
            <ImageForm initialData={course} courseId={course.id} />
            <CategoryFrom
              initialData={course}
              courseId={course.id}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
          </div>
          <div className='space-y-6'>
            <div>
              <div className='flex items-center gap-x-2'>
                <IconBadge icon={ListChecks} />
                <h2 className='text-xl'>Course chapters</h2>
              </div>
              <ChaptersFrom initialData={course} courseId={course.id} />
            </div>
            <div>
              <div className='flex items-center gap-x-2'>
                <IconBadge icon={CircleDollarSign} />
                <h2 className='text-xl'>Sell your course</h2>
              </div>
              <PriceForm initialData={course} courseId={course.id} />
            </div>
            <div>
              <div className='flex items-center gap-x-2'>
                <IconBadge icon={File} />
                <h2 className='text-xl'>Resources & Attachments</h2>
              </div>
              <AttachmentFrom initialData={course} courseId={course.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CourseId
