"use client";

import { useEffect, useState } from "react";

interface ResponsiveSliderProps {
  items: React.ReactNode[];
  interval?: number;
}

export default function ResponsiveSlider({
  items,
  interval = 3000,
}: ResponsiveSliderProps) {
  const [visibleItems, setVisibleItems] = useState(5);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(3); // Mobile
      } else {
        setVisibleItems(5); // Desktop
      }
    };

    handleResize(); // Run on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = Math.ceil(items.length / visibleItems);

  // Auto Slide
  useEffect(() => {
    const slider = setInterval(() => {
      setCurrentSlide((prev) =>
        prev + 1 >= totalSlides ? 0 : prev + 1
      );
    }, interval);

    return () => clearInterval(slider);
  }, [totalSlides, interval]);

  const translatePercentage = currentSlide * 100;

  return (
    <div className="w-full">
      {/* Slider */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${translatePercentage}%)`,
            width: `${(items.length / visibleItems) * 90}%`,
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className={`flex-shrink-0 p-2 ${
                visibleItems === 5 ? "w-1/5" : "w-1/3"
              }`}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "bg-black scale-110"
                : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}