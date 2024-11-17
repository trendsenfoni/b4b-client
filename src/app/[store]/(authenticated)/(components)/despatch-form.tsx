"use client"
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { deleteItem, getItem, postItem, putItem } from '@/lib/fetch'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import CustomLink from '@/components/custom-link'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ItemType } from '@/types/ItemType'
import { ButtonConfirm } from '@/components/button-confirm'
import { BreadcrumbAbi } from '@/components/breadcrumb'
import { DespatchType } from '@/types/DespatchType'
import { ComboboxFirmList } from './combobox-firms'
import { AddressInputPanel } from './address-inputpanel'
import { DespatchInventoryLines } from './despatch-inventoryLines'
interface Props {
  despatchId?: string,
  ioType?: number | 0 | 1
}
export function DespatchForm({ despatchId, ioType }: Props) {
  const router = useRouter()
  const { toast } = useToast()
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [despatch, setDespatch] = useState<DespatchType>({
    ioType: ioType,
    issueDate: new Date().toISOString().substring(0, 10),
    issueTime: new Date().toISOString().split('T')[1].substring(0, 8),

  })

  const save = () => {
    if (!despatch._id) {
      postItem(`/db/despatches`, token, despatch)
        .then(result => {
          toast({ description: 'Kayit basarili' })
          // setTimeout(() => router.back(), 1000)
          setDespatch(result as DespatchType)
        })
        .catch(err => toast({ title: 'Error', description: err, variant: 'destructive' }))
    } else {
      putItem(`/db/despatches/${despatch._id}`, token, despatch)
        .then(result => {
          toast({ description: 'Kayit basarili' })
          // setTimeout(() => router.back(), 1000)
          setDespatch(result as DespatchType)
        })
        .catch(err => toast({ title: 'Error', description: err, variant: 'destructive' }))
    }
  }

  useEffect(() => { !token && setToken(Cookies.get('token') || '') }, [])
  useEffect(() => {
    if (token) {
      if (despatchId != 'addnew') {
        setLoading(true)
        getItem(`/db/despatches/${despatchId}`, token)
          .then(result => {
            console.log(result as DespatchType)
            setDespatch(result as DespatchType)
          })
          .catch(err => toast({ title: 'Error', description: err || '', variant: 'destructive' }))
          .finally(() => setLoading(false))
      }
    }
  }, [token])
  return (<>
    {!loading &&
      <div className="">

        <div className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className=''>
              <Label>{despatch.ioType == 0 ? 'Müşteri' : 'Tedarikçi'}</Label>
              <ComboboxFirmList width='w-[300px]' type={despatch.ioType == 0 ? 'customer' : 'vendor'} defaultValue={despatch.firm} onChange={e => {
                setDespatch({ ...despatch, firm: e })
              }} />
            </div>
            <div className=''>
              <Label>Evrak No</Label>
              <Input defaultValue={despatch.documentNumber} onChange={e => setDespatch({ ...despatch, documentNumber: e.target.value })} />
            </div>
            <div className='11w-40'>
              <Label>Tarih</Label>
              <div className='flex gap-2'>
                <Input type='date' defaultValue={despatch.issueDate} onChange={e => setDespatch({ ...despatch, issueDate: e.target.value })} />
                <Input type='time' defaultValue={despatch.issueTime} onChange={e => setDespatch({ ...despatch, issueTime: e.target.value })} />
              </div>

            </div>
          </div>
          <div>
            <AddressInputPanel defaultValue={despatch.address} onChange={e => setDespatch({ ...despatch, address: e })} />
          </div>
          <div className='border border-dashed rounded-md p-2'>
            <DespatchInventoryLines despatch={despatch} />
          </div>
        </div >
        <div className='w-full flex flex-row justify-between gap-4 mt-4'>
          <div>
            {despatchId != 'addnew' &&
              <ButtonConfirm
                text='Kayıt silinsin mi?'
                description={`${despatch && despatch.documentNumber}`}
                onOk={() => {
                  deleteItem(`/db/despatches/${despatchId}`, token)
                    .then(result => {
                      toast({ description: 'Kayıt silindi' })
                      setTimeout(() => router.back(), 1000)
                    })
                    .catch(err => toast({ title: 'Error', description: err, variant: 'destructive' }))
                }}>
                <div className='bg-red-600 text-white px-4 py-2 rounded-md'>
                  <i className='fa-solid fa-trash-alt'></i>
                </div>
              </ButtonConfirm>
            }
          </div>
          <div className='w-full flex flex-row justify-end gap-4 mt-4'>
            <Button className="text-2xl" variant={'secondary'} onClick={() => router.back()}><i className="fa-solid fa-angle-left"></i></Button>
            <Button className="text-2xl" onClick={save}><i className="fa-solid fa-cloud-arrow-up"></i></Button>
          </div>
        </div>
      </div>
    }
  </>)
}

