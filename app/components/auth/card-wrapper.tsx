'use client'

import {cn} from '@/lib/utils'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import Header from './header'
import Social from './social'
import BackButton from './back-button'

interface CardWrapperProps {
  children: React.ReactNode
  headerLabel: string
  backButtonLabel: string
  backButtonHref: string
  showSocial?: boolean
  headerTitle: string
  className?: string
}
const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  headerTitle,
  showSocial,
  className,
}: CardWrapperProps) => {
  return (
    <Card className={cn('w-[400px]', className)}>
      <CardHeader>
        <Header label={headerLabel} title={headerTitle} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton href={backButtonHref} label={backButtonLabel} />
      </CardFooter>
    </Card>
  )
}

export default CardWrapper
