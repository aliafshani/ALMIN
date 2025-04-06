'use client'

import React, { useState } from 'react'

export default function SubmitInput({ clicked }) {


  return (
    <button
      type="submit"
      className="mt-4 px-6 py-2 bg-fuchsia-800 text-white rounded-md hover:bg-fuchsia-950 transition-all"
    >
      {clicked ? "در حال ارسال..." : "دریافت کد"}
    </button>
  )
}
