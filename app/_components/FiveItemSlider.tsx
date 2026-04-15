import { IBrand } from '@/lib/typeDefinitions'
import React, { useEffect, useState } from 'react'

export default function FiveItemSlider(
  { brands }: { brands: IBrand[] }
) {
  const [index, setIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setVisibleItems(3);
      else setVisibleItems(5);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % (brands.length - visibleItems + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [brands.length, visibleItems]);

  return (
    <div className="w-full overflow-hidden md:py-10">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${index * (100 / visibleItems)}%)`,
        }}
      >
        {brands.map((brand, i) => (
          <div
            key={i}
            className="flex justify-center items-center min-w-[33.33%] md:min-w-[20%] px-6"
          >
            <img
              src={brand.brandLogo}
              alt={brand.brandName}
              className="w-20 h-20 object-contain transition shadow-xl"
            />
          </div>
        ))}
      </div>

      {/* dots */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: brands.length - visibleItems + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full ${
              index === i ? "bg-black" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
