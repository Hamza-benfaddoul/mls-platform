import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import { getDashboardCourses } from '@/actions/getDashboardCourses'
import CoursesList from '@/components/CoursesList'
import {
  CheckCircle,
  Clock5,
  Fullscreen,
  SquareDashedMousePointer,
} from 'lucide-react'
import InfoCard from './_components/InfoCard'
import Chart from './_components/Chart'

import { getAnalytics } from '@/actions/getAnalytics'
const data = [
  {
    name: 'Monday',
    hour: 1.5,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Tuesday',
    hour: 0.5,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Wednesday',
    hour: 4,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Thursday',
    hour: 2,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Friday',
    hour: 2.5,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Saturday',
    hour: 2,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Sunday',
    hour: 3.4,
    pv: 4300,
    amt: 2100,
  },
]
export default async function Dashboard() {
  const { userId } = auth()

  if (userId === null) redirect('/sign-in')

  /*   const { data} = await getAnalytics(userId); */

  const { completedCourses, coursesInProgress } =
    await getDashboardCourses(userId)

  return (
    <div className='p-6 space-y-4 '>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <InfoCard
          icon={SquareDashedMousePointer}
          label='My Training Time'
          numberOfItems={coursesInProgress.length}
        />
        <InfoCard
          icon={Fullscreen}
          label='My Viewing Time'
          numberOfItems={completedCourses.length}
        />
        <InfoCard
          icon={Clock5}
          label='My Platform Time'
          numberOfItems={completedCourses.length}
        />
      </div>
      {/*       <CoursesList items={[...coursesInProgress, ...completedCourses]} /> */}
      <Chart data={data} />
    </div>
  )
}
