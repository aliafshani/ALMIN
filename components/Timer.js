'use client'
import React, { useEffect, useState } from 'react'

export default function Timer({ }) {
  const [timeLeft, setTimeLeft] = useState(120);

  useEffect(() => {
    if (timeLeft <= 0) {
      return;
    };


    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);


  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className='mt-10 text-fuchsia-800'>

      {timeLeft !== 0
        ? <p >برای دریافت مجدد کد {minutes}:{seconds < 10 ? `0${seconds}` : seconds}  صبر کنید</p>
        : <button className='cursor-pointer' onClick={() => setTimeLeft(120)}>برای دریافت مجدد کد کلیک کنید</button>
      }
    </div >

  );
}
