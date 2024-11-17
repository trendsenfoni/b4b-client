"use client"
import { useEffect, useState } from 'react'

import { Check, ChevronsUpDown } from "lucide-react"
import { getList } from '@/lib/fetch'
import { showError } from '@/lib/showToast'
import { ItemType } from '@/types/ItemType'
import { useRouter } from 'next/navigation'
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
import { CountryType } from '@/types/AddressType'

const countryList: CountryType[] = [
  { name: 'Türkiye', identificationCode: 'TR' },
  { name: 'Afghanistan', identificationCode: 'AF' },
  { name: 'Åland Islands', identificationCode: 'AX' },
  { name: 'Albania', identificationCode: 'AL' },
  { name: 'Algeria', identificationCode: 'DZ' },
  { name: 'American Samoa', identificationCode: 'AS' },
  { name: 'AndorrA', identificationCode: 'AD' },
  { name: 'Angola', identificationCode: 'AO' },
  { name: 'Anguilla', identificationCode: 'AI' },
  { name: 'Antarctica', identificationCode: 'AQ' },
  { name: 'Antigua and Barbuda', identificationCode: 'AG' },
  { name: 'Argentina', identificationCode: 'AR' },
  { name: 'Armenia', identificationCode: 'AM' },
  { name: 'Aruba', identificationCode: 'AW' },
  { name: 'Australia', identificationCode: 'AU' },
  { name: 'Austria', identificationCode: 'AT' },
  { name: 'Azerbaijan', identificationCode: 'AZ' },
  { name: 'Bahamas', identificationCode: 'BS' },
  { name: 'Bahrain', identificationCode: 'BH' },
  { name: 'Bangladesh', identificationCode: 'BD' },
  { name: 'Barbados', identificationCode: 'BB' },
  { name: 'Belarus', identificationCode: 'BY' },
  { name: 'Belgium', identificationCode: 'BE' },
  { name: 'Belize', identificationCode: 'BZ' },
  { name: 'Benin', identificationCode: 'BJ' },
  { name: 'Bermuda', identificationCode: 'BM' },
  { name: 'Bhutan', identificationCode: 'BT' },
  { name: 'Bolivia', identificationCode: 'BO' },
  { name: 'Bosnia and Herzegovina', identificationCode: 'BA' },
  { name: 'Botswana', identificationCode: 'BW' },
  { name: 'Bouvet Island', identificationCode: 'BV' },
  { name: 'Brazil', identificationCode: 'BR' },
  { name: 'British Indian Ocean Territory', identificationCode: 'IO' },
  { name: 'Brunei Darussalam', identificationCode: 'BN' },
  { name: 'Bulgaria', identificationCode: 'BG' },
  { name: 'Burkina Faso', identificationCode: 'BF' },
  { name: 'Burundi', identificationCode: 'BI' },
  { name: 'Cambodia', identificationCode: 'KH' },
  { name: 'Cameroon', identificationCode: 'CM' },
  { name: 'Canada', identificationCode: 'CA' },
  { name: 'Cape Verde', identificationCode: 'CV' },
  { name: 'Cayman Islands', identificationCode: 'KY' },
  { name: 'Central African Republic', identificationCode: 'CF' },
  { name: 'Chad', identificationCode: 'TD' },
  { name: 'Chile', identificationCode: 'CL' },
  { name: 'China', identificationCode: 'CN' },
  { name: 'Christmas Island', identificationCode: 'CX' },
  { name: 'Cocos (Keeling) Islands', identificationCode: 'CC' },
  { name: 'Colombia', identificationCode: 'CO' },
  { name: 'Comoros', identificationCode: 'KM' },
  { name: 'Congo', identificationCode: 'CG' },
  { name: 'Congo, The Democratic Republic of the', identificationCode: 'CD' },
  { name: 'Cook Islands', identificationCode: 'CK' },
  { name: 'Costa Rica', identificationCode: 'CR' },
  { name: 'Cote D\'Ivoire', identificationCode: 'CI' },
  { name: 'Croatia', identificationCode: 'HR' },
  { name: 'Cuba', identificationCode: 'CU' },
  { name: 'Cyprus', identificationCode: 'CY' },
  { name: 'Czech Republic', identificationCode: 'CZ' },
  { name: 'Denmark', identificationCode: 'DK' },
  { name: 'Djibouti', identificationCode: 'DJ' },
  { name: 'Dominica', identificationCode: 'DM' },
  { name: 'Dominican Republic', identificationCode: 'DO' },
  { name: 'Ecuador', identificationCode: 'EC' },
  { name: 'Egypt', identificationCode: 'EG' },
  { name: 'El Salvador', identificationCode: 'SV' },
  { name: 'Equatorial Guinea', identificationCode: 'GQ' },
  { name: 'Eritrea', identificationCode: 'ER' },
  { name: 'Estonia', identificationCode: 'EE' },
  { name: 'Ethiopia', identificationCode: 'ET' },
  { name: 'Falkland Islands (Malvinas)', identificationCode: 'FK' },
  { name: 'Faroe Islands', identificationCode: 'FO' },
  { name: 'Fiji', identificationCode: 'FJ' },
  { name: 'Finland', identificationCode: 'FI' },
  { name: 'France', identificationCode: 'FR' },
  { name: 'French Guiana', identificationCode: 'GF' },
  { name: 'French Polynesia', identificationCode: 'PF' },
  { name: 'French Southern Territories', identificationCode: 'TF' },
  { name: 'Gabon', identificationCode: 'GA' },
  { name: 'Gambia', identificationCode: 'GM' },
  { name: 'Georgia', identificationCode: 'GE' },
  { name: 'Germany', identificationCode: 'DE' },
  { name: 'Ghana', identificationCode: 'GH' },
  { name: 'Gibraltar', identificationCode: 'GI' },
  { name: 'Greece', identificationCode: 'GR' },
  { name: 'Greenland', identificationCode: 'GL' },
  { name: 'Grenada', identificationCode: 'GD' },
  { name: 'Guadeloupe', identificationCode: 'GP' },
  { name: 'Guam', identificationCode: 'GU' },
  { name: 'Guatemala', identificationCode: 'GT' },
  { name: 'Guernsey', identificationCode: 'GG' },
  { name: 'Guinea', identificationCode: 'GN' },
  { name: 'Guinea-Bissau', identificationCode: 'GW' },
  { name: 'Guyana', identificationCode: 'GY' },
  { name: 'Haiti', identificationCode: 'HT' },
  { name: 'Heard Island and Mcdonald Islands', identificationCode: 'HM' },
  { name: 'Holy See (Vatican City State)', identificationCode: 'VA' },
  { name: 'Honduras', identificationCode: 'HN' },
  { name: 'Hong Kong', identificationCode: 'HK' },
  { name: 'Hungary', identificationCode: 'HU' },
  { name: 'Iceland', identificationCode: 'IS' },
  { name: 'India', identificationCode: 'IN' },
  { name: 'Indonesia', identificationCode: 'ID' },
  { name: 'Iran, Islamic Republic Of', identificationCode: 'IR' },
  { name: 'Iraq', identificationCode: 'IQ' },
  { name: 'Ireland', identificationCode: 'IE' },
  { name: 'Isle of Man', identificationCode: 'IM' },
  { name: 'Israel', identificationCode: 'IL' },
  { name: 'Italy', identificationCode: 'IT' },
  { name: 'Jamaica', identificationCode: 'JM' },
  { name: 'Japan', identificationCode: 'JP' },
  { name: 'Jersey', identificationCode: 'JE' },
  { name: 'Jordan', identificationCode: 'JO' },
  { name: 'Kazakhstan', identificationCode: 'KZ' },
  { name: 'Kenya', identificationCode: 'KE' },
  { name: 'Kiribati', identificationCode: 'KI' },
  { name: 'Korea, Democratic People\'S Republic of', identificationCode: 'KP' },
  { name: 'Korea, Republic of', identificationCode: 'KR' },
  { name: 'Kuwait', identificationCode: 'KW' },
  { name: 'Kyrgyzstan', identificationCode: 'KG' },
  { name: 'Lao People\'S Democratic Republic', identificationCode: 'LA' },
  { name: 'Latvia', identificationCode: 'LV' },
  { name: 'Lebanon', identificationCode: 'LB' },
  { name: 'Lesotho', identificationCode: 'LS' },
  { name: 'Liberia', identificationCode: 'LR' },
  { name: 'Libyan Arab Jamahiriya', identificationCode: 'LY' },
  { name: 'Liechtenstein', identificationCode: 'LI' },
  { name: 'Lithuania', identificationCode: 'LT' },
  { name: 'Luxembourg', identificationCode: 'LU' },
  { name: 'Macao', identificationCode: 'MO' },
  { name: 'Macedonia, The Former Yugoslav Republic of', identificationCode: 'MK' },
  { name: 'Madagascar', identificationCode: 'MG' },
  { name: 'Malawi', identificationCode: 'MW' },
  { name: 'Malaysia', identificationCode: 'MY' },
  { name: 'Maldives', identificationCode: 'MV' },
  { name: 'Mali', identificationCode: 'ML' },
  { name: 'Malta', identificationCode: 'MT' },
  { name: 'Marshall Islands', identificationCode: 'MH' },
  { name: 'Martinique', identificationCode: 'MQ' },
  { name: 'Mauritania', identificationCode: 'MR' },
  { name: 'Mauritius', identificationCode: 'MU' },
  { name: 'Mayotte', identificationCode: 'YT' },
  { name: 'Mexico', identificationCode: 'MX' },
  { name: 'Micronesia, Federated States of', identificationCode: 'FM' },
  { name: 'Moldova, Republic of', identificationCode: 'MD' },
  { name: 'Monaco', identificationCode: 'MC' },
  { name: 'Mongolia', identificationCode: 'MN' },
  { name: 'Montserrat', identificationCode: 'MS' },
  { name: 'Morocco', identificationCode: 'MA' },
  { name: 'Mozambique', identificationCode: 'MZ' },
  { name: 'Myanmar', identificationCode: 'MM' },
  { name: 'Namibia', identificationCode: 'NA' },
  { name: 'Nauru', identificationCode: 'NR' },
  { name: 'Nepal', identificationCode: 'NP' },
  { name: 'Netherlands', identificationCode: 'NL' },
  { name: 'Netherlands Antilles', identificationCode: 'AN' },
  { name: 'New Caledonia', identificationCode: 'NC' },
  { name: 'New Zealand', identificationCode: 'NZ' },
  { name: 'Nicaragua', identificationCode: 'NI' },
  { name: 'Niger', identificationCode: 'NE' },
  { name: 'Nigeria', identificationCode: 'NG' },
  { name: 'Niue', identificationCode: 'NU' },
  { name: 'Norfolk Island', identificationCode: 'NF' },
  { name: 'Northern Mariana Islands', identificationCode: 'MP' },
  { name: 'Norway', identificationCode: 'NO' },
  { name: 'Oman', identificationCode: 'OM' },
  { name: 'Pakistan', identificationCode: 'PK' },
  { name: 'Palau', identificationCode: 'PW' },
  { name: 'Palestinian Territory, Occupied', identificationCode: 'PS' },
  { name: 'Panama', identificationCode: 'PA' },
  { name: 'Papua New Guinea', identificationCode: 'PG' },
  { name: 'Paraguay', identificationCode: 'PY' },
  { name: 'Peru', identificationCode: 'PE' },
  { name: 'Philippines', identificationCode: 'PH' },
  { name: 'Pitcairn', identificationCode: 'PN' },
  { name: 'Poland', identificationCode: 'PL' },
  { name: 'Portugal', identificationCode: 'PT' },
  { name: 'Puerto Rico', identificationCode: 'PR' },
  { name: 'Qatar', identificationCode: 'QA' },
  { name: 'Reunion', identificationCode: 'RE' },
  { name: 'Romania', identificationCode: 'RO' },
  { name: 'Russian Federation', identificationCode: 'RU' },
  { name: 'RWANDA', identificationCode: 'RW' },
  { name: 'Saint Helena', identificationCode: 'SH' },
  { name: 'Saint Kitts and Nevis', identificationCode: 'KN' },
  { name: 'Saint Lucia', identificationCode: 'LC' },
  { name: 'Saint Pierre and Miquelon', identificationCode: 'PM' },
  { name: 'Saint Vincent and the Grenadines', identificationCode: 'VC' },
  { name: 'Samoa', identificationCode: 'WS' },
  { name: 'San Marino', identificationCode: 'SM' },
  { name: 'Sao Tome and Principe', identificationCode: 'ST' },
  { name: 'Saudi Arabia', identificationCode: 'SA' },
  { name: 'Senegal', identificationCode: 'SN' },
  { name: 'Serbia and Montenegro', identificationCode: 'CS' },
  { name: 'Seychelles', identificationCode: 'SC' },
  { name: 'Sierra Leone', identificationCode: 'SL' },
  { name: 'Singapore', identificationCode: 'SG' },
  { name: 'Slovakia', identificationCode: 'SK' },
  { name: 'Slovenia', identificationCode: 'SI' },
  { name: 'Solomon Islands', identificationCode: 'SB' },
  { name: 'Somalia', identificationCode: 'SO' },
  { name: 'South Africa', identificationCode: 'ZA' },
  { name: 'South Georgia and the South Sandwich Islands', identificationCode: 'GS' },
  { name: 'Spain', identificationCode: 'ES' },
  { name: 'Sri Lanka', identificationCode: 'LK' },
  { name: 'Sudan', identificationCode: 'SD' },
  { name: 'Suriname', identificationCode: 'SR' },
  { name: 'Svalbard and Jan Mayen', identificationCode: 'SJ' },
  { name: 'Swaziland', identificationCode: 'SZ' },
  { name: 'Sweden', identificationCode: 'SE' },
  { name: 'Switzerland', identificationCode: 'CH' },
  { name: 'Syrian Arab Republic', identificationCode: 'SY' },
  { name: 'Taiwan, Province of China', identificationCode: 'TW' },
  { name: 'Tajikistan', identificationCode: 'TJ' },
  { name: 'Tanzania, United Republic of', identificationCode: 'TZ' },
  { name: 'Thailand', identificationCode: 'TH' },
  { name: 'Timor-Leste', identificationCode: 'TL' },
  { name: 'Togo', identificationCode: 'TG' },
  { name: 'Tokelau', identificationCode: 'TK' },
  { name: 'Tonga', identificationCode: 'TO' },
  { name: 'Trinidad and Tobago', identificationCode: 'TT' },
  { name: 'Tunisia', identificationCode: 'TN' },
  { name: 'Turkmenistan', identificationCode: 'TM' },
  { name: 'Turks and Caicos Islands', identificationCode: 'TC' },
  { name: 'Tuvalu', identificationCode: 'TV' },
  { name: 'Uganda', identificationCode: 'UG' },
  { name: 'Ukraine', identificationCode: 'UA' },
  { name: 'United Arab Emirates', identificationCode: 'AE' },
  { name: 'United Kingdom', identificationCode: 'GB' },
  { name: 'United States', identificationCode: 'US' },
  { name: 'United States Minor Outlying Islands', identificationCode: 'UM' },
  { name: 'Uruguay', identificationCode: 'UY' },
  { name: 'Uzbekistan', identificationCode: 'UZ' },
  { name: 'Vanuatu', identificationCode: 'VU' },
  { name: 'Venezuela', identificationCode: 'VE' },
  { name: 'Viet Nam', identificationCode: 'VN' },
  { name: 'Virgin Islands, British', identificationCode: 'VG' },
  { name: 'Virgin Islands, U.S.', identificationCode: 'VI' },
  { name: 'Wallis and Futuna', identificationCode: 'WF' },
  { name: 'Western Sahara', identificationCode: 'EH' },
  { name: 'Yemen', identificationCode: 'YE' },
  { name: 'Zambia', identificationCode: 'ZM' },
  { name: 'Zimbabwe', identificationCode: 'ZW' }
]

interface Props {
  defaultValue?: CountryType
  onChange?: (val?: CountryType) => void
  width?: string
}
export function SelectCountry({
  defaultValue,
  onChange,
  width = "w-300px"
}: Props) {
  const [open, setOpen] = useState(false)
  const [token, settoken] = useState('')
  const [obj, setObj] = useState<CountryType | undefined>(defaultValue)
  const [list, setList] = useState<CountryType[]>(countryList)
  // const [value, setValue] = useState("")
  const [search, setSearch] = useState('')
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)


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
            {obj ? obj?.name : "Seçiniz..."}
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
              {list.map(e => (
                <CommandItem
                  key={e.identificationCode}
                  value={e.name}
                  onSelect={e => {
                    let choosen = list.find(k => k.name == e)
                    setObj(choosen)
                    if (onChange) onChange(choosen)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      obj?.identificationCode === e.identificationCode ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {e.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  </div>)
}