import { AddressType, CountryType } from './AddressType'

export interface FirmType {
  _id?: string
  type?: string | 'customer' | 'vendor' | undefined
  name?: string
  currency?: string
  itemArticle?: string
  billingInfo?: {
    individual?: boolean
    companyName?: string
    firstName?: string
    lastName?: string
    taxOffice?: string
    taxNumber?: string
    idCardNo?: string
  }
  address?: {
    room?: string
    streetName?: string
    blockName?: string
    buildingName?: string
    buildingNumber?: string
    citySubdivisionName?: string
    cityName?: string
    postalZone?: string
    postbox?: string
    region?: string
    district?: string
    country?: CountryType
  }
  passive?: boolean
}