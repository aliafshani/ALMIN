'use client'

import Navbar from '@/components/Navbar'
import { useUser } from "@/context/UserContext"
import { TableSkeleton } from '@/components/LoaderSkeleton'
import TableContent from '@/components/Table'
import React from 'react'
import { notFound, useParams } from 'next/navigation'

export default function PendingPage() {
  const { loading } = useUser()
  const { request } = useParams()
  const allowedRoutes = ["pending", "approved", "rejected"]; // مسیرهای مجاز

  if (!allowedRoutes.includes(request)) {
    notFound(); // نمایش صفحه 404
  }





  return (
    <Navbar>
      {loading
        ? <TableSkeleton />
        : <TableContent loading={loading} request={request} />
      }
    </Navbar>
  )
}
