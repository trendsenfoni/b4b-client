import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function moneyFormat(x?: number, decimal: number = 2) {
  if (!x) {
    x = 0
  }
  let ondalik = 1
  Array.from(Array(decimal).keys()).forEach(() => ondalik = ondalik * 10)
  x = Math.round(ondalik * x) / ondalik
  let kusurat = Math.round(ondalik * (x - Math.floor(x))) / ondalik
  let s = x.toLocaleString("en-US")
  if (kusurat == 0) {
    s += '.' + '0'.repeat(decimal)
  } else if (kusurat.toString().split('0.')[1].length <= (decimal - 1)) {
    s += '0'.repeat(decimal - 1)
  }
  return s
  // return x.toLocaleString() + (x - Math.floor(x) == 0 ? '.00' : '')

}

export function currSymbol(currency?: string) {
  switch (currency) {
    case 'TL':
    case 'TRY':
      return '₺'
    case 'USD':
      return '$'
    case 'EUR':
    case 'EURO':
      return '€'
    default:
      return currency
  }
}

export function yesterday() {
  return new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().substring(0, 10)
}

export function today() {
  return new Date().toISOString().substring(0, 10)
}


export function paginationGenerator(count: number, page: number, total: number, ellipsis = '…') {
  const { floor, min, max } = Math
  const range = (lo: number, hi: number) => Array.from({ length: hi - lo }, (_, i) => i + lo)

  const start = max(1, min(page - floor((count - 3) / 2), total - count + 2))
  const end = min(total, max(page + floor((count - 2) / 2), count - 1))
  return [
    ... (start > 2 ? [1, ellipsis] : start > 1 ? [1] : []),
    ...range(start, end + 1),
    ... (end < total - 1 ? [ellipsis, total] : end < total ? [total] : [])
  ]
}