"use client"
import { BreadcrumbAbi } from '@/components/breadcrumb'
import { CashFlowList } from './cashFlow-list'

interface Props {
  params: {
    store: string
  }
}
export default function OrdersPage({ params }: Props) {

  return (<>
    <div className='flex justify-between'>
      <BreadcrumbAbi store={params.store} list={[
        { href: `/cashFlow`, children: "Cari Hareketler" },
      ]} />

    </div>
    <CashFlowList store={params.store} />
  </>)
}