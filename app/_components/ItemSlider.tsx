import React, { useEffect, useState } from "react";

interface ItemSliderProps<T> {
  items: T[];
  itemCountDesktop: number;
  itemCountMobile: number;
  renderItem: (item: T, index: number) => React.ReactNode;
}

export default function ItemSlider<T>({
  items,
  itemCountDesktop,
  itemCountMobile,
  renderItem,
}: ItemSliderProps<T>) {
  const [index, setIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(itemCountDesktop);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setVisibleItems(itemCountMobile);
      else setVisibleItems(itemCountDesktop);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % (items.length - visibleItems + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [items.length, visibleItems]);

  console.log(`flex justify-center items-center min-w-[${(100/itemCountMobile).toFixed(2)}%] md:min-w-[${100/itemCountDesktop}%] md:px-6`);

  return (
    <div className="w-full overflow-hidden md:py-10">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${index * (100 / visibleItems)}%)`,
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="flex justify-center items-center md:px-6 flex-shrink-0"
            style={{
              minWidth: `${100 / visibleItems}%`,
            }}
          >
            {renderItem(item, i)}
          </div>
        ))}
      </div>

      {/* dots */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: items.length - visibleItems + 1 }).map((_, i) => (
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