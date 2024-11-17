"use client"

import { BreadcrumbAbi } from '@/components/breadcrumb'
import ButtonLink from '@/components/button-link'

export default function DefinesPage() {

  return (<>
    <BreadcrumbAbi list={[
      { href: '/inventory', children: "Stok" },
    ]} />
    <h1 ><i className="fa-solid fa-boxes-stacked me-2"></i> Stok</h1>
    <hr />
    <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mt-4'>
      <ButtonLink href='/inventory/despatches'><i className="fa-solid fa-truck-arrow-right"></i> Irsaliyeler</ButtonLink>

    </div>
  </>)
}