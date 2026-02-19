import React, { useState } from "react";

export default function ManageProfile() {
  const [name, setName] = useState<string>("Vatsal");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  return (
    <div className="flex h-full items-center justify-center">
      <div className="w-[90%] h-[90%] py-5 px-10 border-1 border-gray-300 shadow-lg">
        <h1 className="text-xl font-semibold">Manage Profile</h1>

        {/* Form */}
        <div className="flex flex-col w-[80%] h-[80%] justify-between">
          <div className="flex flex-col mt-10 gap-10 w-full">
            {/* Fullname */}
            <div className="relative w-full ">
              <input
                type="text"
                placeholder=" "
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="peer w-full border border-gray-300 rounded-md px-4 pt-5 pb-2 
							text-gray-800 focus:outline-none focus:border-gray-500"
              />

              <label
                className={`
								absolute left-3 top-2 text-sm text-gray-500 transition-all
								peer-placeholder-shown:top-4 
								peer-placeholder-shown:text-base
								peer-focus:top-[-9]
								peer-focus:text-sm
								bg-white px-1
								${name ? "top-[-9] text-sm" : "top-4 text-base"}
							`}
              >
                Full Name
              </label>
            </div>

            {/* Email */}
            <div className="relative w-full ">
              <input
                type="email"
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="peer w-full border border-gray-300 rounded-md px-4 pt-5 pb-2 
							text-gray-800 focus:outline-none focus:border-gray-500"
              />

              <label
                className={`
								absolute left-3 top-2 text-sm text-gray-500 transition-all
								peer-placeholder-shown:top-4 
								peer-placeholder-shown:text-base
								peer-focus:top-[-9]
								peer-focus:text-sm
								bg-white px-1
								${name ? "top-[-9] text-sm" : "top-4 text-base"}
							`}
              >
                Email
              </label>
            </div>

            {/* Adress */}
            <div className="relative w-full ">
              <input
                type="text"
                placeholder=" "
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="peer w-full border border-gray-300 rounded-md px-4 pt-5 pb-2 
							text-gray-800 focus:outline-none focus:border-gray-500"
              />

              <label
                className={`
								absolute left-3 top-2 text-sm text-gray-500 transition-all
								peer-placeholder-shown:top-4 
								peer-placeholder-shown:text-base
								peer-focus:top-[-9]
								peer-focus:text-sm
								bg-white px-1
								${address ? "top-[-9] text-sm" : "top-4 text-base"}
							`}
              >
                Address
              </label>
            </div>
          </div>

          {/* Button */}
          <button className="bg-[#ff3f6c] w-full py-3 text-white font-semibold text-lg cursor-pointer">Save</button>
        </div>
      </div>
    </div>
  );
}
