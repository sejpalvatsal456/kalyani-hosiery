"use client";

import React, { useState } from 'react'

export default function ProductDesc(
  { productData } : {
    productData: {
      title: string,
      subtitle: string,
      price: number,
      mrp: number,
      colors: string[]
    }
  }
) {

  const [selectedColor, setSelectedColor] = useState<number>(0);

  return (
    <div className='w-[45vw] h-full'>
        <div className='flex justify-between'>
          <h1 className='text-2xl font-medium'>{productData.title}</h1>
          <h1 className='text-2xl font-medium'>Rs. {productData.price}</h1>
        </div>

        <div className='flex flex-col gap-4'>
          <h1 className='text-lg mt-5 font-semibold'>Colors</h1>
          <div className='flex gap-10 mx-5'>
            {productData.colors.map((color:string, key) => {
              return (
                <button
                  key={key}
                  onClick={() => setSelectedColor(key)}
                  style={{
                    boxShadow: selectedColor == key
                      ? `0 0 0 2px #${color}`
                      : "none",
                  }}
                  className={"flex items-center justify-center w-11 h-11 rounded-full "}
                >
                  <span className='w-10 h-10 rounded-full' style={{ backgroundColor: `#${color}` }}></span>
                </button>
              )
            })}
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <h1 className='text-lg mt-5 font-semibold'>Descriptions</h1>
          <h2 className='mx-5 text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, tempora!</h2>
        </div>
      </div>
  )
}
