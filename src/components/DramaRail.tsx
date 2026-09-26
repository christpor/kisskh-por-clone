import React, { useRef, useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { DramaItem } from '../types/drama';
import { DramaCard } from './DramaCard';

interface DramaRailProps {
  title: string;
  items: DramaItem[];
  onSelect: (drama: DramaItem) => void;
  onViewAll?: () => void;
}

export const DramaRail: React.FC<DramaRailProps> = ({
  title,
  items,
  onSelect,
  onViewAll,
}) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const handleScroll = () => {
    if (!rowRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
    setShowLeft(scrollLeft > 20);
    setShowRight(scrollLeft + clientWidth < scrollWidth - 20);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!rowRef.current) return;
    const amount = direction === 'left' ? -rowRef.current.clientWidth * 0.75 : rowRef.current.clientWidth * 0.75;
    rowRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  if (!items || items.length === 0) return null;

  return (
    <section className="relative px-4 lg:px-8 py-4 select-none group/rail">
      {/* Section Header */}
      <div className="flex items-center mb-3">
        <button
          onClick={onViewAll}
          className="flex items-center space-x-1.5 text-white hover:text-[#69f0ae] transition-colors focus:outline-none"
        >
          <h2 className="text-lg sm:text-[19px] font-bold tracking-tight">
            {title}
          </h2>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#69f0ae] transition-colors stroke-[2.5]" />
        </button>
      </div>

      {/* Rail Container */}
      <div className="relative">
        {/* Left Arrow Button */}
        {showLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute -left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-14 bg-black/70 hover:bg-black/90 text-white flex items-center justify-center rounded shadow-lg transition-all focus:outline-none"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>
        )}

        {/* Scrollable Track */}
        <div
          ref={rowRef}
          onScroll={handleScroll}
          className="flex space-x-3.5 overflow-x-auto no-scrollbar scroll-smooth py-1"
        >
          {items.map((item) => (
            <DramaCard key={item.id} drama={item} onSelect={onSelect} />
          ))}
        </div>

        {/* Right Arrow Button (matches screenshot 1 right edge button!) */}
        {showRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute -right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-14 bg-black/70 hover:bg-black/90 text-white flex items-center justify-center rounded shadow-lg transition-all focus:outline-none"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 stroke-[2.5]" />
          </button>
        )}
      </div>
    </section>
  );
};
