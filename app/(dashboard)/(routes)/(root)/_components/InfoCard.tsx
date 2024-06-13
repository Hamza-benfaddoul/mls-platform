import IconBadge from '@/components/icon-badge'
import { LucideIcon } from 'lucide-react'

interface InfoCardProps {
  numberOfItems: number
  variant?: 'success' | 'default'
  label: string
  icon: LucideIcon
}

const InfoCard = ({
  numberOfItems,
  label,
  variant,
  icon: Icon,
}: InfoCardProps) => {
  return (
    <div className='border rounded-md flex items-center bg-white gap-x-2 p-3'>
      <IconBadge variant={variant} icon={Icon} />
      <div>
        <p className='font-medium'>{label}</p>
        <p className='text-gray-500 text-sm'>
          {numberOfItems} {numberOfItems === 1 ? 'Minute' : 'Minutes'}
        </p>
      </div>
    </div>
  )
}
export default InfoCard
