"use client"

import { ButtonBack, RowButtonAddNew } from '@/components/row-buttons'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useToast } from '@/components/ui/use-toast'
import { postItem } from '@/lib/fetch'
import { moneyFormat } from '@/lib/utils'
import { ItemType } from '@/types/ItemType'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
interface Props {
  store: string
  item: ItemType
  onAddToCart?: (quantity: number) => void
}
export function AddToCart({ store, item, onAddToCart }: Props) {
  const [quantity, setQuantity] = useState(1)
  const [total, setTotal] = useState(1 * item.price!)
  const [netTotal, setNetTotal] = useState(1 * item.price! + item.price! * item.vatRate! / 100)

  const [token, settoken] = useState('')
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const saveToCart = () => {
    return new Promise<void>((resolve, reject) => {
      setLoading(true)
      postItem(`/${store}/carts`, token, { item: item, quantity: quantity })
        .then(result => {
          setLoading(false)
        })
        .catch(err => {
          setLoading(false)
          toast({ title: 'Error', description: err || '', variant: 'destructive' })
          reject(err)
        })

    })
  }

  useEffect(() => { !token && settoken(Cookies.get('token') || '') }, [])
  // useEffect(() => { token && load() }, [token, search])


  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className='bg-orange-600 text-white px-3 py-1'>
          <i className="fa-solid fa-cart-plus"></i>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sepete Ekle</SheetTitle>
          <SheetDescription className='flex flex-col items-start text-foreground'>
            <span>{item.name}</span>
            <span className='text-sm text-muted-foreground' >{item.code}</span>
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <ItemDetail caption='Fiyat' value={item.price!} />
          <ItemDetail caption='Kdv%' value={item.vatRate!} />
          <div className="grid grid-cols-4 items-center gap-2">
            <Label className="text-right">
              Miktar
            </Label>
            <Input className="col-span-3 text-right border-primary-foreground"
              type='number'
              min={1}
              onFocus={e => e.target.select()}
              defaultValue={quantity}
              onChange={e => {
                let val = isNaN(Number(e.target.value)) ? 1 : Number(e.target.value)
                setQuantity(val)
                setTotal(Math.round(100 * val * item.price!) / 100)
                setNetTotal(Math.round(100 * (val * item.price! + val * item.price! * item.vatRate! / 100)) / 100)
              }}
            />
          </div>
          <ItemDetail caption='Vergisiz' value={moneyFormat(total)} />
          <ItemDetail caption='NetTutar' value={moneyFormat(netTotal)} />

        </div>
        <SheetFooter>
          <div className='flex justify-between w-full mt-4'>
            <SheetClose asChild>
              <Button variant={'outline'} ><i className='fa-solid fa-chevron-left'></i></Button>
            </SheetClose>
            <SheetClose asChild onClick={() => onAddToCart && onAddToCart(quantity)}>
              <Button onClick={() => {
                saveToCart()
                  .then(result => {
                  })
                  .catch(err => toast({ title: 'Error', description: err || '', variant: 'destructive' }))
              }}>
                Ekle
              </Button>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

function ItemDetail({ caption, value }: { caption: string, value: any }) {
  return (
    <div className="grid grid-cols-4 items-center gap-2 text-muted-foreground">
      <Label className="text-right">
        {caption}
      </Label>
      <div className='col-span-3 border border-dashed rounded-sm text-right p-1'>{value}</div>
    </div>
  )
}