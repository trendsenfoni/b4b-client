"use client"

import { BreadcrumbAbi } from '@/components/breadcrumb'
import ButtonLink from '@/components/button-link'

export default function DefinesPage() {

  return (<>
    <BreadcrumbAbi list={[
      { href: '/inventory', children: "Stok" },
      { href: '/inventory/despaches', children: "Irsaliyeler" },
    ]} />
    <h1><i className="fa-solid fa-truck-arrow-right me-2"></i> Irsaliyeler</h1>
    <hr />
    <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mt-4'>

    </div>
  </>)
}