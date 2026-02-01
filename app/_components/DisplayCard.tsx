import { ProductDataType } from "@/lib/typeDefinitions";
import React from "react";

export default function DisplayCard({
  productData
} : {
  productData: ProductDataType
}) {

  const getDiscount = (mrp: number, price: number) => {
    const discount = (mrp-price)/mrp*100;
    return Math.round(discount);
  }

  return (
    <div className="w-50 min-h-70 max-h-100 rounded hover:shadow-lg hover:scale-110 transition-all duration-300 flex flex-col">
      <img src={productData.link} className="w-full h-40 rounded-t-lg" alt="card-img" />

      <span className="text-lg font-bold inline-block mt-3 pl-3">{productData.title}</span>
      <span className="text-sm inline-block ml-3 text-gray-500">{productData.subtitle}</span>

      <div className="flex items-center justify-between m-3">
        <div className="flex flex-col">
          <div className="flex gap-1">
            <span className="text-xs text-gray-500 font-semibold line-through">Rs. {productData.mrp}</span>
            
          </div>
          <span className="text-lg font-semibold">Rs. {productData.price}</span>
          
        </div>
        <span className="text-sm text-white bg-green-500 px-3 rounded-full font-semibold">{getDiscount(productData.mrp, productData.price)}% off</span>
      </div>
    </div>
  );
}
