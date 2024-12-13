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
import { ItemType } from '@/types/ItemType'
import { getList } from '@/lib/fetch'
import Cookies from 'js-cookie'
import { Button } from '@/components/ui/button'
import { ButtonInfo } from '@/components/button-information'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { RowButtonAddNew } from '@/components/row-buttons'
import { ComboboxItemGroup } from './combobox-itemGroup'
import { ComboboxItemSubGroup } from './combobox-itemSubGroup'
import { SubGroupType } from '@/types/SubGroupType'
import { ComboboxItemCategory } from './combobox-itemCategory'
import { ComboboxItemBrand } from './combobox-itemBrand'
import { AddToCart } from './add-to-cart'
interface Props {
  store: string
  onCartChange?: () => void
}

export function ItemList({ store, onCartChange }: Props) {
  const [token, setToken] = useState('')
  const [list, setList] = useState<ItemType[]>([])

  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const [pagination, setPagination] = useState<PaginationType>({ pageCount: 0, page: 1, pageSize: 10, totalDocs: 0 })
  const [search, setSearch] = useState('')
  const [group, setGroup] = useState('')
  const [subGroup, setSubGroup] = useState<SubGroupType | undefined>({})
  const [category, setCategory] = useState('')
  const [brand, setBrand] = useState('')

  const load = (pageNo?: number, s?: string) => {
    let url = `/${store}/items?pageSize=${pagination.pageSize}&page=${pageNo || pagination.page}`
    if (s != undefined) url += `&search=` + encodeURIComponent(s)
    if (group) url += `&group=` + encodeURIComponent(group)
    if (subGroup && subGroup.subGroup) url += `&subGroup=` + encodeURIComponent(subGroup.subGroup)
    if (category) url += `&category=` + encodeURIComponent(category)
    if (brand) url += `&brand=` + encodeURIComponent(brand)
    setLoading(true)
    getList(url, token)
      .then(result => {
        console.log('result:', result)
        setList(result.docs as ItemType[])
        setPagination(result as PaginationType)
      })
      .catch(err => toast({ title: 'Error', description: err, variant: 'destructive' }))
      .finally(() => setLoading(false))
  }
  useEffect(() => { !token && setToken(Cookies.get('token') || '') }, [])
  useEffect(() => { token && load(1, '') }, [token])
  useEffect(() => { token && load(1, search) }, [group, subGroup, category, brand])

  return (<>
    <div className='flex flex-col gap-1 w-full'>
      {/* <div className='grid grid-cols-1 md:grid-cols-7 gap-4 '> */}
      <div className='grid grid-cols-1 md:grid-cols-7 gap-4 '>
        <div className='md:col-span-3'>
          <h1 className='text-3xl ms-2 hidden md:flex gap-4 text-primary'>
            <i className="fa-solid fa-boxes-stacked me-2"></i> Ürünler
          </h1>
        </div>
        <div className='flex flex-row items-center justify-end  md:col-span-4 gap-2'>
          {/* <div className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full'> */}
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
          <div className='flex-shrink'>
            <ButtonInfo text={<i className='fa-solid fa-filter'></i>} >
              <div className='flex flex-col gap-2'>
                <div>
                  <Label>Ana Grup</Label>
                  <ComboboxItemGroup store={store} width='w-full'
                    defaultValue={group}
                    defaultSubGroup={subGroup}
                    onChange={e => setGroup(e || '')}
                    onChangeSubGroup={e => setSubGroup(e)}
                  />
                </div>

                <div>
                  <Label>Kategori</Label>
                  <ComboboxItemCategory store={store} width='w-full'
                    defaultValue={category}
                    onChange={e => setCategory(e || '')}
                  />
                </div>
                <div>
                  <Label>Marka</Label>
                  <ComboboxItemBrand store={store} width='w-full'
                    defaultValue={brand}
                    onChange={e => setBrand(e || '')}
                  />
                </div>
              </div>
            </ButtonInfo>
          </div>
          {/* </div> */}
        </div>
      </div>
      {/* <div>
        Filtre: {group}- {subGroup?.subGroup} - {category}
      </div> */}
      {/* <hr /> */}
      <div className='grid grid-cols-12 w-full  font-bold text-sm md:text-base'>
        <div className='col-span-4'>Ürün/Kod</div>
        <div className='col-span-3'>Üretici</div>
        <div className='col-span-3 text-right'>Fiyat</div>
        <div className="col-span-2 text-right pe-4">#</div>
      </div>
      {!loading && <>

        {list.map((e, index) => (
          <div key={e._id} className={`flex flex-col w-full text-xs md:text-base `}>
            <div className={`flex flex-col w-full ${index % 2 == 0 ? ' bg-slate-400' : 'bg-amber-500'} bg-opacity-5 p-2`}>
              <div className='flex flex-col w-full'>
                {e.name}
              </div>
              <div className='grid grid-cols-12 w-full'>
                <div className='col-span-4 flex flex-col  text-xs text-muted-foreground'>
                  <span >{e.code}</span>
                  <span >{e.group} Group</span>
                </div>
                <div className='col-span-3 flex flex-col'>
                  {e.brand} Marka
                  <span className='text-xs text-muted-foreground'>{e.manufacturerCode} Uretirici</span>
                </div>
                <div className="col-span-3 font-bold flex flex-col text-right">
                  {(e.price || 0) > 0 && <>
                    <span className='flex justify-end'>{e.price} <span className='text-[70%] ms-1'>{e.currency == 'TRY' ? 'TL' : e.currency}</span></span>

                    <div className='flex flex-col justify-between'>
                      <div className='text-xs text-muted-foreground'>Kdv%: <span className='font-bold text-sm text-amber-600'>{e.vatRate}</span> </div>
                      <div className='text-xs text-muted-foreground'>Net: <span className='font-bold text-sm text-blue-500'>{e.netPrice}</span></div>
                    </div>
                  </>}
                </div>
                <div className="col-span-2 flex justify-end align-m11iddle gap1-4 text-xl">
                  <AddToCart store={store} item={e} onAddToCart={quantity => {
                    console.log('onAddToCart')
                    onCartChange && onCartChange()
                  }} />

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
          <div className='grid grid-cols-4 gap-2'>
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