import Link from 'next/link'
import { SignInEmail } from './signin-email'
import { SignInPhoneNumber } from './signin-phoneNumber'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

interface Props {
  params: {
    store: string
  }
}
export default function LoginPage({ params }: Props) {
  return (<div className='relative flex-1 w-full h-screen max-h-full items-center justify-center'>
    <div className='absolute top-[calc(50%-225px)] start-[calc(50%-175px)] flex flex-col gap-4'>
      <h1 className='text-2xl self-center'>Giriş</h1>
      {/* <div className='rounded-lg border border-dashed border-opacity-50 border-slate-400 p-4 space-y-4  w-[350px] h-[250px] flex flex-col'> */}
      <Tabs defaultValue="phoneNumber" className="w-[350px] h-[250px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="phoneNumber">Telefon</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
        </TabsList>
        <TabsContent value="phoneNumber" className='rounded-lg h-full border border-dashed border-opacity-50 border-slate-400 p-4'>
          <SignInPhoneNumber store={params.store} />
        </TabsContent>
        <TabsContent value="email" className='rounded-lg h-full border border-dashed border-opacity-50 border-slate-400 p-4'>
          <SignInEmail store={params.store} />
        </TabsContent>
      </Tabs>
      {/* </div> */}
    </div>
    <Link href="https://trendsenfoni.com" target='_blank' className='absolute bottom-0 left-2 text-right text-xs text-gray-500 hover:text-blue-600'>
      ©2014-{new Date().getFullYear()} {process.env.NEXT_PUBLIC_APP_COMPANY_NAME || 'TrendSenfoni'}
    </Link>
  </div>)
}
