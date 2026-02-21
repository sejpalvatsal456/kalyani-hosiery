import React from 'react';
import CartItem from './CartItem';

export default function Cart() {
  return (
    <div className='flex h-full items-center justify-center'>
      <div className="w-[90%] h-[90%] py-5 px-10 border-1 border-gray-300 shadow-lg overflow-y-scroll">
        <h1 className="text-xl font-semibold">Cart</h1>
        <div className='flex flex-col gap-10 mt-10'>
          {/* Card for product */}
          <CartItem
            image="https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/12027436/2022/9/15/ea90445c-a37b-43ac-948b-8e291ec78dc31663221311972LevisMenWhiteSolidRoundNeckLoungeT-shirt1.jpg"
            brand="MARMIC FAB"
            title="Men Slim Fit Formal Shirt"
            seller="MARMIC FAB"
            size="40"
            quantity={2}
            price={596}
            originalPrice={2598}
          />
          <CartItem
            image="https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/12027436/2022/9/15/ea90445c-a37b-43ac-948b-8e291ec78dc31663221311972LevisMenWhiteSolidRoundNeckLoungeT-shirt1.jpg"
            brand="MARMIC FAB"
            title="Men Slim Fit Formal Shirt"
            seller="MARMIC FAB"
            size="40"
            quantity={2}
            price={596}
            originalPrice={2598}
          />
          <CartItem
            image="https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/12027436/2022/9/15/ea90445c-a37b-43ac-948b-8e291ec78dc31663221311972LevisMenWhiteSolidRoundNeckLoungeT-shirt1.jpg"
            brand="MARMIC FAB"
            title="Men Slim Fit Formal Shirt"
            seller="MARMIC FAB"
            size="40"
            quantity={2}
            price={596}
            originalPrice={2598}
          />
        </div>
      </div>
    </div>
  )
}
