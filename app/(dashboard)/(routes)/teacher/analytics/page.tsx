import { getAnalytics } from '@/actions/getAnalytics'
import { redirect } from 'next/navigation'
import React from 'react'
import DataCard from './_components/DataCard'
import Chart from './_components/Chart'
import { currentUser } from '@/lib/auth'

const Analytics = async () => {
  const user = await currentUser()

  const { data, totalRevenue, totalSales } = await getAnalytics(user!.userId)

  return (
    <div className='p-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
        <DataCard label='Total Revenue' value={totalRevenue} shouldFormat />
        <DataCard label='Total Sales' value={totalSales} />
      </div>
      <Chart data={data} />
    </div>
  )
}

export default Analytics
