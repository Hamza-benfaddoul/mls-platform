'use client'
import { Card } from '@/components/ui/card'
import { Clock } from 'lucide-react'

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'

interface ChartProps {
  data: {
    name: string
    hour: number
    pv: number
    amt: number
  }[]
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active) {
    return (
      <div className=' flex items-center bg-white p-2 shadow-md rounded'>
      <Clock size={24} className='mr-1' />
        <p className='font-semibold text-sm'>{`${label} : ${payload[0].value} hours`}</p>
      </div>
    )
  }

  return null
}

const CustomXAxisTick = ({ x, y, payload }: any) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor='end'
        fill='#666'
        transform='rotate(-35)'
      >
        {payload.value}
      </text>
    </g>
  )
}

const Chart = ({ data }: ChartProps) => {
  return (
    <Card>
      <h2 className='text-xl m-4 mb-0 font-semibold'>
        Wekly Hours Spent on Platform
      </h2>
      <ResponsiveContainer width='100%' height={400}>
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 30,
            right: 33,
            left: -1,
            bottom: 40,
          }}
        >
          <CartesianGrid strokeDasharray='3.3' vertical={false} />
          <XAxis dataKey='name' tick={<CustomXAxisTick />} />
          <YAxis  label={{value:'Hour',  position: 'top', offset: 10}} orientation='left' />
          <Tooltip content={<CustomTooltip/>} />
          <Area
            type='monotone'
            dataKey='hour'
            stroke='#8884d8'
            fill='#8884d8'
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  )
}

export default Chart
