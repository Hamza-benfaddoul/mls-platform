import { Chapter, Course, UserProgress } from '@prisma/client'
import { Menu } from 'lucide-react'

import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'

import CourseSidebar from './CourseSidebar'

interface CourseMobileSideBarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null
    })[]
  }
  progressCount: number
}

const CourseMobileSideBar = ({
  course,
  progressCount,
}: CourseMobileSideBarProps) => {
  return (
    <Sheet>
      <SheetTrigger className='md:hidden pr-4 hover:opacity-75 transition'>
        <Menu />
      </SheetTrigger>
      <SheetContent side='left' className='p-0 bg-white w-72 '>
        <CourseSidebar course={course} progressCount={progressCount} />
      </SheetContent>
    </Sheet>
  )
}

export default CourseMobileSideBar
