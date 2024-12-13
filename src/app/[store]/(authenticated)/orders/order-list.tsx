"use client"

import ButtonLink from '@/components/button-link'
import { useToast } from '@/components/ui/use-toast'
import { useEffect, useState } from 'react'

import { PaginationType } from '@/types/PaginationType'
import { Loading } from '@/components/loading'
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
import { SearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import Pagination from '@/components/pagination'
import { FirmType } from '@/types/FirmType'
import { OrderListType } from '@/types/OrderType'
import { getList } from '@/lib/fetch'
import Cookies from 'js-cookie'
import { Button } from '@/components/ui/button'
import { ButtonInfo } from '@/components/button-information'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { RowButtonAddNew, RowButtonEdit, RowButtonView } from '@/components/row-buttons'
import { moneyFormat } from '@/lib/utils'
import { OrderStatus } from './order-status'

interface Props {
  store: string
}

export function OrderList({ store }: Props) {
  const [token, setToken] = useState('')
  const [list, setList] = useState<OrderListType[]>([])
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const [pagination, setPagination] = useState<PaginationType>({ pageCount: 0, page: 1, pageSize: 10, totalDocs: 0 })
  const [search, setSearch] = useState('')
  const [startDate, setStartDate] = useState(new Date(new Date().setMonth(new Date().getMonth() - 6)).toISOString().substring(0, 10))
  const [endDate, setEndDate] = useState(new Date().toISOString().substring(0, 10))
  const [orderStatus, setOrderStatus] = useState('')
  const load = (pageNo?: number, s?: string) => {
    let url = `/${store}/orders?pageSize=${pagination.pageSize}&page=${pageNo || pagination.page}`
    if (s != undefined) url += `&search=` + encodeURIComponent(s)
    if (startDate) url += `&startDate=${startDate}`
    if (endDate) url += `&endDate=${endDate}`
    if (orderStatus) url += `&status=${orderStatus}`
    setLoading(true)
    getList(url, token)
      .then(result => {
        setList(result.docs as OrderListType[])
        setPagination(result as PaginationType)
      })
      .catch(err => toast({ title: 'Error', description: err, variant: 'destructive' }))
      .finally(() => setLoading(false))
  }

  const FilterButton = () => {
    return (
      <div className='flex-shrink'>
        <ButtonInfo text={<i className='fa-solid fa-filter'></i>} >
          <div className='flex flex-col gap-2'>
            <div>
              <Label>Başlangıç</Label>
              <Input className='px-2 py-1 w-26'
                type='date' disabled={loading} pattern='yyyy-mm-dd'
                defaultValue={startDate}
                onChange={e => {
                  if (e.target.value > endDate) {
                    setStartDate(endDate)
                  } else {
                    setStartDate(e.target.value)
                  }
                }}
              />
            </div>

            <div>
              <Label>Bitiş</Label>
              <Input className='px-2 py-1 w-26'
                type='date' disabled={loading} pattern='yyyy-mm-dd'
                defaultValue={endDate}
                onChange={e => {
                  if (e.target.value < startDate) {
                    setEndDate(startDate)
                  } else {
                    setEndDate(e.target.value)
                  }
                }}
              />
            </div>
            <div>
              <Label>Durumu</Label>
              <OrderStatus defaultValue={orderStatus} onChange={e => setOrderStatus(e)} />
            </div>
          </div>
        </ButtonInfo>
      </div>
    )
  }
  useEffect(() => { !token && setToken(Cookies.get('token') || '') }, [])
  useEffect(() => { token && load(1, '') }, [token])
  useEffect(() => { token && load(1, search) }, [startDate, endDate, orderStatus])

  return (<>
    <div className='flex flex-col gap-1 w-full'>
      <div className='grid grid-cols-1 md:grid-cols-7 gap-4 '>
        <div className='md:col-span-3'>
          <h1 className='text-3xl ms-2 hidden md:flex gap-4 text-primary'>
            <i className="fa-solid fa-boxes-stacked me-2"></i> Siparişler
          </h1>
        </div>
        <div className='flex flex-row items-center justify-end  md:col-span-4 gap-2'>
          <div className="relative flex-grow md:max-w-80">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type='search'
              // className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              className="ps-8 w-full"
              placeholder="ara..."
              defaultValue={search}
              onChange={e => {
                setSearch(e.target.value)
                e.target.value == "" && load(1, "")
              }}
              onKeyDown={e => e.code == 'Enter' && load(1, search)}
            />
          </div>
          <FilterButton />
        </div>
      </div>

      <div className='grid grid-cols-5 md:grid-cols-6 w-full  md:font-bold text-xs md:text-base gap-1 mt-2'>
        <div className='col-span-1 ms-1'>Sipariş</div>
        <div className='col-span-1 text-left ms-1'>Durum</div>
        <div className='col-span-1 hidden md:flex text-left ms-1'>Açıklama</div>
        <div className='col-span-2 text-right'>Tutar</div>
        <div className="col-span-1 text-right pe-4">#</div>
      </div>
      {!loading && <>

        {list.map((e, index) => (
          <div key={e._id} className={`flex flex-col w-full text-xs md:text-base `}>
            <div className={`flex flex-col w-full ${index % 2 == 0 ? ' bg-slate-400' : 'bg-amber-500'} bg-opacity-5 p-2`}>
              <div className='grid grid-cols-5 md:grid-cols-6 w-full gap-1'>

                <div className='flex flex-col'>
                  {new Date(e.issueDate || '').toLocaleDateString()}
                  <span className='text-[70%] md:text-sm text-muted-foreground' >{e.documentNumber}</span>
                  <span className='text-[70%] md:text-sm text-amber-600'>{e.lineCount} Kalem</span>
                </div>

                <div className='flex flex-col'>
                  {new Date(e.shippedDate || '').toLocaleDateString()}
                  <span className='text-[70%] md:text-sm text-blue-500' >Miktar: {e.tQuantity}</span>
                  <div className='flex flex-col  md:flex-row gap-0 md:gap-1 '>
                    <span className='text-[70%] md:text-sm text-muted-foreground' >Gönd.: {e.deliveredQuantity}</span>
                    <span className='text-[70%] md:text-sm text-amber-600'>Kalan: {e.remainingQuantity}</span>
                  </div>
                </div>
                <div className='text-[80%] text-muted-foreground text-wrap hidden md:flex'>
                  {e.description}
                </div>

                <div className="col-span-2 flex flex-col text-right">
                  <div className='font-semibold'>{moneyFormat(e.taxInclusiveAmount)} <span className='text-[70%]'>{e.currency}</span></div>
                  <div className='text-[80%] text-muted-foreground'>Kdv Hariç: {moneyFormat(e.totalAmount)} <span className='text-[70%]'>{e.currency}</span></div>
                  <div className='text-[80%] text-muted-foreground'>Kdv: {moneyFormat(e.taxAmount)} <span className='text-[70%]'>{e.currency}</span></div>
                </div>
                <div className='flex items-center justify-end'>
                  <RowButtonView href={`/${store}/orders/${e._id}`} />
                </div>
              </div>

            </div>
          </div>
        ))}
        <Pagination pagination={pagination} onPageClick={(pageNo: number) => {
          setPagination({ ...pagination, page: pageNo })
          load(pageNo, search)
        }} />
      </>}
      {loading && Array.from(Array(10).keys()).map(e => (
        <div key={e} className='my-2'>
          <div className='grid grid-cols-5 gap-2'>
            <Skeleton className="h-8 " />
            <Skeleton className="h-8 " />
            <Skeleton className="h-8 " />
            <Skeleton className="h-8 " />
            <Skeleton className="h-8 " />
          </div>
        </div>
      ))}
    </div >
  </>)
}