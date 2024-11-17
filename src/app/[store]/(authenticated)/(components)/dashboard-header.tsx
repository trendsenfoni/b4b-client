// "use client"

import { ThemeToggleButton } from '@/components/theme-toggle-button'
import { HeaderLogo2 } from '@/components/logo'
import CustomLink from '@/components/custom-link'
import { Input } from "@/components/ui/input"
import DashboardUserMenu from './dashboard-user-menu'
import { FC } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface Props {
  store: string
}
export function DashboardHeader({ store }: Props) {
  return (
    <header className="flex h-16 items-center justify-between bord11er-b bg-white px-0 md:px-2 dark:border-gray-800 dark:bg-gray-950"    >
      <div className="flex flex-row items-center gap-4">
        <CustomLink className="min-w-32" href={`/${store}/home`}>
          <HeaderLogo2 className='' logoHref={store ? `${process.env.NEXT_PUBLIC_API_URI}/pub/stores/${store}/logo` : ''} />
        </CustomLink>
        <nav className=" hidden gap-4 text-sm font-medium md:flex">
          <CustomLink className="rounded-md px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800" href={`/${store}/home`}>
            <i className="fa-solid fa-house-chimney-window me-2 text-lg text-primary"></i>
            Ana Sayfa
          </CustomLink>
          <CustomLink className="rounded-md px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800" href={`/${store}/shopping`}>
            <i className="fa-solid fa-boxes-stacked me-2 text-lg text-primary"></i>
            Ürünler
          </CustomLink>
          <CustomLink className="rounded-md px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800" href={`/${store}/orders`}>
            <i className="fa-solid fa-dragon me-2 text-lg text-primary"></i>
            Siparişler
          </CustomLink>
          <CustomLink className="rounded-md px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800" href={`/${store}/accounting`}>
            <i className="fa-solid fa-file-invoice me-2 text-lg text-primary"></i>
            Cari
          </CustomLink>


        </nav>
      </div>
      <div className="flex items-center gap-2">
        <DashboardUserMenu store={store} />
        <div className='flex md:hidden'><MobileMenu store={store} /></div>

      </div>
    </header>
  )
}

function MobileMenu({ store }: { store: string }) {
  return (<>
    <DropdownMenu >
      <DropdownMenuTrigger asChild  >
        <Button className="rounded-full border border-gray-200 w-12 h-12 dark:border-gray-800"
          size="icon"
          variant="ghost"
        >
          <i className="fa-solid fa-bars"></i>
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" >
        <DropdownMenuItem>
          <CustomLink className="rounded-md  py-2 hover:bg-gray-100 dark:hover:bg-gray-800" href={`/${store}/home`}>
            <i className="fa-solid fa-house-chimney-window me-2 text-lg text-primary"></i>
            Ana Sayfa
          </CustomLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CustomLink className="rounded-md  py-2 hover:bg-gray-100 dark:hover:bg-gray-800" href={`/${store}/shopping`}>
            <i className="fa-solid fa-dolly me-2 text-lg text-primary"></i>
            Ürünler
          </CustomLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CustomLink className="rounded-md  py-2 hover:bg-gray-100 dark:hover:bg-gray-800" href={`/${store}/orders`}>
            <i className="fa-solid fa-dragon me-2 text-lg text-primary"></i>
            Siparişler
          </CustomLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CustomLink className="rounded-md py-2 hover:bg-gray-100 dark:hover:bg-gray-800" href={`/${store}/accounting`}>
            <i className="fa-solid fa-file-invoice me-2 text-lg text-primary"></i>
            Cari
          </CustomLink>
        </DropdownMenuItem>

        {/* <DropdownMenuSeparator /> */}
        {/* <DropdownMenuItem >
          <Link href="/settings" className='flex items-center'>
            <i className='fa-solid fa-gears me-2 text-lg'></i>
            Ayarlar
          </Link>
        </DropdownMenuItem> */}

      </DropdownMenuContent>
    </DropdownMenu >
  </>)
}