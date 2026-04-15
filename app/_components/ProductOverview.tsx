"use client";

import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { usePathname, useRouter } from "next/navigation";
import { IDisplayProduct, IProduct, IUser } from "@/lib/typeDefinitions";
import BannerSlider from "./BannerSlider";
import ProductPreviewSlider from "./ProductPreviewSlider";
import toast, { Toaster } from "react-hot-toast";

const getDiscount = (mrp: number, price: number) => {
  const discount = ((mrp - price) / mrp) * 100;
  return Math.round(discount);
};

export default function ProductOverview({
  slug,
}: {
  slug: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [productData, setProductData] = useState<IDisplayProduct | null>(null);
  const [search, setSearch] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<number>(0);
  const [user, setUser] = useState<IUser|null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOutOfStock, setIsOutOfStock] = useState<boolean>(
    productData?.varients[0].sizes[0].stock === 0,
  );

  const handleClick = () => {
    setIsLoading(true);
    if(!user) {
      setIsLoading(false); 
      console.log(pathname);
      console.log(encodeURIComponent(pathname));
      router.push(`/auth/login?callbackUrl=${encodeURIComponent(pathname)}`);
      return;
    }
    if(!productData) {
      setIsLoading(false);
      return;
    }

    const prodId = productData._id;
    const colorId = productData.varients[selectedColor].colorID;
    const sizeId = productData.varients[selectedColor].sizes[selectedSize].sizeID;
    const sku = productData.varients[selectedColor].sizes[selectedSize].sku;

    // console.log({ userId: user._id, prodId: prodId, colorId: colorId, sizeId: sizeId, sku: sku });
    
    fetch(`/api/cart`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user._id, prodId: prodId, colorId: colorId, sizeId: sizeId, sku: sku })
    })
    .then(res => res.json())
    .then(data => {
      setUser({...user, cart: data.newCart});
    })
    .catch(err => {
      console.log(err);
      toast.error("Failed to add in cart.")
    });
    setIsLoading(false);
    toast.success("Added In Cart Successful");
  };

  const sizeListEl = productData?.varients[selectedColor].sizes.map(
    ({ sizeID, sizeName, stock }, key) => {
      return (
        <div
          key={key}
          className="relative flex flex-col items-center"
          onClick={() => {
            setSelectedSize(key);
            setIsOutOfStock(
              productData.varients[selectedColor].sizes[key].stock === 0,
            );
          }}  
        >
          <button
            className={
              "border-1 block rounded-full border-gray-300 font-medium cursor-pointer text-xl w-15 h-15 " +
              (selectedSize == key ? `border-none bg-[#fc2167] text-white` : "")
            }
          >
            {sizeName}
          </button>
          {/* Color - #d17a00 */}
          {stock < 10 && (
            <span className="absolute -bottom-2 bg-[#d17a00] text-white px-2">{stock} left</span>
          )}
        </div>
      );
    },
  );

  useEffect(() => {
    fetch(`/api/products/slug/${slug}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if(data) {
          const product = data;
          console.log(product);
          setProductData({
            _id: product._id,
            brandId: product.brandId,
            productName: product.productName,
            slug: product.slug,
            category: product.category,
            subcategory: product.subcategoryId._id,
            thumbnail: product.thumbnail,
            varients: product.varients,
            desc: product.desc,
            tags: product.tags,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
          });
          setIsOutOfStock(
            data.varients[selectedColor].sizes[selectedSize].stock === 0,
          );
        } else {
          alert("Data not found")
        }
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  }, []);

  return (
    <>
      <Navbar
        displayNavLinks={false}
        categories={null}
        activePage={null}
        setPage={() => {}}
        search={search}
        setSearch={setSearch}
        user={user}
        setUser={setUser}
      />
      <Toaster />
      {productData ? (
        <div className="h-[100vh] w-[100vw] mt-10 flex flex-col md:flex-row justify-evenly">
          {/* Photo Privews */}
          <div className="w-[100%] md:ml-0 md:w-[45vw] flex justify-center">
            {/* <img
              src={productData.varients[selectedColor].imgLinks[0]}
              alt="productImg"
              className="rounded-lg w-[95%]"
            /> */}
            <ProductPreviewSlider imageData={
              productData.varients[selectedColor].imgLinks.map((imgLink, key) => {
                return { id: key, image: imgLink }
              })
            } />
          </div>

          {/* Product Overview */}
          <div className="w-full md:w-[45vw] mt-10 ml-5 md:mt-0 md:ml-0 h-full">
            {/* Title and price display */}

            {/* <h1 className="hidden md:flex text-3xl font-bold">{productData.brandId.brandName}</h1>
            <span className="hidden md:flex text-xl text-gray-500">
              {productData.productName}
            </span> */}

            <p className="inline-block md:flex md:flex-col gap-2 line-clamp-2 w-[90%]">
              <span className="md:text-3xl text-xl font-bold">{productData.brandId.brandName}</span> {" "}
              <span className="md:text-xl text-xl text-gray-500">
                {productData.productName}
              </span>
            </p>

            <div className="flex flex-row items-center md:mt-5">
              <span className="line-through text-gray-400">
                ₹ {productData.varients[selectedColor].sizes[selectedSize].mrp}
              </span>
              <h1 className="text-2xl font-semibold ml-3 mr-5">
                ₹{" "}
                {
                  productData.varients[selectedColor].sizes[selectedSize]
                    .sellingPrice
                }
              </h1>
              {/* color - #ff416e to #f48a6d */}
              <span
                className="
                  bg-[linear-gradient(90deg_,#ff416e_0%,#f48a6d_90%)] text-white font-bold text-lg pl-2 pr-5 inline-block [clip-path:polygon(0_0,100%_0,85%_100%,0%_100%)] rounded"
              >
                39% OFF!
              </span>
            </div>

            <span className="text-green-600 font-bold text-md inline-block mt-3">inclusive of all taxes</span>

            {/* Product description */}


            {/* Display colors */}
            <div className="flex flex-col gap-4">
              <h1 className="text-lg mt-5 font-semibold">Colors</h1>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-10 px-5 w-[90%]">
                {productData.varients.map(
                  ({ colorID, colorName, colorCode, imgLinks, sizes }, key) => {
                    return (
                      <div 
                        key={key} 
                        className="flex flex-col rounded-lg p-0"
                        onClick={e => {
                          setSelectedColor(key);
                          setSelectedSize(0);
                        }}
                      >
                        <img
                          src={imgLinks[0]}
                          width={70}
                          className="rounded-2xl"
                          style={ key === selectedColor ? { borderColor: '#ff4c85', borderWidth: 2, borderBottomWidth: 10 } : {}}
                        />
                      </div>
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
                  `mt-10 w-[80vw] md:w-140 mx-4 h-14 rounded font-semibold text-white text-xl hover:bg-white hover:text-[#fc2167] hover:border-[#fc2167] hover:border-1 transition-all duration-300s ` +
                  (isLoading
                    ? "bg-[#851136] cursor-not-allowed"
                    : "bg-[#fc2167] cursor-pointer")
                }
                disabled={isLoading}
              >
                Add to Cart
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