import Image from 'next/image'
import Link from 'next/link'
import IconBadge from '@/components/icon-badge'
import { BookOpen } from 'lucide-react'
import { formatPrice } from './ui/format'
import CourseProgress from './CourseProgress'

interface CourseCardProps {
  id: string
  title: string
  imageUrl: string
  chaptersLength: number
  price: number
  category: string
  progress: number | null
}

const CourseCard = ({
  id,
  title,
  imageUrl,
  chaptersLength,
  price,
  progress,
  category,
}: CourseCardProps) => {
  return (
    <Link href={`/courses/${id}`}>
      <div className='group bg-white rounded-lg hover:shadow-md trasition overflow-hidden roundend-lg border p-3 h-full'>
        <div className='relative w-full aspect-video  border overflow-hidden '>
          <Image fill className='object-cover' src={imageUrl} alt={title} />
        </div>
        <div className='flex flex-col pt-2'>
          <div className='text-lg md:text-base font-medium group-hover:text-primary trasition line-clamp-2'>
            {title}
          </div>
          <p className='text-xs text-muted-foreground '>{category}</p>
          <div className='my-3 flex items-center gap-x-2 text-sm md:text-xs'>
            <div className='flex items-center gap-x-1 text-slate-500 '>
              {/*
              <IconBadge size='sm' icon={BookOpen} />
               <span>
                {chaptersLength} {chaptersLength === 1 ? 'Chapter' : 'Chapters'}
              </span> */}
            </div>
          </div>
          {progress !== null ? (
            <CourseProgress
              value={progress}
              size='sm'
              variant={progress === 100 ? 'success' : 'default'}
            />
          ) : (
            <p className='text-md md:text-sm font-medium text-slate-700'>
              {formatPrice(price)}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}

export default CourseCard
