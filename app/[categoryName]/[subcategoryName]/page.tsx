import SubCateogryWrapper from '@/app/_components/SubCateogryWrapper';
import React from 'react'

export default async function page(
  { params } : { params: Promise<{ categoryName: string, subcategoryName: string }> }
) {

  const { categoryName, subcategoryName } = await params;

  return (
    <div>
      <SubCateogryWrapper categoryName={categoryName} subcategoryName={subcategoryName} />
    </div>
  )
}
