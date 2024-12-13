import { useToast } from '@/components/ui/use-toast'
import { deleteItem, getItem, postItem } from '@/lib/fetch'
import { useEffect, useState } from 'react'
import { CartLineType, CartType } from '@/types/CartType'
import { Loading } from '@/components/loading'
import Cookies from 'js-cookie'
import { moneyFormat } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import { RowButtonRemove } from '@/components/row-buttons'
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
import { Button } from '@/components/ui/button'
import { ShoppingCartButton } from './shopping-cart-button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface Props {
  store: string
  cartTotal?: number
}
export function ShoppingCart({ store, cartTotal }: Props) {
  const [token, setToken] = useState('')
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [cart, setCart] = useState<CartType>()
  const [note, setNote] = useState('')
  const load = () => {
    setLoading(true)
    getItem(`/${store}/carts`, token)
      .then((result: CartType) => {
        setCart(result)
      })
      .catch(err => toast({ title: 'Error', description: err || '', variant: 'destructive' }))
      .finally(() => setLoading(false))
  }

  const deleteRow = (line: CartLineType) => {
    setLoading(true)
    deleteItem(`/${store}/carts/${line._id}`, token)
      .then(result => {
        setCart(result)
      })
      .catch(err => toast({ title: 'Error', description: err || '', variant: 'destructive' }))
      .finally(() => setLoading(false))
  }
  const saveOrder = () => {
    setLoading(true)
    postItem(`/${store}/carts/save`, token, { note: note })
      .then(result => {
        // load()
        toast({ title: 'Sipariş başarıyla kaydedildi', duration: 2000 })
        setTimeout(() => {
          location.reload()
        }, 2000)
      })
      .catch(err => toast({ title: 'Error', description: err || '', variant: 'destructive' }))
      .finally(() => setLoading(false))
  }
  useEffect(() => { !token && setToken(Cookies.get('token') || '') }, [])
  useEffect(() => { token && load() }, [token])
  return (
    <Sheet >
      <SheetTrigger asChild>
        <button>
          {!loading && <ShoppingCartButton store={store} />}
        </button>

      </SheetTrigger>
      <SheetContent className='px-2' >
        <SheetHeader>
          <SheetTitle>Sepet</SheetTitle>
          {/* <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription> */}
          <div className='grid grid-cols-5 gap-2 text-[60%] md:text-sm bg-blue-500 bg-opacity-15 px-2 py-1 rounded-md'>
            <div className='text-left'>Ürün<br />Kod</div>
            <div className='text-right'>Fiyat<br />Adet</div>
            <div className='text-right'>Tutar</div>
            <div className='text-right'>Kdv</div>
            <div className='text-right'>Net<br />Tutar</div>
          </div>
        </SheetHeader>
        {/* <SheetContent className='flex flex-col mt-12 px-2'> */}
        <div className=''>


          <ScrollArea className="h-72 w-full rounded-md border">
            <div className="h-[400px] md:[500px] w-full rounded-md border">
              {!loading && cart && cart.lines.map((line, index) => (
                <div key={line._id} className={`grid w-full text-[70%] md:text-sm border border-dashed px-1 py-1 rounded-md my-1`}>
                  <div className='flex justify-between'>
                    <div>{line.item.name}</div>
                    <RowButtonRemove className='w-7 h-6 text-xs me-2' onClick={() => deleteRow(line)} />
                  </div>
                  <div className='grid grid-cols-5 gap-2 items-end'>
                    <div><span className='text-xs text-muted-foreground'>{line.item.code}</span></div>
                    <div className='flex flex-col justify-end items-end'>
                      <span>{line.price}</span>
                      <span>x {line.quantity} <span className='text-[70%]'>{line.item.unit}</span></span>
                    </div>
                    <div className='flex justify-end items-center'>
                      <div className='flex flex-col text-end'>
                        <span> {moneyFormat(line.amount)}</span>
                        <span className='text-muted-foreground text-[80%] md:text-xs'>Kdv% {line.item.vatRate}</span>
                      </div>

                    </div>
                    <div className='flex justify-end items-center text-[80%]'>
                      <div className='flex flex-col text-muted-foreground'>

                        <span>{line.vatAmount}</span>
                      </div>

                    </div>
                    <div className='flex justify-end items-center'>
                      {line.netAmount}
                      <span className='text-[8px] text-muted-foreground'>{line.currency}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          {!loading && cart && <>
            {/* TODO: burasi biraz daha janjanli olacak */}
            <div className='flex justify-end gap-2 text-sm mt-4'>
              <div className='grid grid-cols-2 gap-2 text-right'>
                <div>Toplam</div>
                <div>{moneyFormat(cart.totalAmount)}</div>

                <div>Vergi</div>
                <div>{moneyFormat(cart.taxAmount)}</div>

                <div>Genel Toplam</div>
                <div>{moneyFormat(cart.grandTotal)}</div>
              </div>
            </div>
            <div className='flex flex-col w-full gap-2'>
              <Label>Sipariş Notu</Label>
              <Textarea defaultValue={note} onChange={e => setNote(e.target.value)}
              ></Textarea>
            </div>
          </>
          }
          {loading &&
            <div className='w-full flex justify-center'>
              <Loading />
            </div>
          }

        </div>
        {/* </SheetContent> */}
        <SheetFooter>
          <div className='flex justify-between w-full mt-4'>
            <SheetClose asChild>
              <Button variant={'outline'} ><i className='fa-solid fa-chevron-left'></i></Button>
            </SheetClose>
            <SheetClose asChild>
              <Button className='flex gap-2' onClick={() => saveOrder()}><i className='fa-solid fa-cloud-arrow-up'></i> Gönder</Button>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>

  )
}