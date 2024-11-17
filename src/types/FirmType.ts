import { AddressField } from './AddressField'
import { AddressType, CountryType } from './AddressType'

export interface FirmType {
  _id?: string
  type?: string | 'customer' | 'vendor' | undefined
  code?: string
  name?: string
  description?: string
  phoneNumber?: string
  email?: string
  currency?: string
  billingInfo?: {
    individual?: boolean
    companyName?: string
    firstName?: string
    lastName?: string
    taxOffice?: string
    taxNumber?: string
    idCardNo?: string
  }
  address?: AddressField
  salesman?: string
  priceGroup?: string
  discountGroup?: string
  lastModified?: string
  passive?: boolean
}