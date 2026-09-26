import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DramaItem } from '../types/drama';

interface HeroCarouselProps {
  slides: DramaItem[];
  onSelect: (drama: DramaItem) => void;
  onOpenSearch?: () => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ slides, onSelect, onOpenSearch }) => {
  // Find index of Between Steps (2026) if present to match screenshot default
  const defaultIdx = slides.findIndex((s) => s.title.toLowerCase().includes('between steps'));
  const [currentIndex, setCurrentIndex] = useState(defaultIdx >= 0 ? defaultIdx : 0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (!slides || slides.length === 0) {
    return (
      <div className="w-full aspect-[21/9] sm:aspect-[16/7] md:aspect-[16/6] bg-[#222222] animate-pulse" />
    );
  }

  const currentSlide = slides[currentIndex] || slides[0];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <div
      onClick={() => onSelect(currentSlide)}
      className="relative w-full aspect-[16/9] sm:aspect-[16/7] md:aspect-[16/6] lg:aspect-[16/5.8] bg-[#1a1a1a] cursor-pointer overflow-hidden group select-none"
    >
      {/* Background Image with subtle gradient darkening */}
      <img
        key={currentSlide.id}
        src={currentSlide.thumbnail}
        alt={currentSlide.title}
        className="w-full h-full object-cover object-center transition-all duration-700 ease-out transform group-hover:scale-105"
        loading="eager"
      />

      {/* Subtle vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

      {/* Top-Left Banner Title Tag */}
      <div className="absolute top-3 left-3 sm:top-5 sm:left-6 z-10">
        <span className="bg-black/60 backdrop-blur-sm text-white text-xs sm:text-sm md:text-base font-medium px-3 py-1.5 rounded shadow">
          {currentSlide.title}
        </span>
      </div>

      {/* Top-Right Floating Search Pill matching Screenshot 0 */}
      {onOpenSearch && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenSearch();
          }}
          className="absolute top-3 right-3 sm:top-5 sm:right-6 z-10 bg-black/60 hover:bg-black/80 backdrop-blur-sm text-gray-200 hover:text-white text-xs sm:text-sm font-medium px-3.5 py-1.5 rounded shadow transition-all focus:outline-none"
        >
          Search
        </button>
      )}

      {/* Left Chevron (Green #69f0ae) */}
      <button
        onClick={handlePrev}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-black/40 text-[#69f0ae] transition-colors focus:outline-none"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 stroke-[2.5]" />
      </button>

      {/* Right Chevron (Green #69f0ae) */}
      <button
        onClick={handleNext}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-black/40 text-[#69f0ae] transition-colors focus:outline-none"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 stroke-[2.5]" />
      </button>

      {/* Bottom Center Dots Indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2">
        {slides.map((slide, idx) => (
          <button
            key={slide.id || idx}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(idx);
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentIndex ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
