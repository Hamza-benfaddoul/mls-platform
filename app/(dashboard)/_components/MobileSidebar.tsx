import { Menu } from 'lucide-react'
import Sidebar from './Sidebar'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className='lg:hidden pr-4 hover:opacity-75 trasition'>
        <Menu />
      </SheetTrigger>
      <SheetContent side='left' className='p-0 bg-white'>
        <SheetClose className='w-full h-full'>
          <Sidebar />
        </SheetClose>
      </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar
