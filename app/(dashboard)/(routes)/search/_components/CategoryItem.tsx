'use client'

import { IconType } from 'react-icons'

import qs from 'query-string'

import { cn } from '@/lib/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface CategoryItemProps {
  label: string
  value?: string
  icon?: IconType
}
const CategoryItem = ({ label, value, icon: Icon }: CategoryItemProps) => {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentCategoryId = searchParams.get('categoryId')
  const currentTitle = searchParams.get('title')

  const isSelected = currentCategoryId === value

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: currentTitle,
          categoryId: isSelected ? null : value,
        },
      },
      { skipNull: true, skipEmptyString: true },
    )

    router.push(url)
  }

  return (
    <button
    onClick={onClick}
      className={cn(
        'py-2 px-3 text-xm border border-slate-200 flex items-center rounded-full gap-x-1 hover:border-sky-700 transition',
        isSelected && 'border-sky-700 bg-sky-200/20 text-sky-800',
      )}
      type='button'
    >
      {Icon && <Icon size={20} />}
      <div className='truncate'>{label}</div>
    </button>
  )
}

export default CategoryItem
