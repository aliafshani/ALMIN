'use client'

import Navbar from "@/components/Navbar"
import { useUser } from "@/context/UserContext"
import Link from "next/link"
import covertToPersianInt from "@/components/covertToPersianInt"




function UserProfilePage() {
  const { userData, loading } = useUser()

  if (!userData) {
    return <div>در حال بارگذاری...</div>;
  }


  const walletCalculator = (userData) => {
    let successedProjects = userData?.projects?.filter(item => item.status === "approved") || [];
    let wallet = successedProjects.reduce((total, item) => total + item.price, 0);
    return wallet
  }
  let wallet = walletCalculator(userData)



  return (
    <Navbar>

      <div className="flex flex-row justify-evenly items-center">
        <div className="w-2/12  text-white bg-purple-500 p-4 rounded-md">
          <p className="font-bold text-xl">دسترسی سریع</p>
          <ul>
            <li className="my-5">
              <Link href={'user-profile/pending'}>پروژه های در حال برسی </Link>
            </li>
            <li className="my-5">
              <Link href={'user-profile/approved'} >پروژه های قبول شده</Link>
            </li>
            <li className="my-5">
              <Link href={'user-profile/rejected'}>پروژه های رد شده</Link>
            </li>
          </ul>
        </div>

        <div className="w-4/12 bg-purple-500 p-4 rounded-md">

          <div className="flex justify-center">
            {loading && <p>در حال بارگذاری...</p>}
            {!userData.phone && <p>کاربر وارد نشده است.</p>}
            {userData.phone && <p> سلام بر {userData.phone}</p>}

          </div>
        </div>


        <div className="w-3/12 bg-purple-500 p-4 rounded-md flex flex-col items-center justify-center">
          <div className="flex justify-between w-10/12 py-4 border-white border-dashed border-b-2">
            <p className="text-white text-xl font-semibold"> حساب : </p>
            <p className="text-xl pr-2">{covertToPersianInt(wallet)} T</p>
          </div>
          <div className="flex justify-between w-10/12  border-white  py-4 border-b-2">
            <p className="text-white "> پروژه های کل : </p>
            <p className="text-xl pr-2"> {userData.projects?.length} </p>
          </div>
          <div className="flex justify-between w-10/12  border-white py-4 border-b-2">
            <p className="text-white"> پروژه های تایید شده : </p>
            <p className="text-xl pr-2">
              {userData.projects?.filter(item => item?.status == 'approved').length}
            </p>
          </div>
          <div className="flex justify-between  border-white w-10/12 py-4">
            <p className="text-white ">پروژه های در انتظار تایید : </p>
            <p className="text-xl pr-2">
              {userData.projects?.filter(item => item?.status == 'pending').length}
            </p>
          </div>
        </div>

      </div>


    </Navbar>
  )
}

export default UserProfilePage
