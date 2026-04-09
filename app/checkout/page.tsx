"use client";

import { IUser } from "@/lib/typeDefinitions";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";

export default function page() {
  const [user, setUser] = useState<IUser | null>(null);
  const [house, setHouse] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [locality, setLocality] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [pincode, setPincode] = useState<string>("");

  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/me", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (
      !house ||
      !street ||
      !locality ||
      !city ||
      !state ||
      !pincode ||
      pincode.length !== 6 ||
      user
    ) {
      setIsVerified(false);
      return;
    }
    setIsVerified(true);
  }, [house, street, locality, city, state, pincode]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (
      !house ||
      !street ||
      !locality ||
      !city ||
      !state ||
      !pincode ||
      pincode.length !== 6
    ) {
      setMsg("Fill al the fields");
      return;
    }
    // const payload = { house, street, locality, city, state, pincode };
    const payload = {
      address: `${house}, ${street}, ${locality}, ${city}, ${state}, ${pincode}`,
    };

    const res = fetch("/api/users/"+user?._id, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-[linear-gradient(45deg,_#faeaf1,_#fcf0e2)] flex items-center justify-center">
      <div className="bg-white p-10 rounded w-[80vw] md:w-[30vw] min-h-[50vh] max-h-[80vh] overflow-y-scroll">
        <h1 className="text-2xl font-semibold mb-10">Checkout</h1>
        <form className="flex flex-col gap-5">
          {/* House Input */}
          <input
            type="text"
            name="houseInput"
            id="houseInput"
            placeholder="House Number*"
            className="border-1 border-gray-300 focus:border-gray-500 focus:outline-none text-gray-500 text-md py-2 pl-5 rounded"
            value={house}
            onChange={(e) => setHouse(e.target.value)}
          />

          {/* Area Input */}
          <input
            type="text"
            name="streetInput"
            id="streetInput"
            placeholder="Street*"
            className="border-1 border-gray-300 focus:border-gray-500 focus:outline-none text-gray-500 text-md py-2 pl-5 rounded"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />

          {/* Locality Input */}
          <input
            type="text"
            name="areaInput"
            id="areaInput"
            placeholder="Area/Locality*"
            className="border-1 border-gray-300 focus:border-gray-500 focus:outline-none text-gray-500 text-md py-2 pl-5 rounded"
            value={locality}
            onChange={(e) => setLocality(e.target.value)}
          />

          {/* City Input */}
          <input
            type="text"
            name="cityInput"
            id="cityInput"
            placeholder="City*"
            className="border-1 border-gray-300 focus:border-gray-500 focus:outline-none text-gray-500 text-md py-2 pl-5 rounded"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          {/* State Input */}
          <input
            type="text"
            name="stateInput"
            id="stateInput"
            placeholder="State*"
            className="border-1 border-gray-300 focus:border-gray-500 focus:outline-none text-gray-500 text-md py-2 pl-5 rounded"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />

          {/* Pincode Input */}
          <input
            type="number"
            name="pincodeInput"
            id="pincodeInput"
            placeholder="Pincode*"
            className="border-1 border-gray-300 focus:border-gray-500 focus:outline-none text-gray-500 text-md py-2 pl-5 rounded"
            value={pincode}
            onChange={(e) => {
              if (
                e.target.value.length > 6 ||
                e.target.value !== Number(e.target.value).toString()
              )
                return;
              setPincode(e.target.value);
            }}
          />

          <span className="text-red-500">{msg}</span>

          {/* Submit Button */}
          <button
            disabled={!isVerified}
            onClick={handleSubmit}
            className={
              "py-2 md:mt-4 text-lg font-semibold transition-all duration-200 " +
              (!isVerified
                ? "bg-gray-500 cursor-not-allowed text-white disabled"
                : "bg-[#ff406c] text-white cursor-pointer")
            }
          >
            Checkout
          </button>
        </form>
      </div>
    </div>
  );
}
