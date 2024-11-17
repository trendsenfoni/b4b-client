"use client"
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { MemberType } from '@/types/MemberType'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { getItem, putItem } from '@/lib/fetch'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import CustomLink from '@/components/custom-link'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
interface Props {
  params: {
    id?: string
  }
}
export default function PageEdit({ params }: Props) {
  const router = useRouter()
  const { toast } = useToast()
  const [token, settoken] = useState('')
  const [member, setMember] = useState<MemberType>({})


  const save = () => {
    putItem(`/members/${params.id}`, token, member)
      .then(result => {
        toast({ description: 'Kayit basarili' })
        setTimeout(() => router.push('/members'), 1000)
      })
      .catch(err => toast({ title: 'Error', description: err, variant: 'destructive' }))
  }

  useEffect(() => { !token && settoken(Cookies.get('token') || '') }, [])
  useEffect(() => {
    if (token) {
      getItem(`/members/${params.id}`, token)
        .then(result => setMember(result as MemberType))
        .catch(err => toast({ title: 'Error', description: err || '', variant: 'destructive' }))
    }
  }, [token])
  return (<div>
    <div className="w-fu11ll m11ax-w-3xl mx-auto py-8 px-0 md:px-6">
      <div className="flex items-center gap-4 mb-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src={member.image || '/placeholder-user.jpg'} alt="@shadcn" />
          <AvatarFallback>{member.fullName}</AvatarFallback>
        </Avatar>
        <div>
          <div className='flex flex-row gap-2'>
            <Input className="text-2xl font-bold" placeholder='First Name'
              defaultValue={member.firstName} onChange={e => setMember({ ...member, firstName: e.target.value })} />
            <Input className="text-2xl font-bold" placeholder='Last Name'
              defaultValue={member.lastName} onChange={e => setMember({ ...member, lastName: e.target.value })} />
          </div>

          <Input defaultValue={member.title} placeholder='Title'
            onChange={e => setMember({ ...member, title: e.target.value })} />
        </div>
      </div>
      <div className="grid gap-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className=''>
            <Label>Email</Label>
            <Input type='email' defaultValue={member.email} onChange={e => setMember({ ...member, email: e.target.value })} />
          </div>
          <div className=''>
            <Label>Password</Label>
            <Input defaultValue={member.password} onChange={e => setMember({ ...member, password: e.target.value })} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className=''>
            <Label>Phone Number</Label>
            <Input type='tel' defaultValue={member.phoneNumber} onChange={e => setMember({ ...member, phoneNumber: e.target.value })} />
          </div>
          <div className=''>
            <Label>Location</Label>
            <Input defaultValue={member.location} onChange={e => setMember({ ...member, location: e.target.value })} />
          </div>
        </div>
        <div>
          <Label>About</Label>
          <p className="text-muted-foreground">
            <Textarea defaultValue={member.bio} onChange={e => setMember({ ...member, bio: e.target.value })} />
          </p>
        </div>

      </div >
      <div className='w-full flex flex-row justify-end gap-4 mt-4'>
        <Button className="text-2xl" variant={'secondary'} onClick={() => router.back()}><i className="fa-solid fa-angle-left"></i>       </Button>
        <Button className="text-2xl" onClick={save}><i className="fa-solid fa-cloud-arrow-up"></i>        </Button>
      </div>
    </div>

  </div>)
}