"use client"

import { ISubcategory } from "@/lib/typeDefinitions"
import Image from "next/image"

export default function CategorySlider(
  { subCats }: { subCats: ISubcategory[] }
) {
  return (
    <div className="w-full overflow-x-auto mb-4">
      <div className="grid grid-rows-2 grid-flow-col gap-3 w-max px-4 py-3">
        {subCats.map((cat, index) => (
          <div
            key={index}
            className="w-20 h-[90px] rounded-xl p-2 bg-gradient-to-b from-[#f7ecd8] to-[#edd5e5] flex flex-col justify-between"
          >
            <p className="text-xs font-medium text-gray-700">
              {cat.name} <span>›</span>
            </p>

            <div className="flex justify-center items-end h-full">
              <Image
                src={cat.logoLink}
                alt={cat.name}
                width={55}
                height={55}
                className="object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}