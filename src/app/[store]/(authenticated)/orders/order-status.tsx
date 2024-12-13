import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Props {
  defaultValue?: string
  onChange?: (val: string) => void
}
export function OrderStatus({ defaultValue, onChange }: Props) {
  return (
    <Select defaultValue={defaultValue} onValueChange={e => onChange && onChange(e.trim())}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="---Seç---" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {/* <SelectLabel>Fruits</SelectLabel> */}
          <SelectItem value=" ">--Tümü--</SelectItem>
          <SelectItem value="pending">Bekliyor</SelectItem>
          <SelectItem value="waitingForApproval">Onayda</SelectItem>
          <SelectItem value="approved">Onaylandı</SelectItem>
          <SelectItem value="declined">Ret</SelectItem>
          <SelectItem value="preparing">Hazırlanıyor</SelectItem>
          <SelectItem value="shipped">Sevk Edildi</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
