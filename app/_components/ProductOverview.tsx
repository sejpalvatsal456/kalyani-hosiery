"use client";

import React, { useEffect, useEffectEvent, useState } from "react";
import Navbar from "./Navbar";
import { usePathname, useRouter } from "next/navigation";
import { IDisplayProduct, IProduct, IUser } from "@/lib/typeDefinitions";
import BannerSlider from "./BannerSlider";
import ProductPreviewSlider from "./ProductPreviewSlider";
import toast, { Toaster } from "react-hot-toast";
import { IoBagHandleOutline, IoBagOutline } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { Banknote, RefreshCcw } from "lucide-react";
import DisplayCardGrid from "./DisplayCardGrid";

const getDiscount = (mrp: number, price: number) => {
  const discount = ((mrp - price) / mrp) * 100;
  return Math.round(discount);
};

const displayProducts: IDisplayProduct[] = [
  {
    _id: "1",
    brandId: {
      brandName: "Powerlook",
      brandLogo: "",
    },
    productName: "Men Alphanumeric Printed Pullover",
    slug: "man-alphanumeric-printed-pullover",
    createdAt: "2026-02-25T14:50:24.481Z",
    updatedAt: "2026-02-25T14:50:24.481Z",
    category: {
      _id: "123",
      slug: "men",
      name: "Men",
    },
    subcategory: {
      _id: "1234",
      categoryId: "123",
      slug: "sweaters",
      name: "Sweaters",
    },
    thumbnail:
      "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
    varients: [
      {
        sku: "sku1",
        colorName: "Orange",
        colorCode: "#ff5f1f",
        sizeName: "S",
        imgLinks: [
          "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
        ],
        stock: 10,
        mrp: 2999,
        sellingPrice: 670,
        discountPercent: 77,
      },
    ],
    tags: [],
    desc: [],
  },
  {
    _id: "2",
    brandId: {
      brandName: "Powerlook",
      brandLogo: "",
    },
    productName: "Men Alphanumeric Printed Pullover",
    slug: "man-alphanumeric-printed-pullover",
    createdAt: "2026-02-25T14:50:24.481Z",
    updatedAt: "2026-02-25T14:50:24.481Z",
    category: {
      _id: "123",
      slug: "men",
      name: "Men",
    },
    subcategory: {
      _id: "1234",
      categoryId: "123",
      slug: "sweaters",
      name: "Sweaters",
    },
    thumbnail:
      "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
    varients: [
      {
        sku: "sku1",
        colorName: "Orange",
        colorCode: "#ff5f1f",
        sizeName: "S",
        imgLinks: [
          "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
        ],
        stock: 10,
        mrp: 2999,
        sellingPrice: 670,
        discountPercent: 77,
      },
    ],
    tags: [],
    desc: [],
  },
  {
    _id: "3",
    brandId: {
      brandName: "Powerlook",
      brandLogo: "",
    },
    productName: "Men Alphanumeric Printed Pullover",
    slug: "man-alphanumeric-printed-pullover",
    createdAt: "2026-02-25T14:50:24.481Z",
    updatedAt: "2026-02-25T14:50:24.481Z",
    category: {
      _id: "123",
      slug: "men",
      name: "Men",
    },
    subcategory: {
      _id: "1234",
      categoryId: "123",
      slug: "sweaters",
      name: "Sweaters",
    },
    thumbnail:
      "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
    varients: [
      {
        sku: "sku1",
        colorName: "Orange",
        colorCode: "#ff5f1f",
        sizeName: "S",
        imgLinks: [
          "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
        ],
        stock: 10,
        mrp: 2999,
        sellingPrice: 670,
        discountPercent: 77,
      },
    ],
    tags: [],
    desc: [],
  },
  {
    _id: "4",
    brandId: {
      brandName: "Powerlook",
      brandLogo: "",
    },
    productName: "Men Alphanumeric Printed Pullover",
    slug: "man-alphanumeric-printed-pullover",
    createdAt: "2026-02-25T14:50:24.481Z",
    updatedAt: "2026-02-25T14:50:24.481Z",
    category: {
      _id: "123",
      slug: "men",
      name: "Men",
    },
    subcategory: {
      _id: "1234",
      categoryId: "123",
      slug: "sweaters",
      name: "Sweaters",
    },
    thumbnail:
      "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
    varients: [
      {
        sku: "sku1",
        colorName: "Orange",
        colorCode: "#ff5f1f",
        sizeName: "S",
        imgLinks: [
          "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
        ],
        stock: 10,
        mrp: 2999,
        sellingPrice: 670,
        discountPercent: 77,
      },
    ],
    tags: [],
    desc: [],
  },
  {
    _id: "5",
    brandId: {
      brandName: "Powerlook",
      brandLogo: "",
    },
    productName: "Men Alphanumeric Printed Pullover",
    slug: "man-alphanumeric-printed-pullover",
    createdAt: "2026-02-25T14:50:24.481Z",
    updatedAt: "2026-02-25T14:50:24.481Z",
    category: {
      _id: "123",
      slug: "men",
      name: "Men",
    },
    subcategory: {
      _id: "1234",
      categoryId: "123",
      slug: "sweaters",
      name: "Sweaters",
    },
    thumbnail:
      "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
    varients: [
      {
        sku: "sku1",
        colorName: "Orange",
        colorCode: "#ff5f1f",
        sizeName: "S",
        imgLinks: [
          "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
        ],
        stock: 10,
        mrp: 2999,
        sellingPrice: 670,
        discountPercent: 77,
      },
    ],
    tags: [],
    desc: [],
  },
  {
    _id: "6",
    brandId: {
      brandName: "Powerlook",
      brandLogo: "",
    },
    productName: "Men Alphanumeric Printed Pullover",
    slug: "man-alphanumeric-printed-pullover",
    createdAt: "2026-02-25T14:50:24.481Z",
    updatedAt: "2026-02-25T14:50:24.481Z",
    category: {
      _id: "123",
      slug: "men",
      name: "Men",
    },
    subcategory: {
      _id: "1234",
      categoryId: "123",
      slug: "sweaters",
      name: "Sweaters",
    },
    thumbnail:
      "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
    varients: [
      {
        sku: "sku1",
        colorName: "Orange",
        colorCode: "#ff5f1f",
        sizeName: "S",
        imgLinks: [
          "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
        ],
        stock: 10,
        mrp: 2999,
        sellingPrice: 670,
        discountPercent: 77,
      },
    ],
    tags: [],
    desc: [],
  },
  {
    _id: "7",
    brandId: {
      brandName: "Powerlook",
      brandLogo: "",
    },
    productName: "Men Alphanumeric Printed Pullover",
    slug: "man-alphanumeric-printed-pullover",
    createdAt: "2026-02-25T14:50:24.481Z",
    updatedAt: "2026-02-25T14:50:24.481Z",
    category: {
      _id: "123",
      slug: "men",
      name: "Men",
    },
    subcategory: {
      _id: "1234",
      categoryId: "123",
      slug: "sweaters",
      name: "Sweaters",
    },
    thumbnail:
      "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
    varients: [
      {
        sku: "sku1",
        colorName: "Orange",
        colorCode: "#ff5f1f",
        sizeName: "S",
        imgLinks: [
          "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
        ],
        stock: 10,
        mrp: 2999,
        sellingPrice: 670,
        discountPercent: 77,
      },
    ],
    tags: [],
    desc: [],
  },
  {
    _id: "8",
    brandId: {
      brandName: "Powerlook",
      brandLogo: "",
    },
    productName: "Men Alphanumeric Printed Pullover",
    slug: "man-alphanumeric-printed-pullover",
    createdAt: "2026-02-25T14:50:24.481Z",
    updatedAt: "2026-02-25T14:50:24.481Z",
    category: {
      _id: "123",
      slug: "men",
      name: "Men",
    },
    subcategory: {
      _id: "1234",
      categoryId: "123",
      slug: "sweaters",
      name: "Sweaters",
    },
    thumbnail:
      "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
    varients: [
      {
        sku: "sku1",
        colorName: "Orange",
        colorCode: "#ff5f1f",
        sizeName: "S",
        imgLinks: [
          "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
        ],
        stock: 10,
        mrp: 2999,
        sellingPrice: 670,
        discountPercent: 77,
      },
    ],
    tags: [],
    desc: [],
  },
  {
    _id: "9",
    brandId: {
      brandName: "Powerlook",
      brandLogo: "",
    },
    productName: "Men Alphanumeric Printed Pullover",
    slug: "man-alphanumeric-printed-pullover",
    createdAt: "2026-02-25T14:50:24.481Z",
    updatedAt: "2026-02-25T14:50:24.481Z",
    category: {
      _id: "123",
      slug: "men",
      name: "Men",
    },
    subcategory: {
      _id: "1234",
      categoryId: "123",
      slug: "sweaters",
      name: "Sweaters",
    },
    thumbnail:
      "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
    varients: [
      {
        sku: "sku1",
        colorName: "Orange",
        colorCode: "#ff5f1f",
        sizeName: "S",
        imgLinks: [
          "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
        ],
        stock: 10,
        mrp: 2999,
        sellingPrice: 670,
        discountPercent: 77,
      },
    ],
    tags: [],
    desc: [],
  },
];

type SimilarityMap = {
  [productId: string]: {
    product: IDisplayProduct;
    score: number;
  };
};

export default function ProductOverview({ slug }: { slug: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const [productData, setProductData] = useState<IDisplayProduct | null>(null);
  const [search, setSearch] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<number>(0);
  const [user, setUser] = useState<IUser | null>(null);
  const [similarProducts, setSimilarProducts] = useState<IDisplayProduct[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOutOfStock, setIsOutOfStock] = useState<boolean>(false);

  const colorGroups = productData
    ? Array.from(
        productData.varients.reduce((map, variant) => {
          const key = variant.colorCode || variant.colorName;
          const group = map.get(key) || {
            colorCode: variant.colorCode,
            colorName: variant.colorName,
            imgLinks: variant.imgLinks,
            variants: [] as IDisplayProduct["varients"],
          };

          group.variants.push(variant);
          map.set(key, group);
          return map;
        }, new Map<string, any>()),
      ).map(([, group]) => group)
    : [];

  const selectedColorGroup = colorGroups[selectedColor] || {
    colorCode: "",
    colorName: "",
    imgLinks: [] as string[],
    variants: [] as IDisplayProduct["varients"],
  };

  const selectedVariant =
    selectedColorGroup.variants[selectedSize] ||
    selectedColorGroup.variants[0] ||
    null;

  const fetchSimilarProducts = async ({
    tags,
    currentProductId,
    limit = 12,
  }: {
    tags: string[];
    currentProductId?: string;
    limit?: number;
  }): Promise<IDisplayProduct[]> => {
    try {
      // Remove duplicate / empty tags
      const uniqueTags = [
        ...new Set(tags.map((tag) => tag.trim().toLowerCase()).filter(Boolean)),
      ];

      if (!uniqueTags.length) return [];

      // Fetch all tags in parallel
      const responses = await Promise.all(
        uniqueTags.map(async (tag) => {
          const res = await fetch(
            `/api/products/search?q=${encodeURIComponent(tag)}&limit=${limit}`,
          );

          if (!res.ok) {
            throw new Error(`Failed fetching tag: ${tag}`);
          }

          return res.json();
        }),
      );

      const similarityMap: SimilarityMap = {};

      responses.forEach(
        (response: { products: IDisplayProduct[] }, tagIndex: number) => {
          const tag = uniqueTags[tagIndex];

          response.products.forEach((product: IDisplayProduct) => {
            // Ensure _id exists
            if (!product._id) return;

            // Skip current product
            if (product._id === currentProductId) return;

            // Create entry if not exists
            if (!similarityMap[product._id]) {
              similarityMap[product._id] = {
                product,
                score: 0,
              };
            }

            // Increase score if tag matches
            const matched =
              product.tags?.some((pTag) => pTag.toLowerCase().trim() === tag) ||
              false;

            similarityMap[product._id].score += matched ? 2 : 1;
          });
        },
      );

      // Sort by highest score
      const sortedProducts = Object.values(similarityMap)
        .sort((a, b) => b.score - a.score)
        .map((item) => item.product);

      return sortedProducts.slice(0, limit);
    } catch (err) {
      console.error("Failed to fetch similar products:", err);
      return [];
    }
  };

  const handleClick = () => {
    setIsLoading(true);
    if (!user) {
      setIsLoading(false);
      router.push(`/auth/login?callbackUrl=${encodeURIComponent(pathname)}`);
      return;
    }
    if (!productData || !selectedVariant) {
      setIsLoading(false);
      return;
    }

    const prodId = productData._id;
    const sku = selectedVariant.sku;

    fetch(`/api/cart`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user._id, prodId: prodId, sku }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUser({ ...user, cart: data.newCart });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to add in cart.");
      });
    setIsLoading(false);
    toast.success("Added In Cart Successful");
  };

  const handleBuyNow = async () => {
    setIsLoading(true);
    if (!user) {
      setIsLoading(false);
      router.push(`/auth/login?callbackUrl=${encodeURIComponent(pathname)}`);
      return;
    }
    if (!productData || !selectedVariant) {
      setIsLoading(false);
      return;
    }

    const prodId = productData._id;
    const sku = selectedVariant.sku;
    console.log(productData);
    /*
    productId: item.productId,
    color: item.color,
    colorId: item.colorId,
    size: item.size,
    sizeId: item.sizeId,
    sku: item.sku,
    price: item.sellingPrice,
    quantity: item.quantity,
    */
    const items = {
      productId: productData._id,
      color: selectedVariant.colorName,
      size: selectedVariant.sizeName,
      sku: selectedVariant.sku,
      price: selectedVariant.sellingPrice,
      quantity: 1,
    };
    console.log(items);

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: items }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.msg);
      return;
    }

    if (!user.address) {
      router.push("/addAddress/");
      return;
    }

    router.push("/checkout/");

    setIsLoading(false);
  };

  const sizeListEl = selectedColorGroup.variants.map(
    (variant: IDisplayProduct["varients"][number], key: number) => {
      return (
        <div
          key={key}
          className="relative flex flex-col items-center"
          onClick={() => {
            setSelectedSize(key);
            setIsOutOfStock(selectedColorGroup.variants[key]?.stock === 0);
          }}
        >
          <button
            className={
              "border-1 block rounded-xl border-gray-300 font-medium cursor-pointer text-md w-15 h-15 " +
              (selectedSize == key ? `border-none bg-[#fc2167] text-white` : "")
            }
          >
            {variant.sizeName}
          </button>
          {/* Color - #d17a00 */}
          {variant.stock < 10 && (
            <span className="absolute -bottom-2 bg-[#d17a00] text-white px-2">
              {variant.stock} left
            </span>
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
        if (data) {
          const product = data;
          // console.log("Product Data from API: ");
          // console.log(product);
          setProductData({
            _id: product._id,
            brandId: product.brandId,
            productName: product.productName,
            slug: product.slug,
            category: product.categoryId,
            subcategory: product.subcategoryId,
            thumbnail: product.thumbnail,
            varients: product.varients,
            desc: product.desc,
            tags: product.tags,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
          });
          setSelectedColor(0);
          setSelectedSize(0);
        } else {
          alert("Data not found");
        }
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  }, []);

  // Finding the simlilar products
  // Find products with same tags
  useEffect(() => {
    if (!productData) return;
    const tags = productData.tags;
    fetchSimilarProducts({
      tags: productData.tags,
      currentProductId: productData._id,
      limit: 10,
    }).then((data) => {
      console.log("Similar Data: ");
      console.log(data);
      setSimilarProducts(data);
    });
  }, [productData]);

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
      <div>
        {productData ? (
          <div className="w-full mt-10 flex flex-col md:flex-row justify-evenly">
            {/* Photo Privews */}
            <div className="w-[100%] md:ml-0 md:w-[45vw] flex justify-center">
              <ProductPreviewSlider
                imageData={
                  selectedVariant?.imgLinks?.map(
                    (imgLink: string, key: number) => {
                      return { id: key, image: imgLink };
                    },
                  ) || []
                }
              />
            </div>

            {/* Product Overview */}
            <div className="w-full md:w-[45vw] mt-10 ml-5 md:mt-0 md:ml-0">
              {/* Title and price display */}

              {/* <h1 className="hidden md:flex text-3xl font-bold">{productData.brandId.brandName}</h1>
            <span className="hidden md:flex text-xl text-gray-500">
              {productData.productName}
            </span> */}

              <p className="inline-block md:flex md:flex-col gap-2 line-clamp-2 w-[90%]">
                <span className="md:text-3xl text-xl font-bold">
                  {productData.brandId.brandName}
                </span>{" "}
                <span className="md:text-xl text-xl text-gray-500">
                  {productData.productName}
                </span>
              </p>

              <div className="flex flex-row items-center md:mt-5">
                <span className="line-through text-gray-400">
                  ₹ {selectedVariant?.mrp}
                </span>
                <h1 className="text-2xl font-semibold ml-3 mr-5">
                  ₹ {selectedVariant?.sellingPrice}
                </h1>
                {/* color - #ff416e to #f48a6d */}
                <span
                  className="
                  bg-[linear-gradient(90deg_,#ff416e_0%,#f48a6d_90%)] text-white font-bold text-lg pl-2 pr-5 inline-block [clip-path:polygon(0_0,100%_0,85%_100%,0%_100%)] rounded"
                >
                  {selectedVariant?.discountPercent?.toFixed(0)}% OFF!
                </span>
              </div>

              <span className="text-green-600 font-bold text-md inline-block mt-3">
                inclusive of all taxes
              </span>

              {/* Product description */}

              {/* Display colors */}
              <div className="flex flex-col gap-4">
                <h1 className="text-lg mt-5 font-semibold">Colors</h1>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-10 px-5 w-[90%]">
                  {colorGroups.map(({ imgLinks }, key) => {
                    return (
                      <div
                        key={key}
                        className="flex flex-col rounded-lg p-0"
                        onClick={(e) => {
                          setSelectedColor(key);
                          setSelectedSize(0);
                        }}
                      >
                        <img
                          src={imgLinks[0]}
                          width={70}
                          className="rounded-2xl"
                          style={
                            key === selectedColor
                              ? {
                                  borderColor: "#ff4c85",
                                  borderWidth: 2,
                                  borderBottomWidth: 10,
                                }
                              : {}
                          }
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Display Sizes */}

              <div className="flex flex-col gap-4">
                <h1 className="text-lg mt-5 font-semibold">Sizes</h1>
                <div className="mx-5 w-[80vw] md:w-[40vw] grid grid-cols-3 md:grid-cols-5 gap-4">
                  {selectedColorGroup.variants.length ? sizeListEl : null}
                </div>
              </div>

              {/* Buy Now button */}

              {!isOutOfStock ? (
                <>
                  <button
                    onClick={handleClick}
                    className={
                      `mt-10 w-[80vw] md:w-140 mx-4 h-14 flex justify-center items-center gap-4 rounded-xl font-semibold text-white text-xl hover:bg-white hover:text-[#fc2167] hover:border-[#fc2167] hover:border-1 transition-all duration-300s ` +
                      (isLoading
                        ? "bg-[#851136] cursor-not-allowed"
                        : "bg-[#fc2167] cursor-pointer")
                    }
                    disabled={isLoading}
                  >
                    <IoBagHandleOutline size={25} />
                    Add to Cart
                  </button>
                  <button
                    className="mt-5 w-[80vw] md:w-140 mx-4 flex justify-center items-center gap-4 h-14 bg-white rounded-xl font-semibold text-[#fc2167] text-xl border-1 cursor-pointer hover:bg-gray-100 transition-all duration-300s "
                    onClick={handleBuyNow}
                  >
                    <TbTruckDelivery size={25} />
                    Buy Now
                  </button>
                </>
              ) : (
                <button
                  disabled
                  className="mt-10 w-[80vw] md:w-140 mx-4 h-14 bg-white rounded-xl font-semibold text-[#bf1b4f] text-xl border-1 cursor-not-allowed transition-all duration-300s "
                >
                  Out of Stock
                </button>
              )}

              {/* <div className="space-y-3 mt-5 text-[#1f2937]">
              <div className="flex items-center gap-4">
                <div className="relative flex h-12 w-12 items-center justify-center">
                  <Banknote className="h-9 w-9 stroke-[1.8]" />

                  <div className="absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-full border border-[#20c997] bg-white">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-3 w-3 text-[#20c997]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold leading-none tracking-[-0.02em]">
                    Pay on Delivery is available
                  </h3>

                  <p className="text-sm text-gray-500">
                    ₹10 additional fee applicable
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative flex h-12 w-12 items-center justify-center">
                  <RefreshCcw className="h-7 w-7 stroke-[1.8]" />
                  <div className="absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-full border border-[#20c997] bg-white">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-3 w-3 text-[#20c997]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold leading-none tracking-[-0.02em]">
                    Hassle free 7 days Return & Exchange
                  </h3>
                </div>
              </div>
            </div> */}

              <div className="flex flex-col gap-2">
                <h1 className="text-lg mt-5 font-semibold">Descriptions</h1>
                <div className="mb-10 mt-5 grid grid-cols-2 gap-5 border-1 border-gray-300 p-4 rounded-xl mr-10">
                  {productData.desc.map((pair, key) => {
                    return (
                      <div key={key} className="flex flex-col text-gray-800">
                        <span className="font-bold">{pair.key}</span>
                        <span>{pair.value}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div className="flex flex-col gap-5 mx-5 md:mx-10 mb-10">
        <h1 className="inline-block font-semibold text-2xl">
          Similar Products
        </h1>
        {similarProducts.length === 0 ? (
          <span className="text-md text-gray-600 ml-5 italic">No Product here.</span>
        ) : (
          <DisplayCardGrid products={similarProducts} />
        )}
      </div>
    </>
  );
}
