import { getProgress } from '@/actions/getProgress'

import { db } from '@/lib/db'

import { redirect } from 'next/navigation'

import CourseSidebar from './_components/CourseSidebar'
import CourseNavbar from './_components/CourseNavbar'
import { currentUser } from '@/lib/auth'

const CourseLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode
  params: { courseId: string }
}) => {
  const user = await currentUser();

  if (!user!.userId) return redirect('/sign-in')

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
              userId: user!.userId,
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

  const progressCount = await getProgress(user!.userId, course.id)

  return (
    <div className='h-full bg-gray-200'>
      <div className='h-[80px] w-full  fixed z-50'>
        <CourseNavbar course={course} progressCount={progressCount} />
      </div>
      <div className='hidden mt-20 md:flex h-full w-72 flex-col fixed inset-y-0 z-50'>
        <CourseSidebar course={course} progressCount={progressCount} />
      </div>
      <main className='md:pl-72 pt-[80px] h-screen '>{children}</main>
    </div>
  )
}

export default CourseLayout
