import { ItemType } from './ItemType'

export interface CartType {
  documentNumber?: string
  firmDocumentNumber?: string
  lineCount?: number
  tQuantity?: number
  totalAmount?: number
  currency?: string | undefined
  taxAmount?: number
  grandTotal?: number
  lines: CartLineType[]
}

export interface CartLineType {
  _id?: string
  item: ItemType
  quantity?: number
  price?: number
  currency?: string
  amount?: number
  vatAmount?: number
  netAmount?: number

}