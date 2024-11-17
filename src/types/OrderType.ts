import { AddressField } from './AddressField'
import { FirmType } from './FirmType'

export interface OrderType {
  _id?: string
  firm?: FirmType
  ioType?: number | 0 | 1
  issueDate?: string
  documentNumber?: string
  firmDocumentNumber?: string
  lineCount?: number
  quantity?: number
  total?: number
  currency?: string | 'USD' | 'TRY' | 'EUR' | 'RUB' | 'GBP' | undefined
  taxAmount?: number
  withHoldingTaxAmount?: number
  taxInclusiveTotal?: number
  note?: string
  address?: AddressField
  closed?: boolean
}

export interface OrderLineType {
  _id?: string
  order?: OrderType
  ioType?: number | 0 | 1
  issueDate?: string
  description?: string
  quantity?: number
  delivered?: number
  remainder?: number
  thickness?: number
  width?: number
  length?: number
  weight?: number
  price?: number
  total?: number
  currency?: string | 'USD' | 'TRY' | 'EUR' | 'RUB' | 'GBP' | undefined
  taxAmount?: number
  withHoldingTaxAmount?: number
  taxInclusiveTotal?: number
  closed?: boolean
}

