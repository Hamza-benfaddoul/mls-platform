import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import { getDashboardCourses } from '@/actions/getDashboardCourses'
import CoursesList from '@/components/CoursesList'
import { CheckCircle, Clock } from 'lucide-react'
import InfoCard from './_components/InfoCard'

export default async function Dashboard() {
  const { userId } = auth()

  if (userId === null) redirect('/sign-in')


  const { completedCourses, coursesInProgress } =
    await getDashboardCourses(userId)

  return (
    <div className='p-6 space-y-4 '>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <InfoCard
          icon={Clock}
          label='In Progress'
          numberOfItems={coursesInProgress.length}
        />
        <InfoCard
          icon={CheckCircle}
          variant='success'
          label='Completed'
          numberOfItems={completedCourses.length}
        />
      </div>
      <CoursesList items={[...coursesInProgress, ...completedCourses]} />
    </div>
  )
}
