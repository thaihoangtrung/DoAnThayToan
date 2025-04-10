import React from 'react'
import UserTable from './components/list'
import BreadcrumbAdminCustom from '@/components/breadcrumbadmin'

export default function UserPage() {
  return (
    <>
      <BreadcrumbAdminCustom />
      <UserTable />
    </>
  )
}
