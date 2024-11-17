"use client"
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
import { postItem } from '@/lib/fetch'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { useToast } from "@/components/ui/use-toast"
import { Label } from '@/components/ui/label'
import ButtonLink from '@/components/button-link'
import { InputOTPBox } from '@/components/input-otp'

interface Props {
  // email?: string,
  className?: string,
  children?: any
  variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined,
  store: string
}
export function SignInPhoneNumber({
  // provider,
  className,
  children,
  variant,
  store
}: Props) {
  const router = useRouter()
  const { toast } = useToast()
  const [phoneNumber, setPhoneNumber] = useState('5533521042')  //TODO telefon silinecek
  const [taxNumber, setTaxNumber] = useState('20756266352') //TODO TCKN silinecek
  const [step, setStep] = useState(1)
  const [authCode, setAuthCode] = useState('')
  const loginWithPhoneNumber = () => {
    const deviceId = Cookies.get('deviceId')
    postItem(`/${store}/auth/login`, '', { taxNumber: taxNumber, phoneNumber: phoneNumber, deviceId: deviceId })
      .then(result => {
        console.log(result)
        setStep(2)
      })
      .catch(err => {
        toast({ title: 'Error', description: err, variant: 'destructive', duration: 1000 })
        console.log('Hata:', err)
      })
  }

  const verifyWithPhoneNumber = () => {

    postItem(`/${store}/auth/verify`, '', { phoneNumber: phoneNumber, authCode: authCode })
      .then(result => {
        console.log(result)
        Cookies.set('token', result.token, { secure: true, path: `/${store}` })
        Cookies.set('user', JSON.stringify(result.user), { secure: true, path: `/${store}` })
        Cookies.set('lang', result.lang || 'tr', { secure: true, path: `/${store}` })

        router.push(`/${store}/home`)

      })
      .catch(err => {
        toast({ title: 'Error', description: err, variant: 'destructive', duration: 1000 })
        console.log('Hata:', err)
      })
  }


  return (<>
    {step == 1 &&
      <div className='flex flex-col gap-2' >
        <div className={`grid grid-cols-12 gap-1 w-full mb-2 ${className}`}>
          <div className="relative col-span-12 flex flex-col gap-2">
            <Label>Telefon Numarasi</Label>
            <Input type='tel' className='ps-2' placeholder='5XXXXXXXXX'
              min={10}
              defaultValue={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
            />
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <Label>Vergi No veya TC Kimlik No</Label>
          <div className={`flex flex-row gap-2 w-full ${className}`}>
            <Input type='number' className='ps-2' placeholder='Vkn/Tckn'
              max={11} min={10}
              defaultValue={taxNumber}
              onChange={e => setTaxNumber(e.target.value)}
            />
            <Button className={`w-14`} variant={variant || 'default'}
              onClick={loginWithPhoneNumber}
            >
              <i className="text-xl fa-solid fa-right-to-bracket"></i>
            </Button>
          </div>

        </div>
      </div>
    }
    {step == 2 &&
      <div className='flex flex-col gap-4' >
        <div className='flex flex-col items-center gap-4'>
          <div className='flex flex-col items-center gap-2'>
            <Label className='text-xl'>Onay Kodu</Label>
            <Label className='text-lg text-primary'>{phoneNumber}</Label>
          </div>
          <InputOTPBox onChange={e => setAuthCode(e)} />
        </div>
        <div className='flex justify-end gap-4 mt-4'>
          <Button variant={'outline'} onClick={() => setStep(1)} ><i className='fa-solid fa-chevron-left'></i></Button>
          <Button disabled={authCode.length < 6} variant={'default'} onClick={verifyWithPhoneNumber} ><i className='fa-solid fa-check'></i></Button>
        </div>
      </div>
    }
  </>)
}
