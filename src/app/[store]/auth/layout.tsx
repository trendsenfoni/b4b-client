import { HeaderLogo2 } from '@/components/logo'
import ThemeToggleButton from '@/components/theme-toggle-button'
import { StoreType } from '@/types/StoreType'
import { cookies } from 'next/headers'
import Link from 'next/link'

interface AuthLayoutProps {
  children?: any,
  params: {
    store: string
  }
}

export default function AuthLayout({ children, params }: AuthLayoutProps) {
  // const cookieStore = cookies()
  // const logoHref = (JSON.parse(cookieStore.get('store')?.value || '{}') as StoreType).logo || ''
  // const logoHref = '/img/icon.png'
  return (<div className="container relative  h-screen flex-col justify-center px-4 py-4">
    <div className='absolute end-2 top-2'>
      <ThemeToggleButton />
    </div>
    <div className='absolute start-4 top-2'>
      <Link href={'/auth/login'}>
        <HeaderLogo2 className="h-16 w-30" logoHref={`${process.env.NEXT_PUBLIC_API_URI}/pub/stores/${params.store}/logo`} />
      </Link>
    </div>
    {children}
  </div>)
}







