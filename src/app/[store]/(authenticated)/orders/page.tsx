"use client"
import { BreadcrumbAbi } from '@/components/breadcrumb'

interface Props {
  params: {
    store: string
  }
}
export default function OrdersPage({ params }: Props) {

  return (<>
    <BreadcrumbAbi store={params.store} list={[
      { href: `/orders`, children: "Siparişler" },
    ]} />
    <h1 ><i className="fa-solid fa-dragon me-2"></i> Siparişler</h1>
    <hr />

  </>)
}