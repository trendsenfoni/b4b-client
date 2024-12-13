"use client"

import * as React from "react"
import { ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useEffect, useState } from 'react'

interface Props {
  title?: string
  storageKey: string
  children?: React.ReactNode | any
  className?: string
  defaultOpen?: boolean
}
export function CollapsePanel({ title, storageKey, children, className, defaultOpen }: Props) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  useEffect(() => {
    if (typeof window != 'undefined') {
      if (localStorage.getItem(`panelOpen_${storageKey}`) == 'true') {
        setIsOpen(true)
      }
    }
  }, [])
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={e => {
        setIsOpen(e)
        if (typeof window != 'undefined') {
          localStorage.setItem(`panelOpen_${storageKey}`, e ? 'true' : 'false')
        }
      }}
      className="w-full space-y-0 "
    >
      <div className="">
        <CollapsibleTrigger asChild>
          <div className='cursor-pointer flex items-center justify-between space-x-4 px-4 bg-secondary rounded-md'>
            <h4 className="text-sm font-semibold">
              {title}
            </h4>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </div>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className={`w-full border border-dashed border-opacity-100 rounded-md p-2 ${className} `}>
        {children}
      </CollapsibleContent>
    </Collapsible>
  )
}
