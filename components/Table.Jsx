'use client'
import React, { useState } from 'react'
import { Pencil, Trash } from 'lucide-react';
import { convertToJalali } from '@/components/CovertToJalalli'
import covertToPersianInt from '@/components/covertToPersianInt'
import { useUser } from "@/context/UserContext"
import EditModal from "@/components/Modal/EditModal"
import DeleteModal from "@/components/Modal/DeleteModal"
import CreateModal from "@/components/Modal/CreateModal"
import AddNewProjectButton from '@/components/AddNewProjectButton'





export default function TableContent({ request }) {
  const { userData } = useUser()

  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const [isOpenCreate, setIsOpenCreate] = useState(false)

  const [id, setId] = useState('')


  const tableData = userData?.projects?.filter(item => item.status === request) || [];


  const updatedProjectsDate = tableData.map((project) => ({
    ...project,
    createdAtJalali: convertToJalali(project.createdAt)
  }));



  return (
    <div className="overflow-x-auto z-20 p-4">
      {updatedProjectsDate.length === 0 ? (
        <div className='w-full flex flex-col justify-center items-center'>
          <p> پروژه ای با عنوان {request == 'pending' && 'در حال برسی'}
            {request == 'approved' && "قبول شده"}
            {request == 'rejected' && "رد شده"} یافت نشد!
          </p>
          <p>
            {request == 'pending' && <button
              onClick={() => setIsOpenCreate(true)}
              className='rounded cursor-pointer underline underline-offset-4 font-bold text-purple-900 mt-10 '>ایجاد یک پروژه جدید</button>}
          </p>
        </div>
      )
        : (<table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-center">نام پروژه</th>
              <th className="py-3 px-6 text-center">قیمت</th>
              <th className="py-3 px-6 text-center">تاریخ درخواست</th>
              <th className="py-3 px-6 text-center">وضعیت</th>
              {
                request === 'pending'
                && (<th className="py-3 px-6 text-center">عملیات</th>)
              }

            </tr>
          </thead>


          <tbody className="text-gray-700 text-sm font-light">
            {updatedProjectsDate?.map((item) => (
              <tr key={item._id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-6 font-medium text-center">{item.name}</td>
                <td className="py-3 px-6 text-nowrap text-center">{covertToPersianInt(item?.price)} T</td>
                <td className="py-3 px-6 text-center">{covertToPersianInt(item.createdAtJalali)} </td>
                <td className="py-3 text-nowrap px-6 text-center">
                  <span className={`${request == 'pending' && "bg-blue-200 text-blue-700"} ${request == 'approved' && "bg-green-200 text-green-700"} ${request == 'rejected' && "bg-red-200 text-red-700"} py-1 px-3 rounded-full text-cenetr text-xs`}>
                    {request == 'pending' && 'در حال برسی'}
                    {request == 'approved' && "قبول شده"}
                    {request == 'rejected' && "رد شده"}
                  </span>
                </td>
                {
                  request === 'pending'
                  && (<td className="py-3 flex justify-between sm:justify-center px-6 text-center">
                    <button
                      onClick={() => {
                        setIsOpenEdit(true)
                        setId(item?._id)
                      }}
                      className="cursor-pointer hover:bg-gray-300 px-2 py-1 rounded-lg text-xs">
                      <Pencil size={20} color="#4332c3" strokeWidth={1.25} />
                    </button>
                    <button
                      onClick={() => {
                        setIsOpenDelete(true)
                        setId(item?._id)
                      }}
                      className="px-2 py-1 cursor-pointer hover:bg-gray-300 rounded-lg text-xs ml-2">
                      <Trash size={20} color="#ff2424" strokeWidth={1.25} />
                    </button>
                  </td>)
                }
              </tr>
            ))
            }
          </tbody>

        </table>)
      }

      {
        isOpenCreate && <CreateModal
          setIsOpen={setIsOpenCreate}
        />}
      {
        isOpenEdit && <EditModal
          setIsOpen={setIsOpenEdit}
          content={updatedProjectsDate.filter(item => item._id === id)}
        />}
      {
        isOpenDelete && <DeleteModal
          setIsOpen={setIsOpenDelete}
          content={updatedProjectsDate.filter(item => item._id === id)}
        />}
      {
        request === 'pending' && <AddNewProjectButton setIsOpenCreate={setIsOpenCreate} />
      }
    </div >
  )
}
