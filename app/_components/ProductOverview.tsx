"use client";

import React, { useState } from "react";
import Navbar from "./Navbar";
import { navLinksDataType } from "@/lib/typeDefinitions";

const primaryColor = "#4d3af3";

const navLinksData: navLinksDataType[] = [
  { name: "Men", tag: "men" },
  { name: "Women", tag: "women" },
  { name: "Kids", tag: "kids" },
];

const getDiscount = (mrp: number, price: number) => {
  const discount = ((mrp - price) / mrp) * 100;
  return Math.round(discount);
};

export default function ProductOverview({
  productData,
}: {
  productData: {
    title: string;
    subtitle: string;
    price: number;
    mrp: number;
    colors: string[];
    sizes: string[];
    links: string[];
    desc: { key: string; value: string }[];
  };
}) {
  const [search, setSearch] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<number>(0);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = () => {
    setIsLoading(true);
    const selection = {
      color: productData.colors[selectedColor],
      size: productData.sizes[selectedSize],
    };
    alert(`Color: ${selection.color} | Size: ${selection.size}`);
  };

  return (
    <>
      <Navbar
        activePage="Product"
        search={search}
        setSearch={setSearch}
        navLinksData={navLinksData}
        setPage={() => {}}
        cartCount={2}
      />
      <div className="h-[100vh] w-[100vw] mt-10 flex flex-col md:flex-row justify-evenly">
        {/* Photo Privews */}
        <div className="w-[95vw] md:w-[45vw] h-full flex justify-center">
          <img src={productData.links[selectedColor]} alt="" />
        </div>

        {/* Product Overview */}
        <div className="w-full md:w-[45vw] mt-10 ml-5  md:mt-0 md:ml-0 h-full">
          {/* Title and price display */}

          <h1 className="text-3xl font-bold mb-5">{productData.title}</h1>
          <span className="line-through text-gray-500">
            ₹ {productData.mrp}
          </span>
          <div className="flex gap-10 items-center">
            <h1 className="text-2xl font-medium">₹ {productData.price}</h1>
            <span className="text-sm text-white h-5 bg-green-500 px-3 rounded-full font-semibold">
              {getDiscount(productData.mrp, productData.price)}% off
            </span>
          </div>

          {/* Product description */}

          <span className="inline-block mt-5 text-lg">
            {productData.subtitle}
          </span>

          {/* Display colors */}

          <div className="flex flex-col gap-4">
            <h1 className="text-lg mt-5 font-semibold">Colors</h1>
            <div className="flex gap-10 mx-5">
              {productData.colors.map((color: string, key) => {
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedColor(key)}
                    style={{
                      boxShadow:
                        selectedColor == key ? `0 0 0 2px #${color}` : "none",
                    }}
                    className={
                      "flex items-center justify-center w-11 h-11 rounded-full "
                    }
                  >
                    <span
                      className="w-10 h-10 rounded-full"
                      style={{ backgroundColor: `#${color}` }}
                    ></span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Display Sizes */}

          <div className="flex flex-col gap-4">
            <h1 className="text-lg mt-5 font-semibold">Sizes</h1>
            <div className="flex gap-10 mx-5 w-[80vw] md:w-[40vw] grid grid-cols-4 md:grid-cols-5 gap-4">
              {productData.sizes.map((size: string, key) => {
                return (
                  <button
                    key={key}
                    className={
                      "border-1 rounded border-gray-300 font-medium cursor-pointer w-20 h-10 " +
                      (selectedSize == key
                        ? `border-none bg-[${primaryColor}] text-white`
                        : "")
                    }
                    onClick={() => setSelectedSize(key)}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Buy Now button */}

          <button
            onClick={handleClick}
            className={
              `mt-5 w-[80vw] md:w-140 mx-4 h-14 rounded font-semibold text-white text-lg hover:bg-white hover:text-[#4d3af3] hover:border-[#4d3af3] hover:border-1 transition-all duration-300s ` +
              (isLoading
                ? "bg-[#2f2394] cursor-not-allowed"
                : "bg-[#4d3af3] cursor-pointer")
            }
            disabled={isLoading}
          >
            Buy Now
          </button>

          <div className="flex flex-col gap-2">
            <h1 className="text-lg mt-5 font-semibold">Descriptions</h1>
            <ul className="mb-10 mt-5 flex flex-col gap-3">
              {productData.desc.map((pair, key) => {
                return (
                  <li key={key} className="text-gray-500 font-semibold">
                    <span className="inline-block w-[40vw]">{pair.key}: </span>
                    <span>{pair.value}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
