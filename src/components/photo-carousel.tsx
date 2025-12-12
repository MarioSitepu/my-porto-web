"use client";

import { ReactNode, useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

interface CarouselProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  autoplayDelay?: number;
}

/**
 * Carousel component displays a carousel of images.
 *
 * @param {ReactNode} children - The children of the Carousel component.
 * @param {string} className - Optional className for the component.
 * @param {string} containerClassName - Optional className for the container.
 * @param {number} autoplayDelay - Optional autoplay delay in milliseconds.
 * @returns {JSX.Element} - The Carousel component.
 */
const Carousel = ({
  children,
  className = "",
  containerClassName = "",
  autoplayDelay = 6000,
}: CarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
    },
    [
      Autoplay({
        delay: autoplayDelay,
        stopOnInteraction: false,
      }),
    ]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className={`overflow-hidden relative ${className}`} ref={emblaRef}>
      <div className={`flex ${containerClassName}`}>{children}</div>

      {/* Enhanced Navigation Buttons with glassmorphism */}
      <div className="hidden lg:flex absolute inset-y-0 left-0 right-0 items-center justify-between px-6 lg:px-8 pointer-events-none z-20">
        <button
          className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center pointer-events-auto text-white rounded-full hover:bg-white/20 hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl"
          aria-label="Previous"
          onClick={() => emblaApi?.scrollPrev()}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center pointer-events-auto text-white rounded-full hover:bg-white/20 hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl"
          aria-label="Next"
          onClick={() => emblaApi?.scrollNext()}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Enhanced Dots with better styling */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5 bg-black/20 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full z-20">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={`rounded-full transition-all duration-300 hover:scale-125 ${
              index === selectedIndex
                ? "w-2.5 h-2.5 bg-white shadow-lg"
                : "w-2 h-2 bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Slide ${index + 1}`}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
