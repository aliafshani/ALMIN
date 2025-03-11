'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function OrdersPage() {
  let route = useRouter()
  let name = usePathname()
  console.log(name);

  useEffect(() => {

    route.push('/orders/followed-up')

  }, [])

  return
}
