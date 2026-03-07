import { useRouter } from 'next/navigation';
import React, { FormEvent } from 'react';

export function formatLabel(input: string): string {
  return input
    .split("_")
    .map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(" ");
}

export default function SubcategoryButton(
  { name, categoryName } : {
    name: string;
    categoryName: string;
  }
) {

  const router = useRouter();

  return (
    <div
      onClick={(e:FormEvent) => {
        router.push(`/${categoryName}/${name}`);
      }}
      className='cursor-pointer px-3 py-2 rounded-xl text-center hover:scale-[1.2] transition-all duration-300'
    >
      <img 
        src="https://assets.myntassets.com/w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2020/7/8/89f1bd9d-3a28-456d-888a-beff717a06f81594222908155-Shirts.jpg" 
        alt="img"
        width={75}
        className='bg-gray-100 w-20 h-20 rounded-xl'
      />
      <span className='block mt-2'>{formatLabel(name)}</span>
    </div>
  )
}
