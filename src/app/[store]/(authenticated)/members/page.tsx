"use client"
import React, { useEffect, useState } from 'react'
import { Metadata } from 'next/types'
import pageMeta from '@/lib/meta-info'
import Cookies from 'js-cookie'
import { getItem, getList, postItem } from '@/lib/fetch'
import Link from 'next/link'
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
import { Button } from '@/components/ui/button'
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'
import { Switch } from '@/components/ui/switch'
import ButtonLink from '@/components/button-link'
import { MemberType } from '@/types/MemberType'
import Pagination from '@/components/pagination'
import { PaginationType } from '@/types/PaginationType'
import Loading from '@/components/loading'
import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
export default function MemberListPage() {
  const [token, settoken] = useState('')
  const { toast } = useToast()
  const [list, setList] = useState<MemberType[]>([])
  const [pagination, setPagination] = useState<PaginationType>({ pageCount: 0, page: 1, pageSize: 10, totalDocs: 0 })
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')

  const load = (pageNo?: number, s?: string) => {
    let url = `/members?pageSize=${pagination.pageSize}&page=${pageNo || pagination.page}`
    if (s != undefined)
      url += `&search=` + encodeURIComponent(s)
    else if (search)
      url += `&search=` + encodeURIComponent(search)

    setLoading(true)
    getList(url, token)
      .then(result => {
        setList(result.docs as MemberType[])
        setPagination(result as PaginationType)
      })
      .catch(err => toast({ title: 'error', description: err || '', variant: 'destructive' }))
      .finally(() => setLoading(false))
  }
  useEffect(() => { !token && settoken(Cookies.get('token') || '') }, [])
  useEffect(() => { token && load() }, [token])

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between'>
        <h1 className='text-3xl ms-2'>Üyeler</h1>
        <div className="relative">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type='search'
            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            placeholder="ara..."
            defaultValue={search}
            onChange={e => {
              setSearch(e.target.value)
              e.target.value == "" && load(1, "")
            }}
            onKeyDown={e => e.code == 'Enter' && load(1, search)}
          />
        </div>

      </div>

      <hr />
      {!loading && <>
        <Table className=''>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader >
            <TableRow >
              <TableHead className="">Member</TableHead>
              <TableHead colSpan={2}>Email</TableHead>
              <TableHead className="text-center w-18 text-2xl">
                <ButtonLink href={`/members/addnew`} type={'success'}>
                  <i className="fa-solid fa-square-plus"></i>
                </ButtonLink>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody >
            {list.map(e => (
              <TableRow key={e._id}>
                <TableCell className="font-medium">{e.fullName}</TableCell>
                <TableCell colSpan={2}>{e.email}</TableCell>
                <TableCell className="flex justify-center gap-4 text-xl">
                  <ButtonLink href={`/members/${e._id}/connector`} type=''>
                    <i className="fa-solid fa-plug"></i>
                  </ButtonLink>
                  <ButtonLink href={`/members/${e._id}`} type=''>
                    <i className="fa-solid fa-edit"></i>
                  </ButtonLink>
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
  )
}

