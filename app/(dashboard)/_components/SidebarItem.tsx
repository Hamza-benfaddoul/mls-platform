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
    (pathname == '/' && href  == '/') ||
    pathname == href || pathname?.startsWith(`${href}/`)

  const handleClick = () => {
    router.push(href)
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        'flex items-center gap-x-2  text-sm font-[500] pl-6 transition-all ',
        isActive
          ? 'text-sky-700  bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700'
          : 'text-slate-500 hover:text-slate-600  hover:bg-slate-300/20',
      )}
    >
      <div className='flex items-center gap-x-2 py-4'>
        <Icon
          size={22}
          className={cn('text-slate-500', isActive && 'text-sky-700')}
        />
        {label}
      </div>
      <div
        className={cn(
          'ml-auto  border-2 border-sky-700 h-full transition-all',
          isActive ? 'obacity-100' : 'opacity-0',
        )}
      />
    </button>
  )
}

export default SidebarItem
