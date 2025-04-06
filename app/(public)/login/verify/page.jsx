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
    if (otp.length === 4) {
      const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp }),
      });

      const data = await res.json();
      if (data.success) {
        router.push("/user-profile");
        localStorage.setItem('token', data.token)


      }
      else {
        toast.error('کد را اشتباه وارد!')
      }

    }
    else {
      toast.success('کد جدید برای شما ارسال شد')
    }

  };

  const sendOtpAgainHandler = async () => {
    const res = await fetch("http://localhost:5000/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });

    const data = await res.json();
    if (data.success) {
      toast.success('کد برای شما ارسال شد.')
    } else {
      toast.error('خطایی رخ داد ! لطفا دوباره تلاش کنید');
      router.push(`/login`);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center rounded-md w-10/12 md:w-5/12 bg-white text-center px-10 text-black py-7">
        <h1 className="text-2xl font-bold mb-4">کد تأیید را وارد کنید</h1>
        <p className="mb-3 text-gray-600">کد به شماره {phone} ارسال شد.</p>


        <InputOtp otp={otp} handleOnChange={handleOnChange} />
        <Timer sendOtpAgain={sendOtpAgainHandler} />

      </div>
      <ToastContainer toastClassName={'pr-20'} />
    </div>

  );
}
