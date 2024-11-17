import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "@/styles/globals.css"
// import LayoutClientSide from './layout-client'
import { ThemeProvider } from '@/components/theme-provider'

import { RedirectType, redirect } from 'next/navigation'
import { Suspense } from 'react'
import { Toaster } from "@/components/ui/toaster"
import { cookies } from 'next/headers'
import { StoreType } from '@/types/StoreType'


const inter = Inter({ subsets: ["latin"] })
export const viewport: Viewport = {
  themeColor: [{ media: '(prefers-color-scheme: dark)', color: '#fff' }],
  initialScale: 1,
  width: 'device-width',
  minimumScale: 1,
  maximumScale: 1,
  viewportFit: 'contain',
  userScalable: false,
  interactiveWidget: 'overlays-content'
}
export const metadata: Metadata = {
  // title: process.env.NEXT_PUBLIC_APP_TITLE || 'ENV ERROR',
  // description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'ENV ERROR',
  // icons: '/img/icon512.png',
  // manifest: '/manifest.json'
}

interface Props {
  children: React.ReactNode,

}

const RootLayout = async ({ children }: Props) => {
  const cookieStore = cookies()
  const store: StoreType = JSON.parse(cookieStore.get('store')?.value || '{}')

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {store.name && <title>{store.name}</title>}
        {store.description && <meta name="description" content={store.description} />}
        {store.identifier && <>
          <link rel="icon" href={`${process.env.NEXT_PUBLIC_API_URI}/pub/stores/${store.identifier}/icon`} type="image/png" />
          <link rel="manifest" href={`${process.env.NEXT_PUBLIC_API_URI}/pub/stores/${store.identifier}/manifest`} />
        </>}
      </head>
      <body className={inter.className} suppressHydrationWarning >
        {/* <LayoutClientSide /> */}

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange

        >
          <Suspense >

            {children}
            <Toaster />
          </Suspense>
        </ThemeProvider>

      </body>
    </html>
  )
}

export default RootLayout