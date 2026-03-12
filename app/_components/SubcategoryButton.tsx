import { ISubcategory } from '@/lib/typeDefinitions';
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
  { subCat, categoryName } : {
    subCat: ISubcategory;
    categoryName: string;
  }
) {

  const router = useRouter();

  return (
    <div
      onClick={(e:FormEvent) => {
        router.push(`/${categoryName}/${subCat.name}`);
      }}
      className='cursor-pointer px-3 py-2 rounded-xl text-center hover:scale-[1.2] transition-all duration-300'
    >
      <img 
        src={subCat.logoLink} 
        alt="img"
        width={75}
        className='bg-gray-100 w-30 h-30 rounded-xl'
      />
      <span className='text-lg block mt-2 w-30 text-center'>{formatLabel(subCat.name)}</span>
    </div>
  )
}
