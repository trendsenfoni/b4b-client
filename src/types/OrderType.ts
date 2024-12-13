import { AddressField } from './AddressField'
import { FirmType } from './FirmType'
import { ItemType } from './ItemType'

export interface OrderListType {
  _id?: string
  issueDate?: string
  shippedDate?: string
  documentNumber?: string
  lineCount?: number
  tQuantity?: number
  deliveredQuantity?: number
  remainingQuantity?: number
  totalAmount?: number
  currency?: string | 'USD' | 'TRY' | 'EUR' | 'RUB' | 'GBP' | undefined
  taxAmount?: number
  withHoldingTaxAmount?: number
  taxInclusiveAmount?: number
  description?: string
  status?: string | undefined | 'pending' | 'waitingForApproval' | 'approved' | 'declined' | 'preparing' | 'shipped'
}

export interface OrderType {
  _id?: string
  issueDate?: string
  shippedDate?: string
  documentNumber?: string
  description?: string
  totalAmount?: number
  taxAmount?: number
  withHoldingTaxAmount?: number
  taxInclusiveAmount?: number
  currency?: string | 'USD' | 'TRY' | 'EUR' | 'RUB' | 'GBP' | undefined
  lineCount?: number
  lines: OrderLineType[]
  status?: string | undefined | 'pending' | 'waitingForApproval' | 'approved' | 'declined' | 'preparing' | 'shipped'
  address?: AddressField
}

export interface OrderLineType {
  _id?: string
  item?: ItemType,
  quantity?: number
  deliveredQuantity?: number
  remainingQuantity?: number
  price?: number
  amount?: number
  discountAmount?: number,
  expenseAmount?: number,
  taxRate?: number
  taxAmount?: number
  withHoldingTaxRate?: number
  withHoldingTaxAmount?: number
  taxInclusiveAmount?: number
  unit?: string
}

