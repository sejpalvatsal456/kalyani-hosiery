"use client";

import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

export default function page() {

  const router = useRouter();

  // States for user Inputs
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordOpen, setIsPasswordOpen] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");

  const handleSubmit = async(e:FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ phone: number, password: password })
    });
    
    const data = await res.json();
    if(!res.ok) {
        setMsg(data.msg);
        return;
    }
    router.push("/");
  }

  return (
    <div className='w-[100vw] h-[100vh] bg-[linear-gradient(45deg,_#faeaf1,_#fcf0e2)] flex items-center justify-center'>
      <div className='bg-white p-10 rounded w-[30vw] min-h-[50vh]'>
        <h1 className='text-2xl font-semibold mb-10'>Login</h1>
        <form className='flex flex-col gap-5'>

          {/* Phone Input */}
          <input
                    type="number"
                    name="phone"
                    id="phoneInput"
                    placeholder='Mobile Number... '
                    value={number}
                    onChange={e => {
                        const value = e.target.value;
                        if(value[0] === '0') {
                            setIsVerified(false);
                            return;
                        }
                        
                        if(isNaN(parseInt(value))) {
                            setIsVerified(false);
                            return;
                        };
                        if(parseInt(value).toString().length == 10)  {
                            console.log(value);
                            setNumber(value);
                            setIsVerified(true);
                            return;
                        } else if(parseInt(value).toString().length > 10) {
                            return;
                        } else {
                            setIsVerified(false);
                            setNumber(value);
                        }
                        
                    }} 
                    className='border-1 border-gray-300 focus:border-gray-500 focus:outline-none text-gray-500 text-md py-2 pl-5 rounded'
                />

          {/* Password Input */}
          <div className='flex flex-row border-1 border-gray-300 focus-within:border-gray-500 rounded'>
            <input
              type={isPasswordOpen ? "text" : "password"}
              name="password"
              id="passwordInput"
              placeholder='Password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              className='w-full focus:outline-none text-gray-500 text-md py-2 pl-5'
            />
            <div
              className='w-15 flex justify-center items-center'
              onClick={e => setIsPasswordOpen(!isPasswordOpen)}
            >
              {isPasswordOpen
              ? <FaRegEyeSlash />
              : <FaRegEye /> }
            </div>
          </div>


          <span className='text-red-500'>{msg}</span>

          {/* Submit Button */}
          <button
            disabled={!isVerified}
            onClick={handleSubmit}
            className={
              'py-2 mt-4 text-lg font-semibold transition-all duration-200 ' 
              + (!isVerified ? "bg-gray-500 cursor-not-allowed text-white disabled" : "bg-[#ff406c] text-white cursor-pointer")}
          >Login</button>

        </form>
      </div>
    </div>
  )
}
