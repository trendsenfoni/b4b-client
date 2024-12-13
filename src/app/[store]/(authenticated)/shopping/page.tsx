"use client"
import { BreadcrumbAbi } from '@/components/breadcrumb'

import Cookies from 'js-cookie'
import { ItemList } from './item-list'
import { SheetPanel } from './sheet-panel'
import { ShoppingCart } from './shopping-cart'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { getItem } from '@/lib/fetch'
interface Props {
  params: {
    store: string
  }
}
export default function ShoppingPage({ params }: Props) {
  const [loading, setLoading] = useState(false)

  return (<>
    <div className='flex justify-between'>
      <BreadcrumbAbi store={params.store} list={[
        { href: `/shopping`, children: "Ürünler" },
      ]} />
      <div className='h-8'>
        {!loading && <ShoppingCart store={params.store} />}

      </div>
    </div>
    <ItemList store={params.store} onCartChange={() => {
      setLoading(true)
      setTimeout(() => setLoading(false))
    }} />
  </>)
}