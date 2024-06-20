import { redirect } from 'next/navigation'

import { db } from '@/lib/db'

import { Chapter, Course, UserProgress } from '@prisma/client'
import CourseSidebarItem from './CourseSidebarItem'
import CourseProgress from '@/components/CourseProgress'
import Sidebar from '@/app/(dashboard)/_components/Sidebar'
import { currentUser } from '@/lib/auth'

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null
    })[]
  }
  progressCount: number
}

const CourseSidebar = async ({ course, progressCount }: CourseSidebarProps) => {
  const user = await currentUser()
  if (!user) redirect('/sign-in')

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId: user!.userId,
        courseId: course.id,
      },
    },
  })

  return (
      <Sidebar />
    /* <div className='h-full border-r flex flex-col overflow-y-auto shadow-sm'>
      <div className='p-8 flex flex-col border-b'>
        <h1 className='font-semibold'>{course.title}</h1>
        {purchase && (<div className='mt-10'>
        <CourseProgress value={progressCount} variant='success' />
        </div>)}

      </div>
      <div className='flex flex-col w-full '>
        {course.chapters.map((chapter) => (
          <CourseSidebarItem 
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={course.id}
            isLocked={!chapter.isFree && !purchase}
          />
        ))}
      </div>
    </div> */
  )
}

export default CourseSidebar
