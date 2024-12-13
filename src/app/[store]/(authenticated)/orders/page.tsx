"use client"
import { BreadcrumbAbi } from '@/components/breadcrumb'
import { OrderList } from './order-list'

interface Props {
  params: {
    store: string
  }
}
export default function OrdersPage({ params }: Props) {

  return (<>
    <div className='flex justify-between'>
      <BreadcrumbAbi store={params.store} list={[
        { href: `/orders`, children: "Siparişler" },
      ]} />

    </div>
    <OrderList store={params.store} />
  </>)
}