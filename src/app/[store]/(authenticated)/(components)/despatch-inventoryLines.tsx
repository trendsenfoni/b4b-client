"use client"
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { deleteItem, getItem, getList, postItem, putItem } from '@/lib/fetch'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import CustomLink from '@/components/custom-link'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ItemType } from '@/types/ItemType'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DespatchType } from '@/types/DespatchType'
import { ComboboxFirmList } from './combobox-firms'
import { AddressInputPanel } from './address-inputpanel'
import { InventoryType } from '@/types/InventoryType'
import { DespatchInventoryLine } from './despatch-inventoryLine'
import Link from 'next/link'
import { RowButtonAddNew, RowButtonEdit, RowButtonRemove } from '@/components/row-buttons'
interface Props {
  despatch?: DespatchType,
}
export function DespatchInventoryLines({ despatch }: Props) {
  const router = useRouter()
  const { toast } = useToast()
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [inventoryLines, setInventoryLines] = useState<InventoryType[]>([])
  const [lineIndex, setLineIndex] = useState(-99)
  const save = () => {
    // if (!despatch?._id) {
    //   postItem(`/db/inventory`, token, despatch)
    //     .then(result => {
    //       toast({ description: 'Kayit basarili' })
    //       // setTimeout(() => router.back(), 1000)
    //       setDespatch(result as DespatchType)
    //     })
    //     .catch(err => toast({ title: 'Error', description: err, variant: 'destructive' }))
    // } else {
    //   putItem(`/db/despatches/${despatch._id}`, token, despatch)
    //     .then(result => {
    //       toast({ description: 'Kayit basarili' })
    //       // setTimeout(() => router.back(), 1000)
    //       setDespatch(result as DespatchType)
    //     })
    //     .catch(err => toast({ title: 'Error', description: err, variant: 'destructive' }))
    // }
  }

  useEffect(() => { !token && setToken(Cookies.get('token') || '') }, [])
  useEffect(() => {
    if (token) {
      if (despatch?._id) {
        setLoading(true)
        getList(`/db/inventory?despatch=${despatch?._id}&pageSize=1000`, token)
          .then(result => {
            console.log('inventory lines:', result)
            setInventoryLines(result.docs as InventoryType[])
          })
          .catch(err => toast({ title: 'Error', description: err || '', variant: 'destructive' }))
          .finally(() => setLoading(false))
      }
    }
  }, [token])
  return (<>
    {!loading &&
      <div className="w-full">
        {lineIndex < -1 && <>
          <Table className='text-[10px] md:text-base'>
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader>
              <TableRow>
                <TableHead className='p-1' >Stok Kartı</TableHead>
                <TableHead className="text-right">Miktar</TableHead>
                <TableHead className='p-1'>Özellikler</TableHead>
                <TableHead className="text-right">Fiyat</TableHead>
                <TableHead className="text-center">#</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryLines.map((line, index) => (
                <TableRow key={line._id}>
                  <TableCell className="font-medium">{line.item?.name}</TableCell>
                  <TableCell className="text-right">{line.quantity} {line.item?.unit}</TableCell>
                  <TableCell>{line.item?.itemType?.name} {line.item?.itemQuality?.name}</TableCell>
                  <TableCell className="text-right">{line.price} {line.currency}</TableCell>
                  <TableCell className="flex justify-center gap-4">
                    <RowButtonEdit onClick={() => setLineIndex(index)} />
                    <RowButtonRemove onClick={() => {
                      if (confirm(`"${line.item?.name}" satır silinsin mi`)) {

                      }
                    }} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            {/* <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">
                  <Link href={'#'} onClick={() => setLineIndex(-1)}><i className="fa-solid fa-square-plus"></i></Link>
                </TableCell>
              </TableRow>
             
            </TableFooter> */}
          </Table>
          <div className='flex w-full justify-center my-4'>
            <RowButtonAddNew className='text-2xl px-4' onClick={() => setLineIndex(-1)} />
          </div>
        </>}
        {lineIndex >= 0 && <div className='flex justify-center'>
          <DespatchInventoryLine despatch={despatch} defaultValue={inventoryLines[lineIndex]} text='Satir Duzelt'
            onCancel={() => setLineIndex(-99)}
            onOk={e => {
              console.log('e:', e)
              setLoading(true)
              putItem(`/db/inventory/${e._id}`, token, e)
                .then(result => {
                  let dizi = inventoryLines

                  dizi[lineIndex] = result as InventoryType
                  setInventoryLines(dizi)
                  setLineIndex(-99)
                })
                .catch(err => toast({ title: 'Error', description: err || 'Error', variant: 'destructive' }))
                .finally(() => setLoading(false))
            }}
          />
        </div>}
        {lineIndex == -1 && <div className='flex justify-center'>
          <DespatchInventoryLine despatch={despatch} defaultValue={{ despatch: despatch }} text='Satir Duzelt'
            onCancel={() => setLineIndex(-99)}
            onOk={e => {
              setLoading(true)
              postItem(`/db/inventory`, token, e)
                .then(result => {
                  inventoryLines.push(result as InventoryType)
                  setInventoryLines(inventoryLines)
                  setLineIndex(-99)
                })
                .catch(err => toast({ title: 'Error', description: err || 'Error', variant: 'destructive' }))
                .finally(() => setLoading(false))
            }}
          />
        </div>}
      </div>
    }
  </>)
}

