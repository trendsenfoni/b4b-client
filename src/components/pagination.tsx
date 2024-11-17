"use client"

import { PaginationType } from '@/types/PaginationType'
import Link from 'next/link'
import React, { FC, useEffect, useState } from "react"
import { paginationGenerator } from '@/lib/utils'

interface PaginationProps {
  className?: string
  pagination?: PaginationType

  onPageClick?: Function
}

const Pagination: FC<PaginationProps> = ({
  className = "",
  pagination,
  onPageClick
}) => {
  // const buttonList = Array.from(Array(pagination?.pageCount).keys())
  const buttonList = paginationGenerator(5, pagination?.page || 1, pagination?.pageCount || 0, '...')


  return (
    <div className={`flex flex-row w-full items-center justify-between gap-1 text-xs md:gap-2 md:text-base font-medium`}>
      <div className='flex flex-row items-center justify-center gap-2 px-2 py-2 rounded-md border border-dashed text-gray-500 w-22'
        title={`Total Documents:${pagination?.totalDocs}`}>
        <div>{pagination?.totalDocs}</div>
        <div><i className="fa-solid fa-book-open"></i></div>
      </div>
      <div className='flex flex-row items-center gap-2 text-xs md:text-base'>
        {buttonList.map((no, index) => {
          if (no == '...') {
            return <span
              key={index}
              className={`w-6 h-6 md:w-11 md:h-11 text-center pt-0 text-gray-400 dark:text-gray-400`}
            >
              {no}
            </span>
          } else if (no == pagination?.page) {
            return <span
              key={index}
              className={`inline-flex text-[9px] md:text-base w-8 h-8 md:w-11 md:h-11 items-center justify-center rounded-full bg-primary text-gray-400 dark:text-gray-400`}
            >
              {no}
            </span>
          } else {
            return <Link
              href="#"
              key={index}
              className={`inline-flex text-[9px] md:text-base w-8 h-8 md:w-11 md:h-11 items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-300 border border-neutral-900 text-neutral-600 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700`}
              onClick={(e) => {
                e.preventDefault()
                if (onPageClick != undefined) {
                  onPageClick(Number(no))
                }
              }}
            >{no}</Link>
          }
        })}
      </div>

    </div>
  )
}

export default Pagination
