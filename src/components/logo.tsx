"use client"

import { Skeleton } from "@/components/ui/skeleton"


interface Props {
  className?: string
  logoHref?: string

}
export const HeaderLogo2 = ({
  className,
  logoHref,
}: Props) => {
  return (
    <div className={`flex flex-row te11xt-2xl max-h-7 mt-1   ${className}`} suppressHydrationWarning>
      {logoHref && <img className='aspect-auto max-h-7' src={logoHref} alt={'logo'} />}
      {!logoHref && <Skeleton className="h-7 w-32" />}
    </div>
  )
}