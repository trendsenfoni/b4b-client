"use client"
// import type { Metadata } from "next"
import Link from 'next/link'
// import {redirect, useRouter} from 'next/navigation'
// export const metadata: Metadata = {
// title: 'Page Not Found - AliAbi-org',
// description: 'TODO: description eklenecek. Excepteur fugiat labore labore enim aliqua deserunt aliqua amet.',
// icons: '/img/webicon.png',
// }
import { useRouter } from 'next/navigation'
const Page404 = () => {
  const router = useRouter()

  return (
    <div className='rel11ative w-full h-screen flex justify-center items-center'>
      <div className='grid grid-cols-1 gap-4'>
        <h2 className='text-2xl'>Error 404 - Sayfa Bulunamadı.</h2>
        <Link className="bg-primary px-3 py-3 text-white rounded-md shrink" href="#" onClick={() => router.back()} title="Geri" >Geri</Link>
      </div>
    </div>)

}

export default Page404