"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";


export default function ProductPreviewSlider({
  imageData,
  autoSlide = true,
  interval = 4000,
}: {
  imageData: { id: number, image: string }[];
  autoSlide?: boolean;
  interval?: number;
}) {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? imageData.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === imageData.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (!autoSlide) return;

    const slideInterval = setInterval(() => {
      nextSlide();
    }, interval);

    return () => clearInterval(slideInterval);
  }, [current, autoSlide, interval]);

  return (
    <div className="relative w-[100%] md:w-[100vw] h-[90vh] overflow-hidden rounded-2xl">
      {imageData.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity flex flex-row justify-center duration-700 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={banner.image}
            alt={"image"}
            className="rounded-lg w-[95%]"
          />
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur px-3 py-2 rounded-full text-white z-10"
      >
        <BiLeftArrow />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur px-3 py-2 rounded-full text-white z-10"
      >
        <BiRightArrow />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 w-full flex justify-center gap-2 z-10">
        {imageData.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 w-3 rounded-full cursor-pointer ${
              index === current ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
