import React from 'react'
import { Plus } from 'lucide-react';


export default function AddNewProjectButton({ setIsOpenCreate }) {
  return (
    <div className='w-full h-20 flex justify-center items-center'>
      <button
        onClick={() => setIsOpenCreate(true)}
        className='bg-purple-900 cursor-pointer text-white rounded-full flex justify-center items-center w-10 h-10'>
        <Plus />
      </button>
    </div>
  )
}
