import { ISubcategory } from '@/lib/typeDefinitions'
import React, { useEffect, useState } from 'react'
import SubcategoryButton from './SubcategoryButton';

export default function SubcategorySlider(
  { subCats }: { subCats: ISubcategory[] }
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
        setIndex((prev) => (prev + 1) % (subCats.length - visibleItems + 1));
      }, 3000);
  
      return () => clearInterval(interval);
    }, [subCats.length, visibleItems]);
  
    return (
      <div className="w-full overflow-hidden py-10">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${index * (100 / visibleItems)}%)`,
          }}
        >
          {subCats.map((subCat, i) => (
            <div
              key={i}
              className="flex justify-center items-center min-w-[33.33%] md:min-w-[20%] px-6"
            >
              <SubcategoryButton subCat={subCat} categoryName='men' />
            </div>
          ))}
        </div>
  
        {/* dots */}
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: subCats.length - visibleItems + 1 }).map((_, i) => (
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
