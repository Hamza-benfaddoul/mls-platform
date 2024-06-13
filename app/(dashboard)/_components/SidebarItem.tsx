'use client'

import React from 'react'

import { LucideIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

interface SidebarItemProps {
  icon: LucideIcon
  label: string
  href: string
}

const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const pathname = usePathname()
  const router = useRouter()
  const isActive =
    (pathname == '/' && href == '/') ||
    pathname == href ||
    pathname?.startsWith(`${href}/`)

  const handleClick = () => {
    router.push(href)
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        'flex items-center gap-x-2 rounded-lg text-sm font-[500] pl-6 transition-all ',
        isActive
          ? 'text-primary  bg-white shadow-md hover:text-primary'
          : 'text-slate-500 hover:text-slate-600 hover:shadow-md  hover:bg-white',
      )}
    >
      <div className='flex items-center gap-x-2 py-4'>
        <div
          className={cn(
            'bg-white hover:bg-primary rounded-full p-2 ',
            isActive && 'bg-primary ',
          )}
        >
          <Icon
            size={22}
            className={cn('text-slate-500 ', isActive && 'text-white')}
          />
        </div>
        {label}
      </div>
    </button>
  )
}

export default SidebarItem
