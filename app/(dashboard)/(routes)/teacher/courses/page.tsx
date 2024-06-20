import { columns } from './_components/columns'
import { DataTable } from './_components/data-table'
import { db } from '@/lib/db'

import { currentUser } from '@/lib/auth'

const Courses = async () => {
  const user = await currentUser()
  if (!user) return

  const courses = await db.course.findMany({
    where: {
      userId: user.userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div className='p-6'>
      <DataTable columns={columns} data={courses} />
    </div>
  )
}

export default Courses
