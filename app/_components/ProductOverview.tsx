"use client";

import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import {
  navLinksDataType,
  ProductDataType,
  ProductOverviewType,
} from "@/lib/typeDefinitions";

const getDiscount = (mrp: number, price: number) => {
  const discount = ((mrp - price) / mrp) * 100;
  return Math.round(discount);
};

export default function ProductOverview({
  prodId,
}: {
  productData: ProductOverviewType;
  prodId: string;
}) {
  const [productData, setProductData] = useState<ProductDataType | null>(null);
  const [search, setSearch] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<number>(0);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOutOfStock, setIsOutOfStock] = useState<boolean>(
    productData?.variety[0].sizes[0].stock === 0,
  );

  const handleClick = () => {
    setIsLoading(true);
    const selection = {
      color: productData?.variety[selectedColor].color,
      size: productData?.variety[selectedColor].sizes[selectedSize].size,
    };
    alert(
      `Color: ${selection.color} | Size: ${selection.size} | Out of Stock: ${isOutOfStock}`,
    );
    setIsLoading(false);
  };

  const sizeListEl = productData?.variety[selectedColor].sizes.map(
    ({ size, stock }, key) => {
      return (
        <button
          key={key}
          className={
            "border-1 rounded-full border-gray-300 font-medium cursor-pointer w-20 h-10 " +
            (selectedSize == key ? `border-none bg-[#fc2167] text-white` : "")
          }
          onClick={() => {
            setSelectedSize(key);
            setIsOutOfStock(
              productData.variety[selectedColor].sizes[key].stock === 0,
            );
          }}
        >
          {size}
        </button>
      );
    },
  );

  useEffect(() => {
    fetch(`/api/products/${prodId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.data) {
          console.log(data.data);
          setProductData(data.data);
          setIsOutOfStock(
            data.data.variety[selectedColor].sizes[selectedSize].stock === 0,
          );
        } else {
          alert("Data not found")
        }
      })
      .catch((err) => alert(err));
  }, []);

  return (
    <>
      <Navbar
        isLogin={true} // TODO: fix the logic here
        activePage="Product"
        search={search}
        setSearch={setSearch}
        setPage={() => {}}
        cartCount={2}
        displayNavLinks={false}
      />
      {productData ? (
        <div className="h-[100vh] w-[100vw] mt-10 flex flex-col md:flex-row justify-evenly">
          {/* Photo Privews */}
          <div className="w-[100%] md:ml-0 md:w-[45vw] flex justify-center">
            <img
              src={productData.variety[selectedColor].imgLinks[0]}
              alt="productImg"
              className="rounded-lg w-[95%]"
            />
          </div>

          {/* Product Overview */}
          <div className="w-full md:w-[45vw] mt-10 ml-5 md:mt-0 md:ml-0 h-full">
            {/* Title and price display */}

            <h1 className="text-3xl font-bold mb-5">{productData.brandName}</h1>
            <span className="line-through text-gray-500">
              ₹ {productData.variety[selectedColor].sizes[selectedSize].mrp}
            </span>
            <div className="flex gap-10 items-center">
              <h1 className="text-2xl font-medium">
                ₹{" "}
                {
                  productData.variety[selectedColor].sizes[selectedSize]
                    .sellingPrice
                }
              </h1>
              <span className="text-sm text-white h-5 bg-green-500 px-3 rounded-full font-semibold">
                {getDiscount(
                  productData.variety[selectedColor].sizes[selectedSize].mrp,
                  productData.variety[selectedColor].sizes[selectedSize]
                    .sellingPrice,
                )}
                % off
              </span>
            </div>

            {/* Product description */}

            <span className="inline-block mt-5 text-lg">
              {productData.productName}
            </span>

            {/* Display colors */}
            {/* FIXME: shades of white are blending to the background */}
            <div className="flex flex-col gap-4">
              <h1 className="text-lg mt-5 font-semibold">Colors</h1>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-10 px-5">
                {productData.variety.map(
                  ({ id, color, imgLinks, sizes }, key) => {
                    return (
                      <button
                        key={key}
                        onClick={() => {
                          setSelectedColor(key);
                          setSelectedSize(0);
                          setIsOutOfStock(
                            productData.variety[selectedColor].sizes[0]
                              .stock === 0,
                          );
                        }}
                        style={{
                          boxShadow:
                            selectedColor == key
                              ? `0 0 0 2px #${color !== "ffffff" ? color : "000000"}`
                              : "none",
                        }}
                        className={
                          "flex items-center justify-center w-11 h-11 rounded-full shadow-lg "
                        }
                      >
                        <span
                          className="w-10 h-10 rounded-full"
                          style={{ backgroundColor: `#${color}` }}
                        ></span>
                      </button>
                    );
                  },
                )}
              </div>
            </div>

            {/* Display Sizes */}

            <div className="flex flex-col gap-4">
              <h1 className="text-lg mt-5 font-semibold">Sizes</h1>
              <div className="mx-5 w-[80vw] md:w-[40vw] grid grid-cols-3 md:grid-cols-5 gap-4">
                {sizeListEl}
              </div>
            </div>

            {/* Buy Now button */}

            {!isOutOfStock ? (
              <button
                onClick={handleClick}
                className={
                  `mt-10 md:mt-5 w-[80vw] md:w-140 mx-4 h-14 rounded font-semibold text-white text-xl hover:bg-white hover:text-[#fc2167] hover:border-[#fc2167] hover:border-1 transition-all duration-300s ` +
                  (isLoading
                    ? "bg-[#851136] cursor-not-allowed"
                    : "bg-[#fc2167] cursor-pointer")
                }
                disabled={isLoading}
              >
                Buy Now
              </button>
            ) : (
              <button
                disabled
                className="mt-10 md:mt-5 w-[80vw] md:w-140 mx-4 h-14 bg-white rounded font-semibold text-[#bf1b4f] text-xl border-1 cursor-not-allowed transition-all duration-300s "
              >
                Out of Stock
              </button>
            )}

            <div className="flex flex-col gap-2">
              <h1 className="text-lg mt-5 font-semibold">Descriptions</h1>
              <ul className="mb-10 mt-5 flex flex-col gap-3">
                {productData.desc.map((pair, key) => {
                  return (
                    <li key={key} className="text-gray-500">
                      <span className="inline-block w-[40vw] md:w-[20vw]">
                        {pair.key}:{" "}
                      </span>
                      <span>{pair.value}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
