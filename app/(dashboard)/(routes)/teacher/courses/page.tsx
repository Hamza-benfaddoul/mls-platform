import { Button } from '@/components/ui/button'
import Link from 'next/link'

import  {auth}  from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'


import { columns } from './_components/columns'
import { DataTable } from './_components/data-table'
import { db } from '@/lib/db'

const Courses = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect('/sign-in')
  }

  const courses = await db.course.findMany({
    where: {
      userId,
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
