"use client"

import React, { useEffect, useState } from "react"
// import { SessionProvider, useSession } from "next-auth/react"
import { RedirectType, redirect, usePathname, useRouter } from "next/navigation"
import { eventLog, consoleLogWelcomeMsg } from '@/lib/log'
import Cookies from 'js-cookie'
import { v4 } from 'uuid'
import { getItem } from '@/lib/fetch'
import { StoreType } from '@/types/StoreType'
import { useToast } from '@/components/ui/use-toast'
interface Props {
  store: string
}
const LayoutClientSide = ({ store }: Props) => {
  const router = useRouter()
  const pathName = usePathname()
  const [deviceId, setDeviceId] = useState(Cookies.get('deviceId') || '')
  const [storeVal, setStoreVal] = useState(Cookies.get('store') || '')
  const { toast } = useToast()

  if (!deviceId) {
    const newDeviceId = v4()
    setDeviceId(newDeviceId)
    Cookies.set('deviceId', newDeviceId)
  }

  const checkToken = () => {
    if (Cookies.get('token') && (pathName.startsWith(`/${store}/auth`) || pathName == `/${store}` || pathName == `/${store}/`)) {
      router.push(`/${store}/home`)
    } else if (!Cookies.get('token') && !pathName.startsWith('/auth')) {
      router.push(`/${store}/auth/login`)
    }
  }

  useEffect(() => {
    if (!storeVal) {
      getItem(`/pub/stores/${store}`, '')
        .then(result => {
          Cookies.set('store',
            JSON.stringify(result as StoreType),
            {
              secure: true,
              path: `/${store}`,
              //TODO 5 dakika yerine bir kac saate cikartalim
              expires: new Date(new Date().setMinutes(new Date().getMinutes() + 5))
            }
          )
          location.reload()
          // checkToken()
        })
        .catch(err => {
          toast({ title: 'Error', description: err, variant: 'destructive' })
          setTimeout(() => router.push(`/store-not-found?error=${err}`), 1000)
        })

    } else {
      checkToken()
    }

  }, [])

  return (<></>)
}


export default LayoutClientSide
