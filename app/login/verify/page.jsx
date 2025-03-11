'use client'
import InputOtp from '@/components/InputOtp';
import Timer from '@/components/Timer';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';



export default function OTPPage() {
  const [otp, setOtp] = useState("");
  const query = useSearchParams()
  const router = useRouter()
  const phone = query.get('phone')

  useEffect(() => {
    toast.success('کد با موفقیت ارسال شد')
  }, [])


  const handleOnChange = (value) => {
    setOtp(value);
    if (value.length === 4) {
      handleSubmit(value);
    }
  };

  const handleSubmit = async (otp) => {
    const res = await fetch("/api/verify-otp", {
      method: "POST",
      body: JSON.stringify({ phone, otp }),
    });
    const data = await res.json();
    if (data.success) router.push("/orders");
    else {
      toast.error('کد را اشتباه وارد!')
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center rounded-md w-10/12 md:w-5/12 bg-white text-center px-10 text-black py-7">
        <h1 className="text-2xl font-bold mb-4">کد تأیید را وارد کنید</h1>
        <p className="mb-3 text-gray-600">کد به شماره {phone} ارسال شد.</p>


        <InputOtp otp={otp} handleOnChange={handleOnChange} />
        <Timer />

      </div>
      <ToastContainer toastClassName={'pr-20'} />
    </div>

  );
}
