"use client"

import ButtonLink from '@/components/button-link'
import { Button } from '@/components/ui/button'


export default function SettingsPage() {

  return (
    <div className='flex flex-col gap-4'>
      <h1>Ayarlar</h1>
      <hr />

      <ButtonLink href='/adminUsers'>Admin Users</ButtonLink>


    </div>
  )
}

