"use client"

import Image from "next/image"
import { Heart, ShoppingBag, Star } from "lucide-react"
import { IDisplayProduct } from "@/lib/typeDefinitions";
import { useEffect } from "react";

interface Props {
  product: IDisplayProduct
}

export default function DisplayCard({ product }: Props) {

  
  const variant = product.varients[0];
  const size = variant?.sizes[0]

  const image = variant?.imgLinks?.[0] || product.thumbnail

  const price = size?.sellingPrice
  const mrp = size?.mrp
  const discount = size?.discountPercent

  useEffect(() => {
    console.log(`Product Id: ${product._id}`)
  console.log(product);

  }, []);

  return (
    <div className="w-full">

      {/* Product Image */}
      <div className="relative rounded-2xl bg-gray-100 h-[230px]">
        <Image
          src={image}
          alt={product.productName}
          fill
          className="object-cover rounded-2xl"
        />

        {/* <button className="absolute top-3 right-3 bg-white rounded-full p-1 shadow">
          <Heart size={18} />
        </button> */}

        {/* <div className="absolute bottom-3 left-3 bg-white rounded-full px-2 py-1 flex items-center gap-1 text-sm shadow">
          <span>4.5</span>
          <Star size={14} className="text-green-500 fill-green-500" />
          <span className="text-gray-500">19</span>
        </div> */}

        <button className="absolute -bottom-2 right-3 bg-white border border-pink-400 text-pink-500 rounded-lg px-4 py-1 flex items-center gap-1 text-sm font-medium">
          <ShoppingBag size={14} />
          Add
        </button>
      </div>

      {/* Product Info */}
      <div className="mt-2">

        <p className="font-semibold">{product.brandName}</p>

        <p className="text-gray-500 text-sm line-clamp-1">
          {product.productName}
        </p>

        <div className="flex items-center gap-2 mt-1">

          {mrp && (
            <span className="line-through text-gray-400 text-sm">
              ₹{mrp}
            </span>
          )}

          <span className="font-semibold text-lg">
            ₹{price}
          </span>

          {discount && (
            <span className="text-orange-500 text-sm font-medium">
              {discount}% OFF
            </span>
          )}

        </div>

      </div>

    </div>
  )
}