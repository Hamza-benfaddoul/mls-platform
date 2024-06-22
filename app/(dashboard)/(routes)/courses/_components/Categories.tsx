'use client'
import { Category } from '@prisma/client'
import {usePathname} from 'next/navigation'

import {
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcMusic,
  FcSportsMode,
  FcOldTimeCamera,
  FcSalesPerformance,
} from 'react-icons/fc'

import { IconType } from 'react-icons'
import CategoryItem from './CategoryItem'

interface CategoriesProps {
  items: Category[]
}

const iconMap: Record<Category['name'], IconType> = {
  Music: FcMusic,
  Fitness: FcSportsMode,
  Film: FcFilmReel,
  Photography: FcOldTimeCamera,
  Tech: FcEngineering,
  Gaming: FcMultipleDevices,
  Accounting: FcSalesPerformance,
  'Computer Science': FcMultipleDevices,
  Engineering: FcEngineering,
}

const Categories = ({ items }: CategoriesProps) => {
  const pathname = usePathname().slice(1);
  return (
    <div className='flex capitalaze items-center gap-x-2 overflow-x-auto pb-2'>
    {pathname}
      {/* items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      )) */} 
    </div>
  )
}

export default Categories
