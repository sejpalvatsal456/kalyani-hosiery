"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from "react-icons/fa";

export interface ReelItem {
  id: string;
  videoUrl: string;
}

interface ReelsSliderProps {
  reels: ReelItem[];
}

export default function ReelsSlider({ reels }: ReelsSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(5);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const [gap, setGap] = useState(250); // default desktop

  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const startX = useRef(0);
  const endX = useRef(0);
  const isInteracting = useRef(false);

  // 📱 Responsive
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(3);
        setGap(180); // mobile gap
      } else {
        setVisibleCount(5);
        setGap(250); // desktop gap
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 👁️ Play only when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.6 },
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  // 🎬 Control playback
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;

      if (i === activeIndex && isPlaying && isInView) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }

      video.muted = isMuted;
    });
  }, [activeIndex, isMuted, isPlaying, isInView]);

  // 🔁 Circular items
  const getVisibleItems = () => {
    const half = Math.floor(visibleCount / 2);

    return Array.from({ length: visibleCount }, (_, i) => {
      const index = (activeIndex - half + i + reels.length) % reels.length;

      return {
        reel: reels[index],
        position: i - half,
        actualIndex: index,
      };
    });
  };

  // 🎨 Style logic
  const getStyle = (position: number) => {
    const isCenter = position === 0;

    return {
      transform: `
        translateX(${position * gap}px)
        scale(${isCenter ? 1 : 0.75})
      `,
      zIndex: isCenter ? 10 : 5,
      opacity: Math.abs(position) > 2 ? 0 : 1,
      transition: "all 0.5s ease",
    };
  };

  // ▶️ Next reel
  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % reels.length);
  };

  const handleStart = (x: number) => {
    if (isInteracting.current) return;
    startX.current = x;
  };

  const handleMove = (x: number) => {
    endX.current = x;
  };

  const handleEnd = () => {
    if (isInteracting.current) {
      isInteracting.current = false;
      return;
    }

    const distance = startX.current - endX.current;
    const threshold = 50;

    if (distance > threshold) {
      setActiveIndex((prev) => (prev + 1) % reels.length);
    } else if (distance < -threshold) {
      setActiveIndex((prev) => (prev - 1 + reels.length) % reels.length);
    }

    startX.current = 0;
    endX.current = 0;
  };

  return (
    <div
      ref={containerRef}
      className="w-full py-4 overflow-hidden flex justify-center"
    >
      <div
        className="relative flex items-center justify-center h-[450px] w-full max-w-7xl overflow-hidden"
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        onTouchEnd={handleEnd}
        // 🖱️ Mouse Events (for desktop drag)
        onMouseDown={(e) => handleStart(e.clientX)}
        onMouseMove={(e) => {
          if (startX.current !== 0) handleMove(e.clientX);
        }}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
      >
        {getVisibleItems().map(({ reel, position, actualIndex }) => {
          const isCenter = position === 0;

          return (
            <div
              key={reel.id}
              onClick={() => setActiveIndex(actualIndex)}
              className="absolute cursor-pointer"
              style={getStyle(position)}
            >
              <div
                className={`rounded-2xl overflow-hidden bg-black shadow-lg w-[240px] h-[420px] ${
                  isCenter ? "" : "opacity-70s"
                }`}
              >
                <video
                  ref={(el) => {
                    videoRefs.current[actualIndex] = el;
                  }}
                  src={reel.videoUrl}
                  className="w-full h-full object-cover"
                  playsInline
                  muted={isMuted}
                  onEnded={isCenter ? goToNext : undefined}
                />

                {isCenter && (
                  <>
                    {/* ▶️ Play / Pause - Top Left */}
                    <button
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        isInteracting.current = true;
                      }}
                      onTouchStart={(e) => {
                        e.stopPropagation();
                        isInteracting.current = true;
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsPlaying((prev) => !prev);
                      }}
                      className="absolute top-3 left-3 bg-black/50 backdrop-blur-md text-white p-2 rounded-full"
                    >
                      {isPlaying ? <FaPause size={14} /> : <FaPlay size={14} />}
                    </button>

                    {/* 🔊 Mute / Unmute - Bottom Right */}
                    <button
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        isInteracting.current = true;
                      }}
                      onTouchStart={(e) => {
                        e.stopPropagation();
                        isInteracting.current = true;
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsMuted((prev) => !prev);
                      }}
                      className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-md text-white p-2 rounded-full"
                    >
                      {isMuted ? (
                        <FaVolumeMute size={14} />
                      ) : (
                        <FaVolumeUp size={14} />
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
