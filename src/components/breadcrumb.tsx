import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export interface PathItem {
  href?: string
  children?: any
}
interface Props {
  list?: PathItem[]
  store: string
}
export function BreadcrumbAbi({ store, list = [] }: Props) {
  return (
    <Breadcrumb className='mx-3 mt-1 mb-0 md:mb-4'>
      <BreadcrumbList>
        <BreadcrumbItem key={`breadcrumb-item-home`}>
          <BreadcrumbLink href={`/${store}/home`}><i className="fa-solid fa-house-chimney-window"></i></BreadcrumbLink>
        </BreadcrumbItem>
        {list.map((e, index) => <div key={`breadcrumb-item-${index}`} className='flex justify-start items-center gap-2'>
          <BreadcrumbSeparator />
          <BreadcrumbItem >
            {index < list.length - 1 && <BreadcrumbLink href={`/${store}/${e.href}`}>{e.children}</BreadcrumbLink>}
            {index == list.length - 1 && <BreadcrumbPage>{e.children}</BreadcrumbPage>}
          </BreadcrumbItem>
        </div>)}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
