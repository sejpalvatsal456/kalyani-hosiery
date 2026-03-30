import React from 'react'

export default async function ProductPrage(
  { params }: { params: Promise<{ slug: string; }> }
) {

  const { slug } = await params;

  return (
    <div>
      Product Slug: { slug } 
    </div>
  )
}
