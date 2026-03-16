import { IDisplayProduct } from "@/lib/typeDefinitions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FormEvent } from "react";

export default function DisplayCard({
  productData,
}: {
  productData: IDisplayProduct;
}) {
  const router = useRouter();

  const getDiscount = (mrp: number, price: number) => {
    if (!mrp) return 0;
    return Math.round((mrp-price)/mrp*100);
  };

  const getLowestPrice = () => {
    let minMrp = Infinity;
    let minSelling = Infinity;

    productData.varients.forEach((v) => {
      v.sizes.forEach((s) => {
        if (s.sellingPrice < minSelling) {
          minSelling = s.sellingPrice;
          minMrp = s.mrp;
        }
      });
    });

    return { mrp: minMrp, sellingPrice: minSelling };
  };

  const { mrp, sellingPrice } = getLowestPrice();

  const handleClick = () => {
    router.push("/product/" + productData._id);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer w-55 md:w-50 h-100 rounded hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex flex-col"
    >
      <Image
        src={productData.thumbnail}
        alt="ProductImage"
        width={300}
        height={240}
        className="w-full h-60 object-cover rounded-t-lg"
      />

      <span className="text-xl md:text-lg font-bold inline-block mt-3 pl-3">
        {productData.brandName}
      </span>
      <span className="text-lg md:text-sm inline-block ml-3 text-gray-500">
        {productData.productName}
      </span>

      <div className="hidden md:flex items-center justify-between m-3">
        <div className="flex flex-col">
          <div className="flex gap-1">
            <span className="text-xs text-gray-500 font-semibold line-through">
              Rs. {mrp}
            </span>
          </div>
          <span className="text-lg font-semibold">Rs. {sellingPrice}</span>
        </div>
        <span className="text-sm text-white bg-green-500 px-3 rounded-full font-semibold">
          {getDiscount(mrp, sellingPrice)}% off
        </span>
      </div>

      <div className="flex md:hidden items-center justify-left gap-2 m-3">
        <span className="text-xs text-gray-500 font-semibold line-through">
          Rs. {mrp}
        </span>
        <span className="text-md font-semibold">Rs. {sellingPrice}</span>
        <span className="text-md font-semibold text-[#c97c00]">{getDiscount(mrp, sellingPrice)}% OFF</span>
      </div>
    </div>
  );
}
