'use client'

import React from 'react'
import SidebarItem from './SidebarItem'
import {
  Layout,
  Compass,
  BarChart,
  List,
  UserRound,
  Settings,
  Tv2,
  CircleHelp,
} from 'lucide-react'
import { usePathname } from 'next/navigation'

const guestRoutes = [
  {
    icon: BarChart,
    label: 'Analytics',
    href: '/',
  },
  {
    icon: Tv2,
    label: 'AR/VR Training',
    href: '/courses',
  },
  {
    icon: UserRound,
    label: 'Profile',
    href: '/profile',
  },
  {
    icon: Settings,
    label: 'Settings',
    href: '/settings',
  },
  {
    icon: CircleHelp,
    label: 'Help',
    href: '/help',
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
  const pathname = usePathname()
  const isTeacherPage = pathname?.includes('/teacher')

  const routes = isTeacherPage ? TeacherRoutes : guestRoutes

  return (
    <div className='flex p-2 gap-2 flex-col w-full'>
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
