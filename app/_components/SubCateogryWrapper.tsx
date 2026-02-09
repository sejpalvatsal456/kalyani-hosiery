"use client";

import React, { useEffect, useState } from 'react';


const allBrands = [
  { name: "Levis", stock: 50 },
  { name: "SZN", stock: 28 },
  { name: "Moda Rapido", stock: 20 }
];

const allSizes = [ "3XS", "2XS", "XS", "S", "M", "L", "XL", "2XL", "3XL" ];

export default function SubCateogryWrapper(
  { categoryName, subcategoryName } : {
    categoryName: string;
    subcategoryName: string
  }
) {

  const [brands, setBrands] = useState<string[]>([]);
  const [size, setSize] = useState<string>("");

  const lowPriceRange = 100;
  const highPriceRange = 10000;

  useEffect(() => {
    console.log(brands)
  }, [brands]);

  useEffect(() => {
    console.log(size)
  }, [size]);

  const allBrandSelectionEl = allBrands.map((brand, key) => {
    return (
      <li className='w-full flex gap-5' key={key}>
        <input
          type="checkbox"
          onChange={e => {
            e.target.checked
            ? setBrands([...brands, brand.name])
            : setBrands(brands.filter(brandName => brandName !== brand.name))
          }}
        /> {brand.name} <span className='text-gray-400'>({brand.stock})</span>
      </li>
    )
  });

  const allSizesSelectionEl = allSizes.map((size, key) => {
    return (
      <li className='w-full flex gap-5' key={key}>
        <input
          type="radio"
          name='sizeGroup'
          onChange={e => setSize(size)}
        /> {size}
      </li>
    )
  })

  return (
    <div className='flex flex-col'>
      <div className='mt-5 ml-5'>Home / {categoryName} / <span className='font-semibold'>{subcategoryName}</span></div>
      <div className='flex justify-evenly mt-5'>
        {/* Filter options */}
        <div className='h-[80vh] w-[20vw] pt-3 pl-3'>
          <div>
            <span className='text-xl font-semibold'>BRAND</span>
            <ul className='mt-3 text-md ml-3'>
              {allBrandSelectionEl}
            </ul>
          </div>
          <div className='mt-5'>
            <span className='text-xl font-semibold'>SIZES</span>
            <ul className='mt-3 text-md ml-3'>
              {allSizesSelectionEl}
            </ul>
          </div>
          <div className='mt-5'>
            <span className='text-xl font-semibold'>PRICE</span>
            <ul className='mt-3 text-md ml-3'>
              {allSizesSelectionEl}
            </ul>
          </div>
        </div>
        {/* Products */}
        <div className='bg-blue-500 h-[80vh] w-[80vw]'></div>
      </div>
    </div>
  )
}
