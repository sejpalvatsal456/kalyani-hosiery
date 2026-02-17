import { useRouter } from 'next/navigation';
import React, { FormEvent } from 'react'

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
      className='cursor-pointer hover:bg-gray-100 px-3 py-2'
    >{name}</div>
  )
}
