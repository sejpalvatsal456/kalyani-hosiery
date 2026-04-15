import { IOrder, IProduct } from "@/lib/typeDefinitions";
import items from "razorpay/dist/types/items";
import React from "react";
import { BsBox2 } from "react-icons/bs";
import { FaBox, FaCheckCircle, FaShippingFast } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { RiRefund2Line } from "react-icons/ri";

// TODO: complete all conditions for getIcons

const formateDate = (dateString: string) => {
  console.log(typeof dateString);
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const getIcon = (status: string) => {
  switch (status) {
    case "placed":
      return <FaCheckCircle bbox={3} size={30} />;
    case "cancelled":
      return <IoIosCloseCircle size={30} />;
    case "delivered":
      return <FaShippingFast size={30} />;
  }
};

const getTextColor = (status: string) => {
  switch (status) {
    case "placed":
      return "text-yellow-600";
    case "cancelled":
      return "text-red-500";
    case "delivered":
      return "text-green-500";
  }
};

interface IExtendedOrder extends Omit<IOrder, "items"> {
  items: {
    colorId: string;
    sizeId: string;
    productId: IProduct;
    sku: string;
    quantity: number;
  }[];
}

export default function OrderCard({ order }: { order: IExtendedOrder }) {
  return (
    <div className="p-5 shadow-lg rounded-lg">
      <div className="flex flex-row gap-5 items-center mb-5">
        {getIcon(order.orderStatus)}
        <div className="flex flex-col">
          <span className={"font-semibold " + getTextColor(order.orderStatus)}>
            {order.orderStatus.toUpperCase()}
          </span>
          <span className="text-gray-600">
            {(order.createdAt && formateDate(order.createdAt)) || "MM DD, YYYY"}
          </span>
          <span className="text-gray-600">Order ID: {order._id}</span>
        </div>
      </div>
      <div className="bg-[#f5f5f5] p-5 flex flex-col gap-5">
        {order.items &&
          order.items.map((item, key) => (
            <div className="flex flex-row gap-5" key={key}>
              <img
                src={item.productId.thumbnail}
                alt=""
                width={60}
                className="rounded-sm"
              />
              <div className="flex flex-col justify-evenly">
                <span className="font-semibold">
                  {item.productId.productName}
                </span>
                {/* <span>{item.sizeId}</span> */}
                <span className="text-gray-600">Quantity: {item.quantity}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
