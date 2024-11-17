import { FC } from 'react'
// import { Metadata } from "next"

// import Link from "next/link"

import { cookies } from 'next/headers'
import { RedirectType, redirect } from 'next/navigation'
import { DashboardHeader } from './(components)/dashboard-header'
import DashboardFooter from './(components)/dashboard-footer'
import { getAuthtoken } from '@/lib/authHelper'
import React from 'react'
import { StoreType } from '@/types/StoreType'
// import '@/styles/piechart-style.css'




export interface AppLayoutProps {
  children?: any
}
const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  const store: StoreType = JSON.parse(cookies().get('store')?.value || '{}')


  return (
    <div className="flex min-h-screen w-full flex-col px-2 dark:bg-[#030714] ">
      <DashboardHeader store={store.identifier || ''} />
      {/* <div className='my-2'></div> */}
      <div className="flex-1 md:border border-dashed border-opacity-25 rounded-md border-yellow-400 " style={{ overflowWrap: 'anywhere' }}>
        <div className='container mx-auto py-1 px-1 md:px-4 md:py-2'>
          {children}
        </div>
      </div>
      {/* <div className='my-2'></div> */}
      <DashboardFooter />
    </div>
  )

}

export default AppLayout