"use client";

import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";

export default function VerifyPhoneClient({
  callbackUrl,
}: {
  callbackUrl?: string;
}) {
  const router = useRouter();

  const [number, setNumber] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [isPhoneValid, setIsPhoneValid] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");
  const [isMsgError, setIsMsgError] = useState<boolean>(false);
  const [isOTPRequested, setIsOTPRequested] = useState<boolean>(false);
  const [isOTPValid, setIsOTPValid] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(0);
  const [isCounting, setIsCounting] = useState<boolean>(false);


  const handleOTPRequest = async () => {
    setMsg("");
    const res = await fetch(`/api/auth/requestOTP?number=${number}`);
    const data = await res.json();
    if (!res.ok) {
      setMsg(data.msg);
      setIsMsgError(true);
      setIsOTPRequested(false);
      return;
    }
    // console.log("Requested an OTP")
    setIsOTPRequested(true);
    setCounter(60);
    setIsCounting(true);
  };

  const handleOTPVerify = async () => {
    setMsg("");
    const res = await fetch(`/api/auth/verifyOTP?number=${number}&otp=${otp}`);
    const data = await res.json();
    if (!res.ok) {
      setMsg(data.msg);
      setIsMsgError(true);
      setIsVerified(false);
      return;
    }
    setIsVerified(true);
    setMsg(data.data.Details);
    setIsMsgError(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    setMsg("");
    e.preventDefault();
    const res = await fetch("/api/auth/tempPhone", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ number: number }),
    });
    const data = await res.json();
    if (!res.ok) {
      setMsg(data.msg);
      setIsMsgError(true);
      return;
    }
    console.log(data.data);
    router.push(
      `/auth/signup?callbackUrl=${encodeURIComponent(callbackUrl || "")}`,
    );
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isCounting && counter > 0) {
      timer = setInterval(() => {
        setCounter((prev) => prev - 1);
      }, 1000);
    }

    if (counter === 0 && isCounting) {
      setIsCounting(false);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isCounting, counter]);

  return (
    <div className="w-[100vw] h-[100vh] bg-[linear-gradient(45deg,_#faeaf1,_#fcf0e2)] flex items-center justify-center">
      {/* gradient from - #faeaf1 to #fcf0e2 */}

      <div className="bg-white p-10 rounded w-[80vw] md:w-[30vw] min-h-[50vh]">
        <h1 className="text-2xl font-semibold mb-10">Verify Phone</h1>
        <form className="flex flex-col">
          <input
            type="number"
            name="phone"
            id="phoneInput"
            placeholder="Mobile Number... "
            value={number}
            onChange={(e) => {
              const value = e.target.value;
              if (value[0] === "0") {
                setIsPhoneValid(false);
                return;
              }

              if (isNaN(parseInt(value))) {
                setIsPhoneValid(false);
                return;
              }
              if (parseInt(value).toString().length == 10) {
                console.log(value);
                setNumber(value);
                setIsPhoneValid(true);
                return;
              } else if (parseInt(value).toString().length > 10) {
                return;
              } else {
                setIsPhoneValid(false);
                setNumber(value);
              }
            }}
            className="border-1 border-gray-300 focus:border-gray-500 focus:outline-none text-gray-500 text-md py-2 pl-5 rounded"
          />

          <button
            type="button"
            onClick={handleOTPRequest}
            disabled={!isPhoneValid || isCounting}
            className={
              "self-start mt-5 font-semibold " +
              (!isPhoneValid || isCounting
                ? "text-gray-500 cursor-not-allowed"
                : "text-blue-400 cursor-pointer")
            }
          >
            {!isOTPRequested
              ? "GET OTP"
              : isCounting
                ? `RESEND OTP in ${counter}s`
                : "RESEND OTP"}
          </button>

          <input
            type="number"
            name="otp"
            id="otpInput"
            placeholder="Enter OTP... "
            className="border-1 border-gray-300 focus:border-gray-500 focus:outline-none text-gray-500 text-md py-2 pl-5 rounded mt-5"
            onChange={(e) => {
              const value = e.target.value;
              if (isNaN(parseInt(value))) {
                setIsOTPValid(false);
                return;
              }
              if (value.length > 6) {
                return;
              }
              if (value.length === 6) {
                setIsOTPValid(true);
              } else {
                setIsOTPValid(false);
              }
              setOtp(value);
            }}
          />

          <button
            type="button"
            onClick={handleOTPVerify}
            disabled={!isPhoneValid || !isOTPRequested || !isOTPValid}
            className={
              "self-start mt-5 font-semibold " +
              (!isPhoneValid || !isOTPRequested || !isOTPValid
                ? "text-gray-500 cursor-not-allowed disabled"
                : "text-blue-400 cursor-pointer")
            }
          >
            VERIFY OTP
          </button>

          <button
            type="submit"
            disabled={!isVerified}
            className={
              "py-2 mt-4 text-lg font-semibold transition-all duration-200 " +
              (!isVerified
                ? "bg-gray-500 cursor-not-allowed text-white disabled"
                : "bg-[#ff406c] text-white cursor-pointer")
            }
            onClick={handleSubmit}
          >
            Continue
          </button>
        </form>
        <span
          className={
            "text-md inline-block mt-2 " +
            (isMsgError ? "text-red-500" : "text-green-500")
          }
        >
          {msg}
        </span>
        <p className="mt-5">
          <span>Already have an Account? </span>
          <span
            className="font-medium text-blue-500 cursor-pointer"
            onClick={() =>
              router.push(
                `/auth/login?callbackUrl=${encodeURIComponent(callbackUrl || "")}`,
              )
            }
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
