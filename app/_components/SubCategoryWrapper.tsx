"use client";

import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import {
  DisplayProductType,
  User,
} from "@/lib/typeDefinitions";
import DisplayCard from "./DisplayCard";
import { FaFilter, FaSort } from "react-icons/fa";

const sortOptions = [
  { title: "What's new", tag: "W" },
  { title: "Price: High to Low", tag: "PHL" },
  { title: "Price: Low to High", tag: "PLH" },
];

const getLowestPrice = (product: DisplayProductType) => {
  return Math.min(
    ...product.variety.flatMap(v =>
      v.sizes.map(s => s.sellingPrice)
    )
  );
}

export default function SubCateogryWrapper({
  categoryName,
  subcategoryName,
}: {
  categoryName: string;
  subcategoryName: string;
}) {
  const [products, setProducts] = useState<DisplayProductType[] | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<
    DisplayProductType[]
  >([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [size, setSize] = useState<string>("");
  const [priceRange, setPriceRange] = useState<{ low: number; high: number }>({
    low: 100,
    high: 10000,
  });
  const [sortCategory, setSortCategory] = useState<{
    title: string;
    tag: string;
  }>(sortOptions[0]);

  const [isSortCategoryClicked, setIsSortCategoryClicked] = useState<boolean>(false);
  const [isFilterClicked, setIsFilterClicked] = useState<boolean>(false);
  const [user, setUser] = useState<User|null>(null);

  const [search, setSearch] = useState<string>("");

  // Getting all the brands
  const allBrands = React.useMemo(() => {
    if (!products) return [];

    const brandMap = new Map<string, number>();

    products.forEach((product) => {
      const currentCount = brandMap.get(product.brandName) || 0;
      brandMap.set(product.brandName, currentCount + 1);
    });

    return Array.from(brandMap.entries()).map(([name, stock]) => ({
      name,
      stock,
    }));
  }, [products]);

  // Getting all the sizes
  const allSizes = React.useMemo(() => {
    if (!products) return [];

    const sizeSet = new Set<string>();

    products.forEach((product) => {
      product.variety.forEach((v) => {
        v.sizes.forEach((s) => {
          sizeSet.add(s.size);
        });
      });
    });

    return Array.from(sizeSet);
  }, [products]);

  useEffect(() => {
    fetch(`/api/subcategories/${categoryName}/${subcategoryName}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setFilteredProducts(data.products);
      })
      .catch((err) => alert(err));
  }, [categoryName, subcategoryName]);

  useEffect(() => {
    if (!products) return;

    let updated = [...products];

    // Brand filter
    if (brands.length > 0) {
      updated = updated.filter((p) => brands.includes(p.brandName));
    }

    // Size filter
    if (size) {
      updated = updated.filter((p) =>
        p.variety.some((v) => v.sizes.some((s) => s.size === size)),
      );
    }

    // Price filter
    updated = updated.filter((p) => {
      const lowest = Math.min(
        ...p.variety.flatMap((v) => v.sizes.map((s) => s.sellingPrice)),
      );

      return lowest >= priceRange.low && lowest <= priceRange.high;
    });

    // Search filter 
    updated = updated.filter((p) => {
      return p.brandName.toLowerCase().includes(search.toLowerCase()) || p.productName.toLowerCase().includes(search.toLowerCase());
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
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      );
    }

    setFilteredProducts(updated);
  }, [brands, size, priceRange, sortCategory, search, products]);

  const allBrandSelectionEl = allBrands.map((brand, key) => {
    return (
      <li className="w-full flex gap-5" key={key}>
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

  return (
    <>
      <Navbar
        activePage={categoryName}
        search={search}
        setSearch={setSearch}
        setPage={function (val: string): void {
          throw new Error("Function not implemented.");
        }}
        user={user}
        setUser={setUser}
        displayNavLinks={false}
      />
      <div className="flex flex-col">
        <div className="mt-5 mx-5 flex items-center justify-between">
          <div>
            Home / {categoryName} /{" "}
            <span className="font-semibold">{subcategoryName}</span>
          </div>
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
        <div className="flex justify-evenly mt-5">

          {/* Filter options */}
          <div className="h-[80vh] w-[20vw] hidden md:block">
            <div className="border-gray-300 border-1 py-3 pl-6">
              <span className="text-md font-semibold">BRAND</span>
              <ul className="mt-3 text-md ml-3">{allBrandSelectionEl}</ul>
            </div>
            <div className="border-gray-300 border-1 py-3 pl-6">
              <span className="text-lg font-semibold">SIZES</span>
              <select
                name="sizeInput"
                className="block w-[10vw] text-sm border-1 py-1.5 my-3 ml-3 rounded px-2"
                id="sizeInput"
                onChange={(e) => setSize(e.target.value)}
              >
                <option value="">All Sizes</option>
                {allSizesSelectionEl}
              </select>
            </div>
            <div className="border-gray-300 border-1 py-3 pl-6">
              <span className="text-xl font-semibold">PRICE</span>
              <ul className="mt-3 text-md ml-3 flex flex-col gap-5">
                <li className="flex gap-5 items-center">
                  Min:
                  <input
                    type="number"
                    value={
                      isNaN(priceRange.low) || priceRange.low === 0
                        ? ""
                        : priceRange.low
                    }
                    onChange={(e) =>
                      setPriceRange({
                        ...priceRange,
                        low:
                          e.target.value === "" ? 0 : parseInt(e.target.value),
                      })
                    }
                    className="w-[10vw] border border-default-medium text-heading text-sm rounded focus:ring-brand focus:border-brand px-3 py-1.5 shadow-xs placeholder:text-body"
                  />
                </li>
                <li className="flex gap-5 items-center">
                  Max:
                  <input
                    type="number"
                    value={isNaN(priceRange.high) ? "" : priceRange.high}
                    onChange={(e) =>
                      setPriceRange({
                        ...priceRange,
                        high: parseInt(e.target.value),
                      })
                    }
                    className="w-[10vw] border border-default-medium text-heading text-sm rounded focus:ring-brand focus:border-brand px-3 py-1.5 shadow-xs placeholder:text-body"
                  />
                </li>
              </ul>
            </div>
          </div>

          {/* Products */}
          <div className="h-full w-full md:w-[80vw] grid grid-cols-1 md:grid-cols-4 place-items-center gap-x-5 px-10 pt-10 pb-20 border-t-1 border-gray-300 overflow-y-scroll">
            {filteredProducts?.map((product, key) => {
              return (
                <DisplayCard key={product._id} productData={product} />
              );
            })}
          </div>
        </div>

        {/* Sort By Element for mobile */}
        <div
          className={"md:hidden w-full bg-white bottom-[10vh] transition-all duration-300 ease-in-out border-1 border-gray-300 fixed " + (isSortCategoryClicked ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full pointer-events-none")}
        >
          <ul>
            {sortOptions.map((opt, key) => {
              return (
                <li 
                  key={key}
                  className={"w-full h-15 flex items-center justify-center text-lg " + (opt === sortCategory ? "bg-gray-200": "") }
                  onClick={e => {
                    setSortCategory(opt);
                    setIsSortCategoryClicked(false);
                  }}
                >
                  {opt.title}
                </li>
              )
            })}
          </ul>
        </div>

        <div
          className={"md:hidden w-full bg-white bottom-[10vh] transition-all duration-300 ease-in-out border-1 border-gray-300 fixed " + (isFilterClicked ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full pointer-events-none")}
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

          {/* Price Filter */}
          <div className="p-5 border-b-1 border-gray-300">
            <span className="text-lg font-medium">PRICE</span>
            <ul className="mt-3 text-md ml-3 flex flex-col gap-5">
              <li className="flex gap-5 items-center">
                Min:
                <input
                  type="number"
                  value={
                    isNaN(priceRange.low) || priceRange.low === 0
                      ? ""
                      : priceRange.low
                  }
                  onChange={(e) =>
                    setPriceRange({
                      ...priceRange,
                      low:
                        e.target.value === "" ? 0 : parseInt(e.target.value),
                    })
                  }
                  className="w-[50vw] border border-default-medium text-heading text-sm rounded focus:ring-brand focus:border-brand px-3 py-1.5 shadow-xs placeholder:text-body"
                />
              </li>
              <li className="flex gap-5 items-center">
                Max:
                <input
                  type="number"
                  value={isNaN(priceRange.high) ? "" : priceRange.high}
                  onChange={(e) =>
                    setPriceRange({
                      ...priceRange,
                      high: parseInt(e.target.value),
                    })
                  }
                  className="w-[50vw] border border-default-medium text-heading text-sm rounded focus:ring-brand focus:border-brand px-3 py-1.5 shadow-xs placeholder:text-body"
                />
              </li>
            </ul>
          </div>

        </div>

        {/* Filter and Sort options for mobile view */}
        <div className="flex md:hidden w-full bg-white h-[10vh] absolute fixed bottom-0">
          <button 
            className="w-[50vw] border-1 border-gray-300 text-xl flex items-center justify-center gap-3"
            onClick={e => {
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
            onClick={e => {
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
