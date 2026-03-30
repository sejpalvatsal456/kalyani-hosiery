"use client";

import React, { ReactElement, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { ICategory, IDisplayProduct, IUser } from "@/lib/typeDefinitions";
import DisplayCard from "./DisplayCard";
import { FaFilter, FaSort } from "react-icons/fa";
import DisplayCardGrid from "./DisplayCardGrid";
import PriceSlider from "./PriceSlider";

const sortOptions = [
  { title: "What's new", tag: "W" },
  { title: "Price: High to Low", tag: "PHL" },
  { title: "Price: Low to High", tag: "PLH" },
];

// const displayProducts: IDisplayProduct[] = [
//   {
//     _id: "1",
//     brandName: "Powerlook",
//     productName: "Men Alphanumeric Printed Pullover",
//     slug: "man-alphanumeric-printed-pullover",
//     createdAt: "2026-02-25T14:50:24.481Z",
//     updatedAt: "2026-02-25T14:50:24.481Z",
//     category: {
//       _id: "123",
//       slug: "men",
//       name: "Men",
//     },
//     subcategory: {
//       _id: "1234",
//       categoryId: "123",
//       slug: "sweaters",
//       name: "Sweaters",
//     },
//     thumbnail:
//       "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
//     varients: [
//       {
//         colorID: "color1",
//         colorName: "Orange",
//         imgLinks: [
//           "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
//         ],
//         colorCode: "#ff5f1f",
//         sizes: [
//           {
//             sizeID: "size1",
//             sizeName: "S",
//             sku: "sku1",
//             stock: 10,
//             mrp: 2999,
//             sellingPrice: 670,
//             discountPercent: 77,
//           },
//         ],
//       },
//     ],
//     tags: [],
//     desc: [],
//   },

//   {
//     _id: "2",
//     brandName: "glitchez",
//     productName: "Men Printed Polo Collar T-shirt",
//     slug: "men-printed-polo-collar-t-shirt",
//     createdAt: "2026-02-25T14:50:24.481Z",
//     updatedAt: "2026-02-25T14:50:24.481Z",
//     category: {
//       _id: "123",
//       slug: "men",
//       name: "Men",
//     },
//     subcategory: {
//       _id: "1235",
//       categoryId: "123",
//       slug: "t-shirts",
//       name: "T Shirts",
//     },
//     thumbnail:
//       "https://assets.myntassets.com/w_360,q_50,,dpr_2,fl_progressive,f_webp/assets/images/2026/MARCH/5/iBX250Hm_944daf02f6a5496e878fc3404c8253fd.jpg",
//     varients: [
//       {
//         colorID: "color1",
//         colorName: "White",
//         imgLinks: [
//           "https://assets.myntassets.com/w_360,q_50,,dpr_2,fl_progressive,f_webp/assets/images/2026/MARCH/5/iBX250Hm_944daf02f6a5496e878fc3404c8253fd.jpg",
//         ],
//         colorCode: "#ffffff",
//         sizes: [
//           {
//             sizeID: "size1",
//             sizeName: "M",
//             sku: "sku1",
//             stock: 10,
//             mrp: 1299,
//             sellingPrice: 249,
//             discountPercent: 81,
//           },
//         ],
//       },
//     ],
//     tags: [],
//     desc: [],
//   },

//   {
//     _id: "3",
//     brandName: "Pepe Jeans",
//     productName: "Men Crew Neck Relaxed Fit Lounge Tshirt",
//     slug: "men-crew-neck-relaxed-fit-lounge-tshirt",
//     createdAt: "2026-02-25T14:50:24.481Z",
//     updatedAt: "2026-02-25T14:50:24.481Z",
//     category: {
//       _id: "123",
//       slug: "men",
//       name: "Men",
//     },
//     subcategory: {
//       _id: "1235",
//       categoryId: "123",
//       slug: "t-shirts",
//       name: "T Shirts",
//     },
//     thumbnail:
//       "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2026/MARCH/23/yBgZ806s_095c44aa6f344380b0e75635a0eae06f.jpg",
//     varients: [
//       {
//         colorID: "color1",
//         colorName: "Black",
//         imgLinks: [
//           "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2026/MARCH/23/yBgZ806s_095c44aa6f344380b0e75635a0eae06f.jpg",
//         ],
//         colorCode: "#000000",
//         sizes: [
//           {
//             sizeID: "size1",
//             sizeName: "S",
//             sku: "sku1",
//             stock: 10,
//             mrp: 799,
//             sellingPrice: 487,
//             discountPercent: 39,
//           },
//         ],
//       },
//     ],
//     tags: [],
//     desc: [],
//   },

//   {
//     _id: "4",
//     brandName: "Powerlook",
//     productName: "Men Alphanumeric Printed Pullover",
//     slug: "man-alphanumeric-printed-pullover",
//     createdAt: "2026-02-25T14:50:24.481Z",
//     updatedAt: "2026-02-25T14:50:24.481Z",
//     category: {
//       _id: "123",
//       slug: "men",
//       name: "Men",
//     },
//     subcategory: {
//       _id: "1234",
//       categoryId: "123",
//       slug: "sweaters",
//       name: "Sweaters",
//     },
//     thumbnail:
//       "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
//     varients: [
//       {
//         colorID: "color1",
//         colorName: "Orange",
//         imgLinks: [
//           "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/6/rCd2DDql_441bc079c21e4cc4900606c7858016ea.jpg",
//         ],
//         colorCode: "#ff5f1f",
//         sizes: [
//           {
//             sizeID: "size1",
//             sizeName: "S",
//             sku: "sku1",
//             stock: 10,
//             mrp: 2999,
//             sellingPrice: 670,
//             discountPercent: 77,
//           },
//         ],
//       },
//     ],
//     tags: [],
//     desc: [],
//   },

//   {
//     _id: "5",
//     brandName: "glitchez",
//     productName: "Men Printed Polo Collar T-shirt",
//     slug: "men-printed-polo-collar-t-shirt",
//     createdAt: "2026-02-25T14:50:24.481Z",
//     updatedAt: "2026-02-25T14:50:24.481Z",
//     category: {
//       _id: "123",
//       slug: "men",
//       name: "Men",
//     },
//     subcategory: {
//       _id: "1235",
//       categoryId: "123",
//       slug: "t-shirts",
//       name: "T Shirts",
//     },
//     thumbnail:
//       "https://assets.myntassets.com/w_360,q_50,,dpr_2,fl_progressive,f_webp/assets/images/2026/MARCH/5/iBX250Hm_944daf02f6a5496e878fc3404c8253fd.jpg",
//     varients: [
//       {
//         colorID: "color1",
//         colorName: "White",
//         imgLinks: [
//           "https://assets.myntassets.com/w_360,q_50,,dpr_2,fl_progressive,f_webp/assets/images/2026/MARCH/5/iBX250Hm_944daf02f6a5496e878fc3404c8253fd.jpg",
//         ],
//         colorCode: "#ffffff",
//         sizes: [
//           {
//             sizeID: "size1",
//             sizeName: "M",
//             sku: "sku1",
//             stock: 10,
//             mrp: 1299,
//             sellingPrice: 249,
//             discountPercent: 81,
//           },
//         ],
//       },
//     ],
//     tags: [],
//     desc: [],
//   },

//   {
//     _id: "6",
//     brandName: "Pepe Jeans",
//     productName: "Men Crew Neck Relaxed Fit Lounge Tshirt",
//     slug: "men-crew-neck-relaxed-fit-lounge-tshirt",
//     createdAt: "2026-02-25T14:50:24.481Z",
//     updatedAt: "2026-02-25T14:50:24.481Z",
//     category: {
//       _id: "123",
//       slug: "men",
//       name: "Men",
//     },
//     subcategory: {
//       _id: "1235",
//       categoryId: "123",
//       slug: "t-shirts",
//       name: "T Shirts",
//     },
//     thumbnail:
//       "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2026/MARCH/23/yBgZ806s_095c44aa6f344380b0e75635a0eae06f.jpg",
//     varients: [
//       {
//         colorID: "color1",
//         colorName: "Black",
//         imgLinks: [
//           "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2026/MARCH/23/yBgZ806s_095c44aa6f344380b0e75635a0eae06f.jpg",
//         ],
//         colorCode: "#000000",
//         sizes: [
//           {
//             sizeID: "size1",
//             sizeName: "S",
//             sku: "sku1",
//             stock: 10,
//             mrp: 799,
//             sellingPrice: 487,
//             discountPercent: 39,
//           },
//         ],
//       },
//     ],
//     tags: [],
//     desc: [],
//   },

// ];

const getLowestPrice = (product: IDisplayProduct) => {
  return Math.min(
    ...product.varients.flatMap((v) => v.sizes.map((s) => s.sellingPrice)),
  );
};

export function formatLabel(input: string): string {
  return input
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

// SearchPageWrapper Component

export default function SearchPageWrapper({
  searchQuery,
  brand,
  subcategory
}: {
  searchQuery: string;
  brand: string;
  subcategory: string,
}) {
  const [products, setProducts] = useState<IDisplayProduct[] | null>(null);
  // const [products, setProducts] = useState<IDisplayProduct[]|null>(
  //   displayProducts,
  // ); // dev only
  const [filteredProducts, setFilteredProducts] = useState<IDisplayProduct[]>(
    [],
  );
  const [brands, setBrands] = useState<string[]>([]);
  const [size, setSize] = useState<string>("");
  const [colorCode, setColorCode] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{ low: number; high: number }>({
    low: 100,
    high: 10000,
  });
  const [sortCategory, setSortCategory] = useState<{
    title: string;
    tag: string;
  }>(sortOptions[0]);

  const [isSortCategoryClicked, setIsSortCategoryClicked] =
    useState<boolean>(false);
  const [isFilterClicked, setIsFilterClicked] = useState<boolean>(false);
  const [search, setSearch] = useState<string>(searchQuery);
  const [user, setUser] = useState<IUser | null>(null);

  // Fetching the data product from API
  useEffect(() => {
    fetch('/api/products', {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
    .then(res => res.json())
    .then(data => {
      setProducts(data);
    })
    .catch(err => console.log(err))
  }, []);

  // Fetch all brands, size, colors from the products

  const allBrands = React.useMemo(() => {
    if (!products) return [];

    const brandMap = new Map<string, number>();

    products.forEach((product) => {
      const currentCount = brandMap.get(product.brandId.brandName) || 0;
      brandMap.set(product.brandId.brandName, currentCount + 1);
    });

    return Array.from(brandMap.entries()).map(([name, stock]) => ({
      name,
      stock,
    }));
  }, [products]);

  const allSizes = React.useMemo(() => {
    if (!products) return [];

    const sizeSet = new Set<string>();

    products.forEach((product) => {
      product.varients.forEach((v) => {
        v.sizes.forEach((s) => {
          sizeSet.add(s.sizeName);
        });
      });
    });

    return Array.from(sizeSet);
  }, [products]);

  const allColors = React.useMemo(() => {
    if (!products) return [];

    const colorSet = new Map<string, string>();

    products.forEach((product) => {
      product.varients.forEach((v) => {
        colorSet.set(v.colorName, v.colorCode);
      });
    });

    return Array.from(colorSet.entries()).map(([name, code]) => ({
      colorName: name,
      colorCode: code,
    }));
  }, [products]);

  // Elements or options for brands, sizes and colors

  const allBrandSelectionEl = allBrands.map((brand, key) => {
    return (
      <li className="w-full flex gap-5 items-center" key={key}>
        <input
          type="checkbox"
          onChange={(e) => {
            e.target.checked
              ? setBrands([...brands, brand.name])
              : setBrands(
                  brands.filter((brandName) => brandName !== brand.name),
                );
          }}
        />{" "}
        <span className="text-sm">{brand.name.toUpperCase()}</span>{" "}
        <span className="text-gray-400">({brand.stock})</span>
      </li>
    );
  });

  const allSizesSelectionEl = allSizes.map((size, key) => {
    return (
      <option key={key} value={size}>
        {size}
      </option>
    );
  });

  const allColorsSelectionEl = allColors.map((color, key) => {
    return (
      <li className="w-full flex gap-2 items-center" key={key}>
        <input
          type="checkbox"
          className="mr-3"
          onChange={(e) => {
            e.target.checked
              ? setColorCode([...colorCode, color.colorCode])
              : setColorCode(
                  colorCode.filter((code) => code != color.colorCode),
                );
          }}
        />
        <div
          style={{ backgroundColor: color.colorCode }}
          className="w-4.5 h-4.5 rounded-full border-1 border-black"
        ></div>
        <span className="text-sm">{color.colorName.toUpperCase()}</span>
      </li>
    );
  });

  // useEffect(() => {
  //   fetch(`/api/subcategories/${categoryName}/${subcategoryName}`, {
  //     method: "GET",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const products:ProductApiType[] = data.products;
  //       const displayProducts = products.map(product => {
  //         return {
  //           _id: product._id,
  //           brandName: product.brandId.name,
  //           productName: product.productName,
  //           categoryId: {
  //             _id: product.categoryId._id,
  //             name: product.categoryId.name
  //           },
  //           subcategoryId: {
  //             _id: product.subcategoryId._id,
  //             categoryId: product.subcategoryId.categoryId,
  //             name: product.subcategoryId.name
  //           },
  //           thumbnail: product.thumbnail,
  //           variety: product.variety,
  //           desc: product.desc,
  //           createdAt: product.createdAt,
  //           updatedAt: product.updatedAt
  //         }
  //       });
  //       setProducts(displayProducts);
  //       setFilteredProducts(data.products);
  //     })
  //     .catch((err) => alert(err));
  // }, [categoryName, subcategoryName]);

  // Fetch the data from the api
  // DEVONLY: The data is getting fetched from fixed data

  useEffect(() => {

    
    console.log("New Product Data: ");

    let newProducts:IDisplayProduct[] = products || [];
  
    // search result 
    if(searchQuery) {
      console.log("Search Query: " + searchQuery);
      newProducts = newProducts?.filter(p => {
        if(p.productName.includes(searchQuery) || p.brandId.brandName.includes(searchQuery)) return p
      });
    }

    if(brand) {
      console.log("Brand: " + brand);
      newProducts = newProducts?.filter(p => {
        if(p.brandId.brandName.toLowerCase().includes(brand.toLowerCase())) return p
      });
    }

    if(subcategory) {
      console.log("Subcategory: " + subcategory);
      newProducts = newProducts?.filter(p => {
        console.log(p.subcategory.name + " - " + subcategory.toLowerCase());
        if(p.subcategory.slug === subcategory) return p
      });
    }

    console.log("")
    console.log(newProducts);
    setProducts(newProducts || []);

  }, []);

  useEffect(() => {
    if (!products) return;

    let updated = [...products];

    // Brand filter
    if (brands.length > 0) {
      updated = updated.filter((p) => brands.includes(p.brandId.brandName));
    }

    // Size filter
    if (size) {
      updated = updated.filter((p) =>
        p.varients.some((v) => v.sizes.some((s) => s.sizeName === size)),
      );
    }

    // Price filter
    updated = updated.filter((p) => {
      const lowest = Math.min(
        ...p.varients.flatMap((v) => v.sizes.map((s) => s.sellingPrice)),
      );

      return lowest >= priceRange.low && lowest <= priceRange.high;
    });

    // Color filter
    if(colorCode.length > 0) {
      updated = updated.filter((p) => 
        p.varients.some(v => colorCode.includes(v.colorCode))
      );
    }

    // Search filter
    updated = updated.filter((p) => {
      return (
        p.brandId.brandName.toLowerCase().includes(search.toLowerCase()) ||
        p.productName.toLowerCase().includes(search.toLowerCase())
      );
    });

    // Sorting
    if (sortCategory.tag === "PHL") {
      updated.sort((a, b) => getLowestPrice(b) - getLowestPrice(a));
    }

    if (sortCategory.tag === "PLH") {
      updated.sort((a, b) => getLowestPrice(a) - getLowestPrice(b));
    }

    if (sortCategory.tag === "W") {
      updated.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    }

    setFilteredProducts(updated);
  }, [brands, size, priceRange, colorCode, sortCategory, search, products]);

  const displaySearchPath = () => {
    if(searchQuery) {
      return (
        <div className="hidden md:flex">
          Home / Search /{" "}
          <span className="ml-1 font-semibold">
            {formatLabel(searchQuery)}
          </span>
        </div>
      )
    }

    if(brand) {
      return (
        <div className="hidden md:flex">
          Home / Brand /{" "}
          <span className="ml-1 font-semibold">
            {formatLabel(brand)}
          </span>
        </div>
      )
    } 

    if(subcategory) {
      return (
        <div className="hidden md:flex">
          Home / Category /{" "}
          <span className="ml-1 font-semibold">
            {formatLabel(subcategory)}
          </span>
        </div>
      )
    }
    
  }

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

      <div className="flex flex-col">
        <div className="mt-5 mx-5 flex items-center justify-between">

          {/* Display Search Path */}
          {displaySearchPath()}

          <div className="hidden md:block">
            Sort By:
            <select
              name="sortInput"
              id="sortInput"
              className="px-2.5 py-2 ml-3"
              onChange={(e) => {
                const selected = sortOptions.find(
                  (opt) => opt.tag === e.target.value,
                );
                if (selected) setSortCategory(selected);
              }}
            >
              {sortOptions.map((option, key) => {
                return (
                  <option key={key} value={option.tag}>
                    {option.title}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="flex justify-evenly md:mt-5">
          {/* Filter options */}
          <div className="w-60 hidden md:block">
            <div className="w-60 border-gray-300 border-1 py-3 pl-6">
              <span className="text-md font-semibold">BRAND</span>
              <ul className="mt-3 text-md ml-3">{allBrandSelectionEl}</ul>
            </div>

            <div className="border-gray-300 border-1 py-3 pl-6">
              <span className="text-lg font-semibold">SIZES</span>
              <select
                name="sizeInput"
                className="block w-40 text-sm border-1 py-1.5 my-3 ml-3 rounded px-2"
                id="sizeInput"
                onChange={(e) => setSize(e.target.value)}
              >
                <option value="">All Sizes</option>
                {allSizesSelectionEl}
              </select>
            </div>

            {/* New Price Range Slider */}
            <div className="border-gray-300 border-1 py-3 pl-6">
              <PriceSlider
                priceRange={priceRange}
                setPriceRange={setPriceRange}
              />
            </div>
            <div className="border-gray-300 border-1 py-3 pl-6">
              <span className="text-md font-semibold">COLOR</span>
              <ul className="mt-3 text-md ml-3 flex flex-col gap-2">{allColorsSelectionEl}</ul>
            </div>
          </div>

          {/* Products */}

          <div
            style={{ marginBottom: "5rem" }}
            className="w-full md:px-3 md:py-3 md:border-t-1 border-gray-300"
          >
            <DisplayCardGrid products={filteredProducts} />
          </div>
        </div>

        {/* Sort By Element for mobile */}
        <div
          className={
            "md:hidden w-full bg-white bottom-[10vh] transition-all duration-300 ease-in-out border-1 border-gray-300 fixed z-50 " +
            (isSortCategoryClicked
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-full pointer-events-none")
          }
        >
          <ul>
            {sortOptions.map((opt, key) => {
              return (
                <li
                  key={key}
                  className={
                    "w-full h-15 flex items-center justify-center text-lg " +
                    (opt === sortCategory ? "bg-gray-200" : "")
                  }
                  onClick={(e) => {
                    setSortCategory(opt);
                    setIsSortCategoryClicked(false);
                  }}
                >
                  {opt.title}
                </li>
              );
            })}
          </ul>
        </div>

        {(isFilterClicked || isSortCategoryClicked) && (
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setIsFilterClicked(false)}
          />
        )}

        <div
          className={
            "md:hidden w-full bg-white fixed z-41 bottom-[10vh] max-h-[80vh] overflow-y-auto transition-all duration-300 ease-in-out border border-gray-300" +
            (isFilterClicked
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-full pointer-events-none")
          }
        >
          {/* Brand Filters */}
          <div className="p-5 border-b-1 border-gray-300">
            <span className="text-lg font-medium">BRAND</span>
            <ul className="mt-3 text-md ml-3">{allBrandSelectionEl}</ul>
          </div>

          {/* Size Filter */}
          <div className="p-5 border-b-1 border-gray-300">
            <span className="text-lg font-medium">SIZES</span>
            <select
              name="sizeInput"
              className="block w-[50vw] text-sm border-1 py-1.5 my-3 ml-3 rounded px-2"
              id="sizeInput"
              onChange={(e) => setSize(e.target.value)}
            >
              <option value="">All Sizes</option>
              {allSizesSelectionEl}
            </select>
          </div>

          {/* New Price Filter */}
          <div className="p-5 border-b-1 border-gray-300">
            <PriceSlider
              priceRange={priceRange}
              setPriceRange={setPriceRange}
            />
          </div>

          <div className="border-gray-300 border-1 py-3 pl-6">
            <span className="text-md font-semibold">COLOR</span>
            <ul className="mt-3 text-md ml-3">{allColorsSelectionEl}</ul>
          </div>
        </div>

        {/* Filter and Sort options for mobile view */}
        <div className="flex md:hidden w-full bg-white h-[10vh] absolute fixed z-50 bottom-0">
          <button
            className="w-[50vw] border-1 border-gray-300 text-xl flex items-center justify-center gap-3"
            onClick={(e) => {
              e.preventDefault();
              setIsSortCategoryClicked(!isSortCategoryClicked);
              setIsFilterClicked(false);
            }}
          >
            Sort By
            <FaSort />
          </button>
          <button
            className="w-[50vw] border-1 border-gray-300 text-xl flex items-center justify-center gap-3"
            onClick={(e) => {
              e.preventDefault();
              setIsFilterClicked(!isFilterClicked);
              setIsSortCategoryClicked(false);
            }}
          >
            Filter
            <FaFilter />
          </button>
        </div>
      </div>
    </>
  );
}
