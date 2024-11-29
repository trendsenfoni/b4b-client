"use client"

import { RowButtonAddNew } from '@/components/row-buttons'
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
import { moneyFormat } from '@/lib/utils'
import { ItemType } from '@/types/ItemType'
import { useState } from 'react'

interface Props {
  item: ItemType
  onAddToCart?: (quantity: number) => void
}
export function AddToCart({ item, onAddToCart }: Props) {
  const [quantity, setQuantity] = useState(1)
  const [total, setTotal] = useState(1 * item.price!)
  const [netTotal, setNetTotal] = useState(1 * item.price! + item.price! * item.vatRate! / 100)
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className='bg-primary px-3 py-1'><i className="fa-solid fa-square-plus"></i></Button>
        {/* <RowButtonAddNew onClick={() => null} /> */}
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
          <SheetClose asChild>
            <Button onClick={() => {
              onAddToCart && onAddToCart(quantity)
            }}>Ekle</Button>
          </SheetClose>
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