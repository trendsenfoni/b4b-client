"use client"

import ButtonLink from '@/components/button-link'
import { useToast } from '@/components/ui/use-toast'
import { useEffect, useState } from 'react'

// import { PaginationType } from '@/types/PaginationType'
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
import { CashFlowType } from '@/types/CashFlowType'
import { getList } from '@/lib/fetch'
import Cookies from 'js-cookie'
import { Button } from '@/components/ui/button'
import { ButtonInfo } from '@/components/button-information'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { RowButtonAddNew, RowButtonEdit, RowButtonView } from '@/components/row-buttons'
import { moneyFormat } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'


interface Props {
  store: string
}

export function CashFlowList({ store }: Props) {
  const [token, setToken] = useState('')
  const [list, setList] = useState<CashFlowType[]>([])
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  // const [pagination, setPagination] = useState<PaginationType>({ pageCount: 0, page: 1, pageSize: 10, totalDocs: 0 })
  const [search, setSearch] = useState('')
  const [startDate, setStartDate] = useState(new Date(new Date().setMonth(new Date().getMonth() - 3)).toISOString().substring(0, 10))
  const [endDate, setEndDate] = useState(new Date().toISOString().substring(0, 10))
  // const [orderStatus, setOrderStatus] = useState('')
  const load = () => {
    let url = `/${store}/cashFlow?`
    if (startDate) url += `&startDate=${startDate}`
    if (endDate) url += `&endDate=${endDate}`
    setLoading(true)
    getList(url, token)
      .then(result => {
        setList(result as CashFlowType[])
        // setPagination(result as PaginationType)
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
            </div>
          </div>
        </ButtonInfo>
      </div>
    )
  }
  useEffect(() => { !token && setToken(Cookies.get('token') || '') }, [])
  useEffect(() => { token && load() }, [token])
  useEffect(() => { token && load() }, [startDate, endDate])

  return (<>
    <div className='flex flex-col gap-1 w-full'>
      <div className='grid grid-cols-1 md:grid-cols-7 gap-4 '>
        <div className='md:col-span-3'>
          <h1 className='text-3xl ms-2 hidden md:flex gap-4 text-primary'>
            <i className="fa-solid fa-boxes-stacked me-2"></i> Cari Hareketler {loading ? 'true' : 'false'}
          </h1>
        </div>
        <div className='flex flex-row items-center justify-end  md:col-span-4 gap-2'>

        </div>
      </div>

      <div className='grid grid-cols-10 md:grid-cols-12 w-full  md:font-bold text-xs md:text-base gap-1 mt-2 pe-2'>
        <div className='col-span-3 ms-1'>Tarih/Evrak</div>
        <div className='col-span-2 hidden md:flex text-left ms-1'>Açıklama</div>
        <div className='col-span-2 text-right'>Borc</div>
        <div className='col-span-2 text-right'>Alacak</div>
        <div className='col-span-2 text-right'>Bakiye</div>
        <div className='col-span-1 text-center ms-1'>#</div>
      </div>
      <ScrollArea className='h-[600px] w-full pe-2'>
        {!loading && <>

          {list.map((e, index) => (
            <div key={e._id} className={`flex flex-col w-full text-xs11 text-[60%] md:text-base`}>
              <div className={`flex flex-col w-full ${index % 2 == 0 ? ' bg-slate-400' : 'bg-amber-500'} bg-opacity-10 md:p-2`}>
                <div className='grid grid-cols-10 md:grid-cols-12  w-full gap-1'>

                  <div className='col-span-3 flex flex-col'>
                    {new Date(e.issueDate || '').toLocaleDateString()}
                    <span className='text-[70%] md:text-sm text-muted-foreground' >{e.documentNumber}</span>
                    <span className='text-[70%] hidden md:flex md:text-sm text-amber-600'>{e.lineCount} Kalem</span>
                  </div>

                  <div className='col-span-2 hidden md:flex  text-[80%] text-muted-foreground text-wrap'>
                    {e.description}
                  </div>
                  <div className='col-span-2 text-right'>
                    {moneyFormat(e.debit)}
                  </div>

                  <div className='col-span-2 text-right'>
                    {moneyFormat(e.credit)}
                  </div>
                  <div className='col-span-2 text-right'>
                    {moneyFormat(e.balance)}
                  </div>
                  <div className='col-span-1 flex justify-end items-center'>
                    <RowButtonView onClick={() => alert(e._id)} />
                  </div>
                </div>
                <div className='flex md:hidden gap-4 items-start'>
                  <div className='text-[70%] text-amber-600'>{e.lineCount} Kalem</div>
                  <div className='tex11t-[80%] text-blue-500'>{e.description}</div>
                </div>
              </div>
            </div>
          ))}

        </>}
        {loading && Array.from(Array(10).keys()).map(e => (
          <div key={e} className='my-2'>
            <div className='grid grid-cols-6 gap-2'>
              <Skeleton className="h-8 " />
              <Skeleton className="h-8 " />
              <Skeleton className="h-8 " />
              <Skeleton className="h-8 " />
              <Skeleton className="h-8 " />
              <Skeleton className="h-8 " />
            </div>
          </div>
        ))}
      </ScrollArea>
    </div >
  </>)
}