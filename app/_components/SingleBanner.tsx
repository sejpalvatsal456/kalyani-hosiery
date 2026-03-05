import Image from 'next/image'
import React from 'react'

export default function SingleBanner(
  { banner }: { banner: string; }
) {
  return (
    <div>
      <img
        src={banner}
        alt="imgAlt"
        className='w-[100vw]'
      />
    </div>
  )
}
