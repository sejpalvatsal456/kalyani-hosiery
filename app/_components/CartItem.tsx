// components/CartItem.tsx
import Image from "next/image";
import { X } from "lucide-react";
import { JSX } from "react";

interface CartItemProps {
  productId: string;
  image: string;
  brand: string;
  title: string;
  seller: string;
  size: string;
  quantity: number;
  price: number;
  originalPrice: number;
  isSelected: boolean;
  onSelect: () => void;
  onQuantityChange: (newQty: number) => void;
  onDeleteItem: (id: string) => void;
}

export default function CartItem({
  productId,
  image,
  brand,
  title,
  seller,
  size,
  quantity,
  price,
  originalPrice,
  isSelected,
  onSelect,
  onQuantityChange,
  onDeleteItem,
}: CartItemProps) {
  const discount = originalPrice - price;

  return (
    <div className="relative flex gap-4 p-4 border border-gray-300 rounded-md bg-white shadow-sm">
      {/* Close Button */}
      <button className="absolute top-3 right-3 text-gray-500 hover:text-black">
        <X onClick={(e) => onDeleteItem(productId)} size={18} />
      </button>

      {/* Product Image */}
      <div className="relative w-35 h-50 flex-shrink-0">
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
          className="absolute top-2 left-2 z-10 w-4 h-4 accent-black cursor-pointer"
        />

        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-1">
        {/* Brand */}
        <h3 className="font-semibold text-gray-800">{brand}</h3>

        {/* Title */}
        <p className="text-black text-sm">{title}</p>

        {/* Seller */}
        <p className="text-sm text-gray-500 mt-1">
          Sold by: <span className="font-medium">{seller}</span>
        </p>

        {/* Size & Qty */}
        <div className="flex gap-4 mt-3">
          <span className="bg-gray-200 font-bold px-2 py-1 text-sm">
            Size: {size}
          </span>

          <div className="w-16 bg-gray-200 font-bold px-2 py-1 text-sm flex flex-row">
            <span>Qty: </span>
            {/* <input
              type="number"
              value={quantity || ""}
              onChange={(e) => {
                const value = e.target.value;

                if (value === "") onQuantityChange(NaN); // allow temporary empty while typing

                const numberValue = Number(value);
                if (numberValue >= 1) {
                  onQuantityChange(numberValue);
                }
              }}
              className="ml-2 focus:outline-none focus:border-gray-500"
            /> */}
            <select
              name="selectQuantity"
              id=""
              onChange={(e) => onQuantityChange(Number(e.target.value))}
              className=""
              value={quantity.toString()}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
            </select>
          </div>
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
      </div>
    </div>
  );
}
