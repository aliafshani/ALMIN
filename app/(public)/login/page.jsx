"use client";
import SubmitInput from "@/components/submitInput";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';


export default function PhoneNumberPage() {
  const [clicked, setClicked] = useState(false)
  const [phone, setPhone] = useState("");
  const router = useRouter()

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const phoneRegax = /^09[0-9]{9}$/;



  const handleSubmit = async (event) => {
    event.preventDefault();
    const isVallid = phoneRegax.test(phone)
    if (phone.length === 11 && isVallid) {
      setClicked(true)

      const res = await fetch("http://localhost:5000/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const data = await res.json();
      if (data.success) {
        router.push(`/login/verify?phone=${phone}`);
      } else {
        toast.error('خطایی رخ داد ! لطفا دوباره تلاش کنید');
        router.push(`/login`);
      }
    } else {
      toast.warn('شماره تلفن خود را به درستی وارد کنید!')
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center rounded-md w-10/12 md:w-5/12 bg-white text-center px-10 text-black py-7">
        <h1 className="text-2xl font-bold mb-4">ورود با شماره موبایل</h1>
        <p className="mb-3 text-gray-600">شماره خود را وارد کنید تا کد ارسال شود.</p>

        <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit}>
          <input
            type="tel"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="مثلاً 09123456789"
            className="w-64 p-3 text-center border-2 border-gray-300 focus:border-fuchsia-800 outline-none rounded-md transition-all"
          />

          <SubmitInput clicked={clicked} />
        </form>
      </div>
      <ToastContainer />
    </main>
  );
}
