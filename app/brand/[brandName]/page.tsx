import BrandSearchWrapper from '@/app/_components/BrandSearchWrapper';
import React from 'react'

export default async function page(
  { params }: { params: Promise<{ brandName:string; }> }
) {

  const { brandName } = await params;

  return (
    <BrandSearchWrapper brandName={brandName} />
  )
}
