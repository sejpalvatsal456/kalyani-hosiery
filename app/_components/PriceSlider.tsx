"use client";

import { useState } from "react";
import { Range, getTrackBackground } from "react-range";

const MIN = 100;
const MAX = 10100;

export default function PriceRangeSlider({
  priceRange,
  setPriceRange,
}: {
  priceRange: { low: number; high: number };
  setPriceRange: (val: { low: number; high: number }) => void;
}) {
  
  return (
    <div className="w-full max-w-sm pr-5">
      {/* Title */}
      <h1 className="text-xl font-semibold mb-5">PRICE</h1>

      {/* Slider */}
      <Range
        values={[priceRange.low, priceRange.high]}
        step={100}
        min={MIN}
        max={MAX}
        onChange={(vals) => setPriceRange({ low: vals[0], high: vals[1] })}
        renderTrack={({ props, children }) => {
          return (
            <div
              {...props}
              className="h-1 w-full rounded"
              style={{
                background: getTrackBackground({
                  values: [priceRange.low, priceRange.high],
                  colors: ["#ccc", "#ec4899", "#ccc"],
                  min: MIN,
                  max: MAX,
                }),
              }}
            >
              {children}
            </div>
          );
        }}
        renderThumb={({ props }) => {
          const { key, ...rest } = props;

          return (
            <div
              key={key}
              {...rest}
              className="h-4 w-4 bg-white border-2 border-pink-500 rounded-full shadow"
            />
          );
        }}
      />

      {/* Values */}
      <p className="text-sm text-gray-800 mt-3">
        ₹{priceRange.low} - ₹{priceRange.high}+
      </p>
    </div>
  );
}
