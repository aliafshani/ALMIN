import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'

export default function EditModal({ setIsOpen }) {


  const [newName, setNewName] = useState("")
  const [newPrice, setNewPrice] = useState("")
  const [newDiscription, setNewDiscription] = useState("")

  const submitHandler = async (event) => {
    event.preventDefault()

    if (newName === "" || newPrice === "" || newDiscription === "") {
      toast.error('هیچ ثبت نشد!')
      setIsOpen(false)
    }



    try {
      const response = await fetch(`http://localhost:5000/api/projects/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name: newName, description: newDiscription, price: newPrice }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success("پروژه با موفقیت ثبت شد.");
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
        <div className="bg-white p-6 rounded-lg shadow-lg sm:w-6/12 w-full mx-auto relative">
          <form className="flex flex-col items-center my-10 justify-center" onSubmit={submitHandler}>
            <p className='text-xl text-right mb-10'>
              ساخت پروژه جدید
            </p>

            <div className='flex flex-col w-8/12 justify-center items-start'>
              <label className='text-purple-700' htmlFor="name">اسم پروژه:</label>
              <input
                id='name'
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full p-3 mt-1 mb-5 text-right border-2 border-gray-300 focus:border-fuchsia-800 outline-none rounded-md transition-all"
              />
            </div>


            <div className='flex flex-col w-8/12 justify-center items-start'>
              <label className='text-purple-700' htmlFor="name"> قیمت:</label>
              <input
                id='name'
                type="number"
                value={newPrice}
                onChange={e => setNewPrice(e.target.value)}
                className="w-full p-3 mt-1 mb-5 text-right border-2 border-gray-300 focus:border-fuchsia-800 outline-none rounded-md transition-all"
              />
            </div>

            <div className="flex flex-col w-8/12 justify-center items-start">
              <label className='text-purple-700' htmlFor="discription">توضیحات : </label>
              <textarea
                id="discription"
                rows="4"
                className="w-full text-sm text-gray-900 bg-white border-2 border-gray-300 rounded-md p-2 mt-1 focus:border-fuchsia-800 "
                value={newDiscription}
                onChange={e => setNewDiscription(e.target.value)} />
            </div>


            <div className='w-8/12 flex flex-row mt-10 justify-around'>
              <button
                type="submit"
                className="mt-4 cursor-pointer w-20 px-6 py-2 bg-fuchsia-800 text-white rounded-md hover:bg-fuchsia-900 transition-all"
              > ثبت </button>
              <button
                onClick={() => setIsOpen(false)}
                className=" w-20 bg-red-500 cursor-pointer text-white mt-4 px-6 py-2 rounded-md hover:bg-red-600">
                بستن
              </button>
            </div>


          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}
