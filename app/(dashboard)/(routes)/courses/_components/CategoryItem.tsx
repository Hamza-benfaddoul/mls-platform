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
        'py-2 px-3 text-xs font-semibold border border-slate-200 flex items-center rounded-lg gap-x-1 hover:border-primary transition',
        isSelected && 'border-primary/50 bg-primary/20 text-primary',
      )}
      type='button'
    >
      <div className='truncate'>{label}</div>
    </button>
  )
}

export default CategoryItem
