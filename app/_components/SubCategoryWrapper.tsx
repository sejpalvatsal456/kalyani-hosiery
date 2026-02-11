"use client";

import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import {
  DisplayProductType,
  navLinksDataType,
  ProductDataType,
} from "@/lib/typeDefinitions";
import DisplayCard from "./DisplayCard";

const allBrands = [
  { name: "Levis", stock: 50 },
  { name: "SZN", stock: 28 },
  { name: "Moda Rapido", stock: 20 },
];

const navLinksData: navLinksDataType[] = [
  { name: "Men", tag: "men" },
  { name: "Women", tag: "women" },
  { name: "Kids", tag: "kids" },
];

const allSizes = ["3XS", "2XS", "XS", "S", "M", "L", "XL", "2XL", "3XL"];

const sortOptions = [
  { title: "Recommended", tag: "R" },
  { title: "What's new", tag: "W" },
  { title: "Price: High to Low", tag: "PHL" },
  { title: "Price: Low to High", tag: "PLH" },
];

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

  const [search, setSearch] = useState<string>("");

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

    setFilteredProducts(updated);
  }, [brands, size, priceRange, sortCategory, products]);

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
        <span className="text-sm">{brand.name}</span>{" "}
        <span className="text-gray-400">({brand.stock})</span>
      </li>
    );
  });

  return (
    <>
      <Navbar
        activePage={categoryName}
        navLinksData={navLinksData}
        search={search}
        setSearch={setSearch}
        setPage={function (val: string): void {
          throw new Error("Function not implemented.");
        }}
        cartCount={0}
        displayNavLinks={false}
      />
      <div className="flex flex-col">
        <div className="mt-5 mx-5 flex items-center justify-between">
          <div>
            Home / {categoryName} /{" "}
            <span className="font-semibold">{subcategoryName}</span>
          </div>
          <div>
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
          <div className="h-[80vh] w-[20vw]">
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
                {allSizes.map((size, key) => {
                  return (
                    <option key={key} value={size}>
                      {size}
                    </option>
                  );
                })}
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
          <div className="h-[80vh] w-[80vw] grid grid-cols-3 gap-5 mx-10">
            {filteredProducts?.map((product, key) => {
              return <DisplayCard key={product._id} productData={product} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
