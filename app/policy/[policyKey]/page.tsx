import React from 'react'

export default async function page(
  { params }: { params: Promise<{ policyKey: string; }> }
) {

  const { policyKey } = await params;

  return (
    <div>
      { policyKey }
    </div>
  )
}
