"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

type Banner = {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  cta?: string;
};

interface BannerSliderProps {
  banners: Banner[];
  autoSlide?: boolean;
  interval?: number;
}

export default function BannerSlider({
  banners,
  autoSlide = true,
  interval = 4000,
}: BannerSliderProps) {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (!autoSlide) return;

    const slideInterval = setInterval(() => {
      nextSlide();
    }, interval);

    return () => clearInterval(slideInterval);
  }, [current, autoSlide, interval]);

  return (
    <div className="relative w-[100%] md:w-[80vw] h-[200px] md:h-[400px] overflow-hidden rounded-2xl">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={banner.image}
            alt={banner.title}
            fill
            className="object-cover"
            priority
            unoptimized
          />

          {/* <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center px-6">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              {banner.title}
            </h2>
            <p className="text-lg md:text-xl mb-6">{banner.subtitle}</p>
            {banner.cta && (
              <button className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition">
                {banner.cta}
              </button>
            )}
          </div> */}
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
        {banners.map((_, index) => (
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
