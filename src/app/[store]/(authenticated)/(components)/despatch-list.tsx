"use client"

import ButtonLink from '@/components/button-link'
import { useToast } from '@/components/ui/use-toast'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { getList } from '@/lib/fetch'
import { PaginationType } from '@/types/PaginationType'
import Loading from '@/components/loading'
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
import { DespatchType } from '@/types/DespatchType'

interface Props {
  ioType?: number | 0 | 1
}

export function DespatchList({ ioType }: Props) {
  const [token, setToken] = useState('')
  const [list, setList] = useState<DespatchType[]>([])

  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const [pagination, setPagination] = useState<PaginationType>({ pageCount: 0, page: 1, pageSize: 10, totalDocs: 0 })
  const [search, setSearch] = useState('')

  const load = (pageNo?: number, s?: string) => {
    let url = `/db/despatches?ioType=${ioType}&pageSize=${pagination.pageSize}&page=${pageNo || pagination.page}`
    if (s != undefined) url += `&search=` + encodeURIComponent(s)

    setLoading(true)
    getList(url, token)
      .then(result => {
        console.log('result:', result)
        setList(result.docs as DespatchType[])
        setPagination(result as PaginationType)
      })
      .catch(err => toast({ title: 'Error', description: err, variant: 'destructive' }))
      .finally(() => setLoading(false))
  }
  useEffect(() => { !token && setToken(Cookies.get('token') || '') }, [])
  useEffect(() => { token && load(1, '') }, [token])

  return (<>
    <div className='flex flex-col gap-4'>
      <div className='grid grid-cols-1 md:grid-cols-7 gap-4 '>
        <h1 className='text-3xl ms-2 flex gap-4 md:col-span-3 text-primary'>
          {ioType == 0 && <><i className="fa-solid fa-building-user"></i> Satış İrsaliyeleri</>}
          {ioType == 1 && <><i className="fa-solid fa-truck-arrow-right"></i> Gelen İrsaliyeler</>}
        </h1>
        <div className='flex justify-end  md:col-span-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full'>
            <div className="relative">
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
            <div className='grid grid-cols-2 gap-2 w-full '>
              <Input type='date' pattern='yyyy-mm-dd' className='min-w-36' />
              <Input type='date' pattern='yyyy-mm-dd' className='min-w-36' />
            </div>
          </div>
        </div>
      </div>
      <hr />
      {!loading && <>
        <Table className=''>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader >
            <TableRow >
              <TableHead className='p-1'>Tarih</TableHead>
              <TableHead className='p-1'>Evrak No</TableHead>
              <TableHead className='p-1'>{ioType == 0 ? 'Müşteri' : 'Tedarikçi'}</TableHead>
              <TableHead className="text-center w-14 text-2xl">
                {ioType == 0 && <>
                  <ButtonLink href={`/sales/despatches/addnew`} type={'success'}>
                    <i className="fa-solid fa-square-plus"></i>
                  </ButtonLink>
                </>}
                {ioType == 1 && <>
                  <ButtonLink href={`/purchasing/despatches/addnew`} type={'success'}>
                    <i className="fa-solid fa-square-plus"></i>
                  </ButtonLink>
                </>}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody >
            {list.map(e => (
              <TableRow key={e._id} className=''>
                <TableCell >
                  <div className='flex flex-col'>
                    {e.issueDate}
                    <span className='text-xs text-muted-foreground'>{e.issueTime}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex flex-col'>
                    {e.documentNumber}
                    <span className='text-xs text-muted-foreground'>Kalem:{e.lineCount}</span>
                  </div>
                </TableCell>
                <TableCell >
                  <div className="font-medium flex flex-col">
                    {e.firm?.name}
                    <span className='text-xs text-muted-foreground'>{e.address?.citySubdivisionName} {e.address?.cityName}</span>
                  </div>
                </TableCell>

                <TableCell className="flex justify-center align-middle gap1-4 text-xl">
                  {ioType == 0 && <>
                    <ButtonLink href={`/sales/despatches/${e._id}`} type={'success'}>
                      <i className="fa-solid fa-edit"></i>
                    </ButtonLink>
                  </>}
                  {ioType == 1 && <>
                    <ButtonLink href={`/purchasing/despatches/${e._id}`} type={'success'}>
                      <i className="fa-solid fa-edit"></i>
                    </ButtonLink>
                  </>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter className='bg-transparent'>
            <TableRow className=' hover:bg-transparent'>
              <TableCell colSpan={4} >
                <Pagination pagination={pagination} onPageClick={(pageNo: number) => {
                  setPagination({ ...pagination, page: pageNo })
                }} />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </>}
      {loading && <div className='flex w-full h-full justify-center items-center'>
        <Loading />
      </div>}
    </div>
  </>)
}