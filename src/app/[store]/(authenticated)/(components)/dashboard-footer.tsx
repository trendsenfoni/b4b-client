"use client"

import Link from 'next/link'

// import { DatabaseSelect } from './database-selection'
export const DashboardFooter = (props: any) => {

  return (
    <footer
      className="flex items-center justify-between bord11er-t bg-white px-2 py-2 dark:border-gray-800 dark:bg-gray-950 "
      {...props}
    >
      <Link href="https://trendsenfoni.com" target='_blank' className=' text-right text-xs text-gray-500 hover:text-blue-600'>
        ©2014-{new Date().getFullYear()} {process.env.NEXT_PUBLIC_APP_COMPANY_NAME || 'TrendSenfoni'}
      </Link>
      <div className='flex items-center gap-2'>
        {/* <DatabaseSelect /> */}
      </div>
    </footer>
  )
}

export default DashboardFooter