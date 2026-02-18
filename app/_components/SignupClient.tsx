"use client";

import { useRouter } from 'next/router';
import React, { FormEvent, useEffect, useState } from 'react'
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';

export default function SignupClient(
    { callbackUrl }: { callbackUrl: string }
) {
  const router = useRouter();

  // States for user Inputs
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordOpen, setIsPasswordOpen] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isConfirmPasswordOpen, setIsConfirmPasswordOpen] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");

  useEffect(() => {
    if (password === '' || confirmPassword === ''){
      setIsVerified(false);
      setMsg("");
      return;
    }
    if (password !== confirmPassword){
      setIsVerified(false);
      setMsg("Password doesn't match.");
      return;
    }
    setMsg("");
    setIsVerified(true);
  }, [password, confirmPassword]);

  const handleSubmit = async(e:FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/signup', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, password: password, address: "" })
    });
    const data = await res.json();
    if(!res.ok) {
      setMsg(data.msg);
      return;
    }
    router.push(callbackUrl || '/');
  }

  return (
    <div className='w-[100vw] h-[100vh] bg-[linear-gradient(45deg,_#faeaf1,_#fcf0e2)] flex items-center justify-center'>
      <div className='bg-white p-10 rounded w-[80vw] md:w-[30vw] min-h-[50vh]'>
        <h1 className='text-2xl font-semibold mb-10'>SignUp</h1>
        <form className='flex flex-col gap-5'>

          {/* Name Input */}
          <input
            type="text"
            name="name"
            id="nameInput"
            placeholder='Name'
            value={name}
            onChange={e => setName(e.target.value)}
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

          {/* Confirmation Password Input */}
          <div className='flex flex-row border-1 border-gray-300 focus-within:border-gray-500 rounded'>
            <input
              type={isConfirmPasswordOpen ? "text" : "password"}
              name="password"
              id="passwordInput"
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className='w-full focus:outline-none text-gray-500 text-md py-2 pl-5'
            />
            <div
              className='w-15 flex justify-center items-center'
              onClick={e => setIsConfirmPasswordOpen(!isConfirmPasswordOpen)}
            >
              {isConfirmPasswordOpen
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
          >Signup</button>

        </form>
        <p className='mt-5'>
          <span>Already have an Account?</span>
          <span className='font-medium text-blue-500 cursor-pointer' onClick={() => router.push(`/auth/login?callbackUrl=${encodeURIComponent(callbackUrl || "")}`)}>Login</span>
        </p>
      </div>
    </div>
  )
}
