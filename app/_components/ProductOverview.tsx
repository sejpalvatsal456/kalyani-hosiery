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
  };
}) {
  const [search, setSearch] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<number>(0);

  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      <div className="h-[100vh] w-[100vw] mt-10 flex justify-evenly">
        {/* Photo Privews */}
        <div className="w-[45vw] h-full flex justify-center">
          <img src={productData.links[selectedColor]} alt="" />
        </div>

        {/* Product Overview */}
        <div className="w-[45vw] h-full">
          {/* Title and price display */}

          <div className="flex justify-between">
            <h1 className="text-2xl font-medium">{productData.title}</h1>
            <h1 className="text-2xl font-medium">Rs. {productData.price}</h1>
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
            <div className="flex gap-10 mx-5">
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
            onClick={() => setIsLoading(true)}
            className={
              `mt-5 w-140 mx-4 h-14 rounded font-semibold text-white text-lg hover:bg-white hover:text-[#4d3af3] hover:border-[#4d3af3] hover:border-1 transition-all duration-300s ` +
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
            <h2 className="mx-5 text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequatur, tempora!
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}
