'use client'

import React from 'react'
import SidebarItem from './SidebarItem'
import { Layout, Compass, BarChart, List } from 'lucide-react'
import { usePathname } from 'next/navigation'

const guestRoutes = [
  {
    icon: Layout,
    label: 'dashboard',
    href: '/',
  },
  {
    icon: Compass,
    label: 'Browse',
    href: '/search',
  },
]

const TeacherRoutes = [
  {
    icon: List,
    label: 'Courses',
    href: '/teacher/courses',
  },
  {
    icon: BarChart,
    label: 'Analytics',
    href: '/teacher/analytics',
  },
]

const SidebarRoutes = () => {
  const pathname = usePathname();
  const isTeacherPage = pathname?.includes('/teacher');

  const routes = isTeacherPage ? TeacherRoutes : guestRoutes;


  return (
    <div className='flex flex-col w-full'>
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}

export default SidebarRoutes
