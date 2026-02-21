// components/CartItem.tsx
import Image from "next/image";
import { X } from "lucide-react";

interface CartItemProps {
  image: string;
  brand: string;
  title: string;
  seller: string;
  size: string;
  quantity: number;
  price: number;
  originalPrice: number;
}

export default function CartItem({
  image,
  brand,
  title,
  seller,
  size,
  quantity,
  price,
  originalPrice,
}: CartItemProps) {
  const discount = originalPrice - price;

  return (
    <div className="relative flex gap-4 p-4 border rounded-lg bg-white shadow-sm">
      {/* Close Button */}
      <button className="absolute top-3 right-3 text-gray-500 hover:text-black">
        <X size={18} />
      </button>

      {/* Product Image */}
      <div className="relative w-35 h-50 flex-shrink-0">
        {/* Checkbox */}
        <input
          type="checkbox"
          className="absolute top-2 left-2 w-4 h-4 
            accent-black cursor-pointer 
            bg-white border-gray-300 
            rounded shadow-sm z-2"
        />

        <Image
          src={image}
          alt={title}
          fill
          className="object-cover rounded-md"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-1">
        {/* Brand */}
        <h3 className="font-semibold text-gray-800">{brand}</h3>

        {/* Title */}
        <p className="text-gray-600 text-sm">{title}</p>

        {/* Seller */}
        <p className="text-sm text-gray-500 mt-1">
          Sold by: <span className="font-medium">{seller}</span>
        </p>

        {/* Size & Qty */}
        <div className="flex gap-4 mt-3">
          <select className="border rounded-md px-2 py-1 text-sm">
            <option>Size: {size}</option>
          </select>

          <select className="border rounded-md px-2 py-1 text-sm">
            <option>Qty: {quantity}</option>
          </select>
        </div>

        {/* Pricing */}
        <div className="flex items-center gap-3 mt-3">
          <span className="font-semibold text-lg">
            ₹{price.toLocaleString()}
          </span>

          <span className="text-gray-400 line-through text-sm">
            ₹{originalPrice.toLocaleString()}
          </span>

          <span className="text-red-500 text-sm font-medium">
            ₹{discount.toLocaleString()} OFF
          </span>
        </div>

        {/* Return Policy */}
        <p className="text-sm text-gray-600 mt-2">⟳ 7 days return available</p>
      </div>
    </div>
  );
}
