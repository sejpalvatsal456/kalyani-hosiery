"use client";
import { IOrder, IProduct } from '@/lib/typeDefinitions';
import React, { useEffect, useState } from 'react'
import OrderCard from './OrderCard';

interface IExtendedOrder extends Omit<IOrder, 'items'> { 
  items: {
    colorId: string;
    sizeId: string;
    productId: IProduct;
    sku: string;
    quantity: number
  }[]
}

export default function PreviousPurchase() {

  const [orders, setOrders] = useState<IExtendedOrder[]|null>(null);

  useEffect(() => {
    fetch('/api/orders/ordersByUser/', {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setOrders(data);
    })
    .catch(err => console.log(err));
  }, []);

  // for debugging purpose
  useEffect(() => {
    console.log("Order Hook: ");
    console.log(orders);
  }, [orders]);

  return (
    <div className="flex items-center justify-center">
      <div className="w-[90%] min-h-[90%] py-5 px-10 border-1 border-gray-300 shadow-lg">
        <h1 className="text-xl font-semibold mb-5">Previous Purchase</h1>
        
        {orders && orders.map((order,key) => (
          <OrderCard order={order} key={key} />
        ))}
        
      </div>
    </div>
  )
}
