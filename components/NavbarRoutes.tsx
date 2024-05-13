'use client'

import { UserButton, useAuth } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import {isTeacher} from '@/lib/teacher'

import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import Link from 'next/link'
import SearchInput from './SearchInput'

const NavbarRoutes = () => {
  const pathname = usePathname()
  const {userId} = useAuth();


  const isTeatcherPage = pathname?.startsWith('/teacher')
  const isStudentPage = pathname?.startsWith('/courses')
  const isSearchPage = pathname == '/search'

  return (
    <>
      {isSearchPage && (
        <div className='hidden md:block'>
          <SearchInput />
        </div>
      )}
      <div className='flex gap-x-2 ml-auto'>
        {isTeatcherPage || isStudentPage ? (
          <Link href='/'>
            <Button size='sm' variant='ghost'>
              <LogOut />
              Exit
            </Button>
          </Link>
        ) : isTeacher(userId) ?  (
          <Link href='/teacher/courses'>
            <Button size='sm' variant='ghost'>
              Teacher
            </Button>
          </Link>
        ): null}
        <UserButton afterSignOutUrl='/' />
      </div>
    </>
  )
}

export default NavbarRoutes
