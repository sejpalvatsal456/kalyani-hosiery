"use client";

import { useRouter } from 'next/router';
import React, { FormEvent, useState } from 'react'

export default function VerifyPhoneClient(
    { callbackUrl }: { callbackUrl: string; }
) {
    const router = useRouter();

    const [number, setNumber] = useState<string>("");
    const [isVerified, setIsVerified] = useState<boolean>(false);

    const handleSubmit = async(e:FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/auth/tempPhone', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ number: number })
            });
        const data = await res.json();
        if(!res.ok) {
            alert(data.error);
            return;
        }
        console.log(data.data);
        router.push(`/auth/signup?callbackUrl=${encodeURIComponent(callbackUrl || "")}`);
    }

    return (
    <div className='w-[100vw] h-[100vh] bg-[linear-gradient(45deg,_#faeaf1,_#fcf0e2)] flex items-center justify-center'>
        {/* gradient from - #faeaf1 to #fcf0e2 */}
        
        <div className='bg-white p-10 rounded w-[80vw] md:w-[30vw] h-[50vh]'>
            <h1 className='text-2xl font-semibold mb-10'>Verify Phone</h1>
            <form className='flex flex-col'>
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

                <button
                    type="submit"
                    disabled={!isVerified}
                    className={
                        'py-2 mt-4 text-lg font-semibold transition-all duration-200 ' 
                        + (!isVerified ? "bg-gray-500 cursor-not-allowed text-white disabled" : "bg-[#ff406c] text-white cursor-pointer")}
                    onClick={handleSubmit}
                >
                    Continue
                </button>

            </form>
            <p className='mt-5'>
                <span>Already have an Account?</span>
                <span className='font-medium text-blue-500 cursor-pointer' onClick={() => router.push(`/auth/login?callbackUrl=${encodeURIComponent(callbackUrl || "")}`)}>Login</span>
            </p>
        </div>

    </div>
    )
}
