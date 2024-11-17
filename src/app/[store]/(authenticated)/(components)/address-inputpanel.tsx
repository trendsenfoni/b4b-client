"use client"

import { useEffect, useState } from 'react'
import { ChevronsUpDown, Plus, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { AddressType } from '@/types/AddressType'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { SelectCountry } from '@/components/select-country'


interface Props {
  defaultValue?: AddressType
  onChange?: (value: AddressType) => void
}
export function AddressInputPanel({ defaultValue, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [address, setAddress] = useState<AddressType | undefined>(defaultValue)

  useEffect(() => {
    if (typeof window != 'undefined') {
      if (localStorage.getItem('isOpen_AddressInputPanel') == 'true') {
        setIsOpen(true)
      }
    }
  }, [])
  return (<>
    {address && <>
      <Collapsible
        open={isOpen}
        onOpenChange={e => {
          setIsOpen(e)
          if (typeof window != 'undefined') {
            localStorage.setItem('isOpen_AddressInputPanel', e ? 'true' : 'false')
          }
        }}
        className="w-full space-y-0 "
      >
        <div className="">
          <CollapsibleTrigger asChild>
            <div className='cursor-pointer flex items-center justify-between space-x-4 px-4 bg-secondary rounded-md'>
              <h4 className="text-sm font-semibold">
                Adres
              </h4>
              <Button variant="ghost" size="sm" className="w-9 p-0">
                <ChevronsUpDown className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </div>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="w-full border border-dashed border-opacity-100 rounded-md ">
          <div className='grid grid-cols-1 md:grid-cols-4 w-full p-4 gap-4'>
            <div className="">
              <Label>Ülke</Label>
              <SelectCountry width='w-[250px]' defaultValue={address.country} onChange={e => setAddress({ ...address, country: e })} />
            </div>
            <div className="">
              <Label>Şehir</Label>
              <Input
                defaultValue={address.cityName}
                onChange={e => {
                  const val: AddressType = { ...address, cityName: e.target.value }
                  setAddress(val)
                  onChange && onChange(val)
                }}
              />
            </div>
            <div className="">
              <Label>Mahalle/İlçe</Label>
              <Input
                defaultValue={address.citySubdivisionName}
                onChange={e => {
                  const val: AddressType = { ...address, citySubdivisionName: e.target.value }
                  setAddress(val)
                  onChange && onChange(val)
                }}
              />
            </div>
            <div className="">
              <Label>Sokak/Cadde</Label>
              <Input
                defaultValue={address.streetName}
                onChange={e => {
                  const val: AddressType = { ...address, streetName: e.target.value }
                  setAddress(val)
                  onChange && onChange(val)
                }}
              />
            </div>

            <div className="">
              <Label>Posta Kodu</Label>
              <Input
                defaultValue={address.postalZone}
                onChange={e => {
                  const val: AddressType = { ...address, postalZone: e.target.value }
                  setAddress(val)
                  onChange && onChange(val)
                }}
              />
            </div>
            <div className="">
              <Label>Bina Adı</Label>
              <Input
                defaultValue={address.buildingName}
                onChange={e => {
                  const val: AddressType = { ...address, buildingName: e.target.value }
                  setAddress(val)
                  onChange && onChange(val)
                }}
              />
            </div>
            <div className="">
              <Label>Bina Adı</Label>
              <Input
                defaultValue={address.buildingName}
                onChange={e => {
                  const val: AddressType = { ...address, buildingName: e.target.value }
                  setAddress(val)
                  onChange && onChange(val)
                }}
              />
            </div>
            <div className="">
              <Label>Bina Numarası</Label>
              <Input
                defaultValue={address.buildingNumber}
                onChange={e => {
                  const val: AddressType = { ...address, buildingNumber: e.target.value }
                  setAddress(val)
                  onChange && onChange(val)
                }}
              />
            </div>
            <div className="">
              <Label>İç Kapı No</Label>
              <Input
                defaultValue={address.room}
                onChange={e => {
                  const val: AddressType = { ...address, room: e.target.value }
                  setAddress(val)
                  onChange && onChange(val)
                }}
              />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </>}
  </>)
}