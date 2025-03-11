'use client'
import OTPInput from "react-otp-input";


export default function InputOtp({ otp, handleOnChange }) {
  return (
    <OTPInput
      value={otp}
      onChange={(value) => handleOnChange(value)}
      shouldAutoFocus
      numInputs={4}
      inputType="number"
      renderInput={(props) => (
        <input
          {...props}
          style={{ width: '2.5rem' }}
          className="w-12 h-12 text-center text-xl mx-3 border-2 border-gray-300 focus:border-fuchsia-800 outline-none rounded-md transition-all"
        />
      )}
    />
  );
}
