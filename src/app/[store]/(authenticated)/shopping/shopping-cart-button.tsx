import { useToast } from '@/components/ui/use-toast'
import { getItem } from '@/lib/fetch'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { Loading } from '@/components/loading'
interface Props {
  store: string
}
export function ShoppingCartButton({ store }: Props) {
  const [token, settoken] = useState('')
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [cartTotal, setCartTotal] = useState(0)
  const loadCartTotal = () => {
    setLoading(true)
    getItem(`/${store}/carts/total`, token)
      .then(result => {
        setCartTotal(result)
      })
      .catch(err => toast({ title: 'Error', description: err || '', variant: 'destructive' }))
      .finally(() => setLoading(false))
  }

  useEffect(() => { !token && settoken(Cookies.get('token') || '') }, [])
  useEffect(() => { token && loadCartTotal() }, [token])
  return (<>
    <div className='relative px-3 py-1 border rounded-xl bg-green-600 text-white '>
      <i className="fa-solid fa-basket-shopping"></i>
      {!loading &&
        <div className='absolute text-xs right-[-3px] top-[-3px] bg-blue-600 text-white px-1 py-0 rounded-full'>{cartTotal}</div>
      }
    </div>

  </>)
}