import { getProgress } from '@/actions/getProgress'

import { db } from '@/lib/db'

import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import CourseSidebar from './_components/CourseSidebar'
import CourseNavbar from './_components/CourseNavbar'

const CourseLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode
  params: { courseId: string }
}) => {
  const { userId } = auth()

  if (!userId) return redirect('/sign-in')

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId: userId,
            },
          },
        },
        orderBy: {
          position: 'asc',
        },
      },
    },
  })

  if (!course) return redirect('/')

  const progressCount = await getProgress(userId, course.id)

  return (
    <div className='h-full bg-gray-200'>
      <div className='h-[80px] w-full  fixed z-50'>
        <CourseNavbar course={course} progressCount={progressCount} />
      </div>
      <div className='hidden mt-20 md:flex h-full w-56 flex-col fixed inset-y-0 z-50'>
        <CourseSidebar course={course} progressCount={progressCount} />
      </div>
      <main className='md:pl-56 pt-[80px] h-screen '>{children}</main>
    </div>
  )
}

export default CourseLayout
