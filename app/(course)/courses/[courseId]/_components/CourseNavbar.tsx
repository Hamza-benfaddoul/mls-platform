import NavbarRoutes from '@/components/NavbarRoutes'
import { Chapter, Course, UserProgress } from '@prisma/client'
import CourseMobileSideBar from './CourseMobileSideBar'

interface CourseNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null
    })[]
  }
  progressCount: number
}
const CourseNavbar = ({ course, progressCount }: CourseNavbarProps) => {
  return (
    <div className='p-4 border-b bg-gray-100  h-full flex items-center shadow-sm '>
      <CourseMobileSideBar course={course} progressCount={progressCount} />
      <NavbarRoutes />
    </div>
  )
}

export default CourseNavbar
