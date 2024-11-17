import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { InventoryType } from '@/types/InventoryType'
import { DespatchType } from '@/types/DespatchType'
import { getItem } from '@/lib/fetch'
import { ComboboxItemList } from './combobox-items'
import { moneyFormat } from '@/lib/utils'

interface Props {
  className?: string
  text?: string
  defaultValue: InventoryType
  despatch?: DespatchType
  children?: any
  onOk?: (value: InventoryType) => void
  onCancel?: () => void
}

export function DespatchInventoryLine({
  className,
  text,
  children,
  onOk,
  onCancel,
  defaultValue,
  despatch
}: Props) {
  const router = useRouter()
  const { toast } = useToast()
  const [inventory, setInventory] = useState<InventoryType>(defaultValue)


  return (
    <Card className="w-full max-w-4xl lg:max-w-6xl">
      <CardHeader className='p-1 px-4  bg-secondary'>
        <CardTitle className='text-base'>{inventory?._id ? 'Satır Düzenle' : 'Yeni Satır'}</CardTitle>
        {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
      </CardHeader>
      <CardContent className='flex flex-col gap-4 p-2'>
        {/* <div className=''> */}
        {/* <div className='grid grid-cols-1 md:grid-cols-4 gap-4'> */}
        <div className='flex flex-wrap gap-4'>
          <div className='min-w-[300px]'>
            <Label>Stok Kartı {inventory?.item?.name}</Label>
            <ComboboxItemList width='w-[300px]' defaultValue={inventory?.item} onChange={e => setInventory({ ...inventory, item: e })} />
          </div>
          <div>
            <Label>Miktar ({inventory?.item?.unit})</Label>
            <Input type='number' value={inventory?.quantity} readOnly />
          </div>
          <div>
            <Label>Ağırlık</Label>
            <Input type='number' defaultValue={inventory?.weight} onChange={e => {
              const val = isNaN(Number(e.target.value)) ? 0 : Number(e.target.value)
              setInventory({ ...inventory, weight: val })
              setInventory({ ...inventory, quantity: val / 1000 })
              // setInventory({ ...inventory, total: Math.round(100 * (val / 1000) * (inventory?.price || 0)) / 100 })
            }} />
          </div>
          <div>
            <Label>Fiyat</Label>
            <Input type='number' defaultValue={inventory?.price} onChange={e => {
              const val = isNaN(Number(e.target.value)) ? 0 : Number(e.target.value)
              setInventory({ ...inventory, price: val })
              setInventory({ ...inventory, total: Math.round(100 * val * (inventory?.quantity || 0)) / 100 })
            }} />
          </div>
          <div className='flex flex-col gap-2'>
            <Label>Tutar</Label>
            <Input className='text-right' readOnly value={moneyFormat(inventory?.total || 0, 2)} />
          </div>
        </div>

        {/* </div> */}
      </CardContent>
      <CardFooter className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => onCancel && onCancel()}><i className='fa-solid fa-xmark'></i></Button>
        <Button variant="default" onClick={() => {

          onOk && onOk(inventory)
        }} > <i className='fa-solid fa-check'></i></Button>
      </CardFooter>
    </Card >
  )
}