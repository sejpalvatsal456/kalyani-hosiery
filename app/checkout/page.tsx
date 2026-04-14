"use client";

import { IUser } from "@/lib/typeDefinitions";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";

interface IItems {
  productId: string;
  colorId: string;
  sizeId: string;
  sku: string;
  quantity: number;
}

export default function page() {
  const [user, setUser] = useState<IUser | null>(null);
  const [items, setItems] = useState<IItems[] | null>(null);
  const [totalMRP, setTotalMRP] = useState<number|null>(null);
  const [totalSellingPrice, setTotalSellingPrice] = useState<number|null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  // handlers
  const handleCheckout = async (e: FormEvent) => {
    setIsLoading(true);


    const payload = { amount: totalSellingPrice, items: items };
    console.log("Payload: ");
    console.log(payload);

    const res = await fetch("/api/createOrder/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      alert("Error in API response");
      setIsLoading(false);
      return;
    }

    const redirectUrl = data?.data?.instrumentResponse?.redirectInfo?.url;
    if (redirectUrl) window.location.href = redirectUrl;
  };

  useEffect(() => {
    fetch("/api/auth/me", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        const user = data.data;
        setUser(data.data);
        if (!user.address) {
          router.push("/addAddress/");
        }
      })
      .catch((err) => console.log(err));

    // Get the session id from cookkies

    fetch("/api/getSessionOrder/", {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Session Data from API: ");
        console.log(data);
        setItems(data.items)
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if(!items || items.length === 0) return;
    fetch('/api/products/checkoutInfo', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: items })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setTotalMRP(data.totalMRP);
        setTotalSellingPrice(data.totalSellingPrice);
      })
      .catch(err => console.log(err));
    

  }, [items])

  return (
    <div className="w-[100vw] h-[100vh] bg-[linear-gradient(45deg,_#faeaf1,_#fcf0e2)] flex items-center justify-center">
      <div className="bg-white p-10 rounded w-[80vw] md:w-[30vw] min-h-[50vh] max-h-[80vh] overflow-y-scroll">
        {items && totalMRP && totalSellingPrice? (
          <>
            <h1 className="text-2xl font-semibold mb-5">Checkout</h1>
            {/* <h2 className="text-xs text-gray-900 font-semibold mb-3">
          PRICE DETAILS
        </h2> */}
            <div className="flex flex-col text-gray-600 gap-3 mb-3">
              <div className="flex flex-row justify-between">
                <span>Total Items</span>
                <span>{ items.length + ( items.length === 1 ? " item" : " items" ) }</span>
              </div>
              <div className="flex flex-row justify-between">
                <span>Total MRP</span>
                <span>₹{totalMRP}</span>
              </div>
              <div className="flex flex-row justify-between">
                <span>Total Discount</span>
                <span className="text-green-600">-₹{totalMRP - totalSellingPrice}</span>
              </div>
            </div>
            <hr />
            <div className="flex flex-row justify-between mt-3">
              <span className="text-gray-900">Total Amount</span>
              <span className="text-gray-600 font-semibold">₹{totalSellingPrice}</span>
            </div>
            <button
              onClick={handleCheckout}
              className={
                "py-2 mt-4 w-full text-lg font-semibold transition-all duration-200 " +
                (isLoading
                  ? "bg-[#A12743] cursor-not-allowed text-white disabled"
                  : "bg-[#ff406c] text-white cursor-pointer")
              }
            >
              Checkout
            </button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
