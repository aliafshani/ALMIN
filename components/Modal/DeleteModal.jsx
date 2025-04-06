import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'

export default function DeleteModal({ setIsOpen, content }) {
  const contentItem = content[0]


  const [newName, setNewName] = useState(contentItem.name)

  const submitDeleteHandler = async () => {

    try {
      const response = await fetch(`http://localhost:5000/api/projects/${contentItem._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        toast.success("پروژه با موفقیت حذف شد.");
        setIsOpen(false)
        window.location.reload()
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("خطایی رخ داده است.");
      console.error(error);
    }
  };



  return (
    <>
      <div
        className="fixed inset-0 flex items-center justify-center bg-purple-900/80 sm:px-0 px-6">
        <div className="bg-white p-6 rounded-lg shadow-lg sm:w-6/12 w-full mx-auto">

          <p className='text-xl text-center mb-10'>
            آیا از پاک کردن <span className='font-bold text-red-500'>{contentItem.name}</span> اطمینان دارید؟
          </p>




          <div className='w-8/12 flex flex-row mt-10 justify-around mx-auto'>
            <button
              onClick={() => submitDeleteHandler()}
              className="mt-4 cursor-pointer w-20 px-6 py-2 bg-fuchsia-800 text-white rounded-md hover:bg-fuchsia-900 transition-all"
            > تایید </button>
            <button
              onClick={() => setIsOpen(false)}
              className=" w-20 bg-red-500 cursor-pointer text-white mt-4 px-6 py-2 rounded-md hover:bg-red-600">
              بستن
            </button>
          </div>



        </div>
      </div>
      <ToastContainer />
    </>
  )
}
