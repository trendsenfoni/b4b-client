"use client"
import { BreadcrumbAbi } from '@/components/breadcrumb'

import Cookies from 'js-cookie'
import { ItemList } from './item-list'
interface Props {
  params: {
    store: string
  }
}
export default function ShoppingPage({ params }: Props) {

  return (<>
    <BreadcrumbAbi store={params.store} list={[
      { href: `/shopping`, children: "Ürünler" },
    ]} />
    {/* <h1 ><i className="fa-solid fa-boxes-stacked me-2"></i> Ürünler</h1>
    <hr /> */}
    <ItemList store={params.store} />
  </>)
}