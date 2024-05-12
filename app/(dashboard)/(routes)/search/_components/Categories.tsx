'use client'
import { Category } from '@prisma/client'

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
  return (
    <div className='flex items-center gap-x-2 overflow-x-auto pt-3 p-2'>
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  )
}

export default Categories
