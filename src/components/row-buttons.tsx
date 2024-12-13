import Link from 'next/link'

interface Props {
  href?: string
  onClick?: () => void
  className?: string
}

export function ButtonBack({
  href = '#',
  onClick,
  className
}: Props) {
  return (
    <Link
      className={`px-2 py-1 border rounded ${className}`}
      href={href}
      onClick={() => onClick && onClick()}>
      <i className='fa-solid fa-chevron-left'></i>
    </Link>
  )
}

export function RowButtonEdit({
  href = '#',
  onClick,
  className
}: Props) {
  return (
    <Link
      className={`px-2 py-1 bg-purple-500 text-white  rounded-sm ${className}`}
      href={href}
      onClick={() => onClick && onClick()}>
      <i className="fa-solid fa-edit"></i>
    </Link>
  )
}

export function RowButtonView({
  href = '#',
  onClick,
  className
}: Props) {
  return (
    <Link
      className={`px-2 py-1 bg-emerald-600 text-white  rounded-sm ${className}`}
      href={href}
      onClick={() => onClick && onClick()}>
      <i className="fa-solid fa-eye"></i>
    </Link>
  )
}

export function RowButtonAddNew({
  href = '#',
  onClick,
  className
}: Props) {
  return (
    <Link
      className={`px-2 py-1 bg-green-700 text-white rounded-sm h-9 ${className}`}
      href={href}
      onClick={() => onClick && onClick()}>
      <i className="fa-solid fa-square-plus"></i>
    </Link>
  )
}

export function RowButtonRemove({
  href = '#',
  onClick,
  className
}: Props) {
  return (
    <Link
      className={`px-2 py-1 bg-red-700 text-white rounded-sm ${className}`}
      href={href}
      onClick={() => onClick && onClick()}>
      <i className="fa-solid fa-trash-alt"></i>
    </Link>
  )
}