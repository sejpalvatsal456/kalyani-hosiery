import ProductOverview from '@/app/_components/ProductOverview';
import React from 'react'

export default async function ProductPrage(
  { params }: { params: Promise<{ slug: string; }> }
) {

  const { slug } = await params;

  return (
    <div>
      <ProductOverview slug={slug}  />
    </div>
  )
}
