"use client"
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
import { postItem } from '@/lib/fetch'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { useToast } from "@/components/ui/use-toast"
import { Label } from '@/components/ui/label'

interface Props {

  className?: string
  children?: any
  variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined
  store: string
}
export function SignInEmail({
  // provider,
  className,
  children,
  variant,
  store
}: Props) {
  const router = useRouter()
  const { toast } = useToast()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const loginWithEmailPassword = () => {
    const deviceId = Cookies.get('deviceId')
    postItem('/auth/login', '', { email: email, password: password, deviceId: deviceId })
      .then(result => {
        console.log('EMailPasswordSignIn result:', result)
        Cookies.set('token', result.token, { secure: true })
        Cookies.set('user', JSON.stringify(result.user), { secure: true })
        // Cookies.set('dbList', JSON.stringify(result.dbList || []), { secure: true })
        // Cookies.set('db', result.db || '', { secure: true })
        // Cookies.set('firm', result.firm || '', { secure: true })
        // Cookies.set('period', result.period || '', { secure: true })
        Cookies.set('lang', result.lang || 'tr', { secure: true })

        router.push('/home')

      })
      .catch(err => {
        toast({ title: 'Error', description: err, variant: 'destructive', duration: 1000 })
        console.log('Hata:', err)
      })
  }


  return (
    <div className='flex flex-col gap-2' >
      <div className={`grid grid-cols-12 gap-1 w-full mb-2 ${className}`}>
        <div className="relative col-span-12">
          <Input
            className='ps-2'
            type='email'
            placeholder='Kullanıcı adı veya Email'
            onChange={e => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className={`flex flex-row gap-2 w-full ${className}`}>
        <Input
          className='ps-2'
          type='password'
          placeholder='Şifre'
          onChange={e => setPassword(e.target.value)}
        />
        <Button className={`w-14`} variant={variant || 'default'}
          onClick={loginWithEmailPassword}
        >
          <i className="text-xl fa-solid fa-right-to-bracket"></i>
        </Button>
      </div>
    </div>
  )
}
