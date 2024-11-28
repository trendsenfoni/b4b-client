"use client"
import { useEffect, useState } from 'react'

import { Check, ChevronsUpDown } from "lucide-react"
import { getList } from '@/lib/fetch'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Cookies from 'js-cookie'
import { useToast } from '@/components/ui/use-toast'
import { SubGroupType } from '@/types/SubGroupType'
import { Label } from '@/components/ui/label'
// import { ItemType } from '@/types/ItemType'


interface Props {
  store: string

  defaultValue?: string
  onChange?: (val?: string) => void
  width?: string
}
export function ComboboxItemCategory({
  store,
  defaultValue,
  onChange,
  width = "w-300px"
}: Props) {
  const [open, setOpen] = useState(false)
  const [token, settoken] = useState('')
  const [obj, setObj] = useState<string | undefined>(defaultValue)
  const [list, setList] = useState<string[]>([])
  const [search, setSearch] = useState('')
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const load = (s?: string) => {

    setLoading(true)
    getList(`/${store}/items/categories?search=${s || search || ''}`, token)
      .then(result => {
        setList(result as string[])
      })
      .catch(err => toast({ title: 'Error', description: err || '', variant: 'destructive' }))
      .finally(() => setLoading(false))
  }

  useEffect(() => { !token && settoken(Cookies.get('token') || '') }, [])
  // useEffect(() => { token && load() }, [token])
  useEffect(() => { token && load() }, [token, search])

  return (<div>
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {!loading &&
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={`${width} justify-between`}
          >
            {obj ? obj : "Hepsi..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        }
      </PopoverTrigger>

      <PopoverContent className={`${width} p-0`}>
        <Command>
          <CommandInput
            placeholder={`...`}
            value={search}
            onValueChange={e => {
              setSearch(e)
            }}
          />

          <CommandList>
            <CommandEmpty>Kayıt bulunamadı</CommandEmpty>
            <CommandGroup>
              {!loading && list.map(e => (
                <CommandItem
                  key={e}
                  value={e}
                  onSelect={e => {
                    console.log('e:', e)
                    let choosen = list.find(k => k == e)
                    setObj(choosen)
                    if (onChange) onChange(choosen)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      obj === e ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {e == '' ? '...Hepsi...' : e}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>

  </div>)
}