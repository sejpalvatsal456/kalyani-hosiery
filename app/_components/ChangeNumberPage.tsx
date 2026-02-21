import React, { FormEvent, useEffect, useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";

export default function ChangeNumberPage() {
  
  const [phone, setPhone] = useState<string>("");
  const [oldPhone, setOldPhone] = useState<string>("");

  const [isVerified, setIsVerified] = useState<boolean>(false);

  const [msg, setMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/user', {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: parseInt(phone) })
    });
    const data = await res.json();
    if(!res.ok) {
      setMsg(data.msg);
      setSuccess("");
      return;
    }
    setMsg("");
    setSuccess("Phone Updated Successfully.");  
    setOldPhone(phone);
  };

  useEffect(() => {
    fetch('/api/auth/me', {
      method: "GET",
      credentials: "include"
    })
    .then(res => res.json())
    .then(data => {
      console.log(data.data);
      if(data.data.phone) {
        setPhone(data.data.phone.toString());
        setOldPhone(data.data.phone.toString());
      }
    })
    .catch(err => console.log(err));
  }, []);


  return (
    <div className="flex h-full items-center justify-center">
      <div className="w-[90%] h-[90%] py-5 px-10 border-1 border-gray-300 shadow-lg">
        <h1 className="text-xl font-semibold">Change Password</h1>

        {/* Form */}
        <div className="flex flex-col w-[80%] h-[80%] justify-between">
          <div className="flex flex-col mt-10 gap-10 w-full">
            {/* Phone Number */}
            <div className="relative w-full ">
              <input
                type="text"
                placeholder=" "
                value={phone}
                id="numberInput"
                onChange={(e) => {
                  const value = e.target.value;
                  if(parseInt(value).toString() !== value && value.length > 0) 
                    return;
                  if(value === oldPhone || value.length < 10) {
                    setIsVerified(false);
                    setPhone(value);
                    return;
                  } else if (value.length === 10) {
                    setIsVerified(true);
                    setPhone(value);
                  }
                }}
                className="peer w-full border border-gray-300 rounded-md px-4 pt-5 pb-2 
							text-gray-800 focus:outline-none focus:border-gray-500"
              />

              <label
                htmlFor="numberInput"
                className={`
								absolute left-3 top-2 text-sm text-gray-500 transition-all
								peer-placeholder-shown:top-4 
								peer-placeholder-shown:text-base
								peer-focus:top-[-9]
								peer-focus:text-sm
								bg-white px-1
								${phone ? "top-[-9] text-sm" : "top-4 text-base"}
							`}
              >
                Phone Number
              </label>
            </div>
            
            {msg && <span className="text-red-500">{msg}</span>}
            {success && <span className="text-green-500">{success}</span>}
          </div>

          {/* Button */}
          <button
            onClick={handleSubmit}
            disabled={!isVerified}
            className={
              "w-full py-3 font-semibold text-lg text-white "
              + (isVerified ? "bg-[#ff3f6c] cursor-pointer" : "bg-[#8a223b] cursor-not-allowed")
            }
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
