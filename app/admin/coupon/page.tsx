import React from 'react'
import CouponManagement from './components/list'
import BreadcrumbAdminCustom from '@/components/breadcrumbadmin'

export default function CouponManagementpage() {
  return (
    <>
      <BreadcrumbAdminCustom />
      <CouponManagement />
    </>
  )
}
