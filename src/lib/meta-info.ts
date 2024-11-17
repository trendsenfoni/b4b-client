import { Metadata } from 'next/types'
import { cookies } from 'next/headers'
import { StoreType } from '@/types/StoreType'

export default function pageMeta(title: string, description?: string) {
  try {
    const cookieStore = cookies()
    if (cookieStore.get('store')?.value) {
      const store = JSON.parse(cookieStore.get('store')?.value || '{}') as StoreType
      let storeTitle = ''
      const metadata: Metadata = {
        title: `${title} ${storeTitle}`,
        description: `${description || process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'ENV Error'}`,
        //   // icons: '/img/icon512.png',
        //   // manifest: '/manifest.json'
      }
      return metadata
    } else {
      const metadata: Metadata = {
        title: ``,
        description: ``,
        icons: '',
        manifest: ''
      }
      return metadata
    }

  } catch (err: any) {
    const metadata: Metadata = {
      title: err.name || err || '',
      description: ``,
      icons: '/img/icon.png',

    }
    return metadata
  }

}

