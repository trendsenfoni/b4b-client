"use client"

import { useEffect, useRef, useState } from 'react'
import Cookies from 'js-cookie'
import { useToast } from '@/components/ui/use-toast'
import { getItem } from '@/lib/fetch'
import { OrderLineType, OrderType } from '@/types/OrderType'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { AddToCart } from '../../shopping/add-to-cart'
import { CollapsePanel } from '@/components/collapse-panel'
import { Textarea } from '@/components/ui/textarea'
import { moneyFormat } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useReactToPrint } from 'react-to-print'
interface Props {
  params: {
    orderId: string
    store: string
  }
}
export default function ViewOrderPage({ params }: Props) {
  const [token, settoken] = useState('')
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState<OrderType>()
  const contentRef = useRef<HTMLDivElement>(null)
  const reactToPrintFn = useReactToPrint({ contentRef })

  const load = () => {
    setLoading(true)
    getItem(`/${params.store}/orders/${params.orderId}`, token)
      .then(result => {
        setOrder(result as OrderType)
      })
      .catch(err => toast({ title: 'Error', description: err || '', variant: 'destructive' }))
      .finally(() => setLoading(false))
  }

  useEffect(() => { !token && settoken(Cookies.get('token') || '') }, [])
  useEffect(() => { token && load() }, [token])

  return (<div ref={contentRef} className='flex flex-col gap-2 print:p-14'>
    {!loading && order && <div>
      <div className='grid grid-cols-1 md:grid-cols-4'>
        <div>
          <Label>Tarih {order.issueDate}</Label>
          <Input type='date' className='w-26 h-7' readOnly defaultValue={order.issueDate} pattern='yyyy-mm-dd' />
        </div>
        <div>
          <Label>Sipariş No</Label>
          <Input className='h-7' readOnly defaultValue={order.documentNumber || order._id} />
        </div>
        <div></div>
        <div className='text-right print:hidden'>
          <Button variant={'outline'} onClick={() => reactToPrintFn()}><i className="fa-solid fa-print"></i></Button>
        </div>
      </div>

      <OrderLines className='mt-2' lines={order.lines} loading={loading} store={params.store} currency={order.currency} />
      <div className='grid grid-cols-1 md:grid-cols-2  gap-4 mt-4'>
        <div className='grid grid-cols-1 gap-2 md:order-2 border border-dashed p-2 rounded'>
          <div className='grid grid-cols-2 gap-2 text-right'>
            <Label>Tutar</Label>
            <Label>{moneyFormat(order.totalAmount)} <span className='text-[80%] text-muted-foreground'>{order.currency}</span></Label>
          </div>
          <div className='grid grid-cols-2 gap-2 text-right'>
            <Label>Vergi</Label>
            <Label>{moneyFormat(order.taxAmount)} <span className='text-[80%] text-muted-foreground'>{order.currency}</span></Label>
          </div>
          <div className='grid grid-cols-2 gap-2 text-right'>
            <Label>Net Tutar</Label>
            <Label>{moneyFormat(order.taxInclusiveAmount)} <span className='text-[80%] text-muted-foreground'>{order.currency}</span></Label>
          </div>
        </div>
        <div className='md:order-1 border border-dashed p-2 rounded w-full'>
          <Label className='border-b w-full'>Sipariş Notu</Label>
          <div className='min-h-16'>{order.description}</div>
        </div>

      </div>

    </div>
    }
  </div>)
}

interface LineProps {
  className?: string
  lines?: OrderLineType[]
  loading?: boolean
  currency?: string
  store: string
  onCartChange?: () => void
}
export function OrderLines({ store, lines, currency, loading, className, onCartChange }: LineProps) {
  return (
    <div className={`flex flex-col gap-1 border rounded-md  ${className}`}>
      <div className='grid grid-cols-12  print:grid-cols-10 w-full border-b  font-bold text-sm md:text-base print:px-4'>
        <div className='col-span-4'>Ürün/Kod</div>
        <div className='col-span-3'>Üretici</div>
        <div className='col-span-3 text-right px-2'>Fiyat</div>
        <div className="print:hidden col-span-2 text-right">#</div>
      </div>
      {!loading && lines && <>

        {lines.map((e, index) => (
          <div key={e._id} className={`flex flex-col w-full text-xs md:text-base `}>
            <div className={`flex flex-col w-full border-b border-dashed ${index % 2 == 0 ? ' bg-slate-400' : 'bg-amber-500'} bg-opacity-5 print:bg-transparent p-2`}>
              <div className='flex flex-col w-full'>
                {e.item?.name}
              </div>
              <div className='grid grid-cols-12 print:grid-cols-10 w-full'>
                <div className='col-span-4 flex flex-col  text-xs text-muted-foreground'>
                  <span >{e.item?.code}</span>
                  <span >{e.item?.group}</span>
                </div>
                <div className='col-span-3 flex flex-col'>
                  {e.item?.brand}
                  <span className='text-xs text-muted-foreground'>{e.item?.manufacturerCode} Uretirici</span>
                </div>
                <div className="col-span-3 font-bold flex flex-col text-right">
                  {(e.price || 0) > 0 && <>
                    <span className='flex justify-end'>{e.price} <span className='text-[70%] ms-1'>{currency == 'TRY' ? 'TL' : currency}</span></span>

                    <div className='flex flex-col justify-between'>
                      <div className='text-xs text-muted-foreground'>Kdv%: <span className='font-bold text-sm text-amber-600'>{e.taxRate}</span> </div>
                      <div className='text-xs text-muted-foreground'>Net: <span className='font-bold text-sm text-blue-500'>{e.taxInclusiveAmount}</span></div>
                    </div>
                  </>}
                </div>
                <div className="print:hidden col-span-2 flex justify-end gap1-4 text-xl" title="Yeniden siparis ver">
                  <AddToCart store={store} item={e} onAddToCart={quantity => {
                    onCartChange && onCartChange()
                  }} />
                </div>
              </div>

            </div>
          </div>
        ))}

      </>}
      {loading && Array.from(Array(10).keys()).map(e => (
        <div key={e} className='my-2'>
          <div className='grid grid-cols-4 gap-2'>
            <Skeleton className="h-8 " />
            <Skeleton className="h-8 " />
            <Skeleton className="h-8 " />
            <Skeleton className="h-8 " />
          </div>
        </div>
      ))}
    </div>
  )
}