"use client"

import Link from 'next/link'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { StoreType } from '@/types/StoreType'
export type IconProps = React.HTMLAttributes<SVGElement> & { width?: number, height?: number }

interface Props {
  className?: string
  logoHref?: string

}
export const HeaderLogo2 = ({
  className,
  logoHref,
}: Props) => {
  return (
    <div className={`flex flex-row te11xt-2xl max-h-6 mt-1   ${className}`} suppressHydrationWarning>
      <img className='aspect-auto max-h-6' src={logoHref || '/img/logo.png'} alt={'logo'} />
    </div>
  )
}