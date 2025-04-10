import React from 'react'
import ProductsPageUI from './components/list'
import BreadcrumbAdminCustom from '@/components/breadcrumbadmin'

export default function ProductsPage() {
  return (
    <>
      <BreadcrumbAdminCustom />
      <ProductsPageUI />
    </>
  )
}
