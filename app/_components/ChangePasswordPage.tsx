"use client";

import { User } from "firebase/auth";
import React, { FormEvent, useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ChangePasswordPage() {
  
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [oldPasswordEye, setOldPasswordEye] = useState<boolean>(false);
  const [newPasswordEye, setNewPasswordEye] = useState<boolean>(false);
  const [confirmPasswordEye, setConfirmPasswordEye] = useState<boolean>(false);
  const [passwordMatched, setPasswordMatched] = useState<boolean>(false);


  const [msg, setMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async(e:FormEvent) => {
    e.preventDefault();
    if(oldPassword === "" || newPassword === "" || confirmPassword === "") {
      setMsg("Fill all the fields.");
      return;
    }
    const res = await fetch('/api/user/', {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ oldPassword: oldPassword, newPassword: newPassword })
    });
    const data = await res.json();
    if(!res.ok) {
      setMsg(data.msg);
      setSuccess(null);
      return;
    }
    setMsg(null);
    setSuccess("Password Changed Successfully");
  };

  useEffect(() => {
    if (newPassword === "" || confirmPassword === "") {
      setMsg(null);
      setPasswordMatched(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setMsg("New Password and Confirm Password aren't same.");
      setPasswordMatched(false);
      return;
    }
    setMsg(null);
    setSuccess(null);
    setPasswordMatched(true);


  }, [newPassword, confirmPassword]);

  return (
    <div className="flex h-full items-center justify-center">
      <div className="w-[90%] h-[90%] py-5 px-10 border-1 border-gray-300 shadow-lg">
        <h1 className="text-xl font-semibold">Change Password</h1>

        {/* Form */}
        <div className="flex flex-col w-[80%] h-[80%] justify-between">
          <div className="flex flex-col mt-10 gap-10 w-full">
            {/* Old Password */}
            <div className="relative w-full flex border border-gray-300 rounded-md">
              <input
                type={oldPasswordEye ? "text" : "password"}
                placeholder=" "
                value={oldPassword}
                id="oldPasswordInput"
                onChange={(e) => setOldPassword(e.target.value)}
                className="peer w-full px-4 pt-5 pb-2 
							text-gray-800 focus:outline-none focus:border-gray-500"
              />

              <label
                htmlFor="oldPasswordInput"
                className={`
								absolute left-3 top-2 text-sm text-gray-500 transition-all
								peer-placeholder-shown:top-4 
								peer-placeholder-shown:text-base
								peer-focus:top-[-9]
								peer-focus:text-sm
								bg-white px-1
								${oldPassword ? "top-[-9] text-sm" : "top-4 text-base"}
							`}
              >
                Old Password
              </label>
              <div 
                className="w-[7%] h-full flex items-center justify-center"
                onClick={e => {
                  e.preventDefault();
                  setOldPasswordEye(!oldPasswordEye);
                }}
              >
                {oldPasswordEye
                ? <FaEyeSlash />
                : <FaEye />}
              </div>
            </div>

            {/* New Password */}
            <div className="relative w-full flex border border-gray-300 rounded-md">
              <input
                type={newPasswordEye ? "text" : "password"}
                placeholder=" "
                value={newPassword}
                id="newPasswordInput"
                onChange={(e) => setNewPassword(e.target.value)}
                className="peer w-full px-4 pt-5 pb-2 
							text-gray-800 focus:outline-none focus:border-gray-500"
              />

              <label
                htmlFor="newPasswordInput"
                className={`
								absolute left-3 top-2 text-sm text-gray-500 transition-all
								peer-placeholder-shown:top-4 
								peer-placeholder-shown:text-base
								peer-focus:top-[-9]
								peer-focus:text-sm
								bg-white px-1
								${newPassword ? "top-[-9] text-sm" : "top-4 text-base"}
							`}
              >
                New Password
              </label>
              <div 
                className="w-[7%] h-full flex items-center justify-center"
                onClick={e => {
                  e.preventDefault();
                  setNewPasswordEye(!newPasswordEye);
                }}
              >
                {newPasswordEye
                ? <FaEyeSlash />
                : <FaEye />}
              </div>
            </div>

            {/* Confirm Password */}
            <div className="relative w-full flex border border-gray-300 rounded-md">
              <input
                type={confirmPasswordEye ? "text" : "password"}
                placeholder=" "
                value={confirmPassword}
                id="confirmPasswordInput"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="peer w-full  px-4 pt-5 pb-2 
							text-gray-800 focus:outline-none focus:border-gray-500"
              />

              <label
                htmlFor="confirmPasswordInput"
                className={`
								absolute left-3 top-2 text-sm text-gray-500 transition-all
								peer-placeholder-shown:top-4 
								peer-placeholder-shown:text-base
								peer-focus:top-[-11]
								peer-focus:text-sm
								bg-white px-1
								${confirmPassword ? "top-[-11] text-sm" : "top-4 text-base"}
							`}
              >
                Confirm Password
              </label>
              <div 
                className="w-[7%] h-full flex items-center justify-center"
                onClick={e => {
                  e.preventDefault();
                  setConfirmPasswordEye(!confirmPasswordEye);
                }}
              >
                {confirmPasswordEye
                ? <FaEyeSlash />
                : <FaEye />}
              </div>
            </div>
            {msg && <span className="text-red-500">{msg}</span>}
            {success && <span className="text-green-500">{success}</span>}
          </div>

          {/* Button */}
          <button
            onClick={handleSubmit}
            disabled={!passwordMatched}
            className={
              "w-full py-3 font-semibold text-lg text-white "
              + (passwordMatched ? "bg-[#ff3f6c] cursor-pointer" : "bg-[#8a223b] cursor-not-allowed")
            }
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
