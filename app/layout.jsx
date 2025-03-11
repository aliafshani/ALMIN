import React from 'react'
import "@/app/globals.css";


export default function AccountLayout({ children }) {
  return (
    <html>
      <body className='bg-purple-900'>
        {children}
      </body>
    </html >
  )
}
