import React from 'react';
import { DramaItem } from '../types/drama';

interface DramaCardProps {
  drama: DramaItem;
  onSelect: (drama: DramaItem) => void;
}

export const DramaCard: React.FC<DramaCardProps> = ({ drama, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(drama)}
      className="group cursor-pointer flex-shrink-0 w-[190px] sm:w-[220px] md:w-[250px] lg:w-[275px] select-none"
    >
      {/* 16:9 Thumbnail Container */}
      <div className="relative aspect-video w-full rounded-md overflow-hidden bg-[#242424] shadow-md border border-[#2b2b2b] group-hover:border-[#444] transition-all duration-300">
        <img
          src={drama.thumbnail}
          alt={drama.title}
          loading="lazy"
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            // Fallback placeholder if TMDB or serveproxy rate limits
            (e.target as HTMLImageElement).src =
              'https://media.themoviedb.org/t/p/w1000_and_h563_face/l5F7zrjACILbCwYAozRs74q3W18.jpg';
          }}
        />

        {/* Gradient shadow at bottom of image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

        {/* Bottom Left Badge (e.g. "Unlock All Ep", "Remake Sub") */}
        {drama.label && drama.label.trim() !== '' && (
          <span className="absolute bottom-1.5 left-2 bg-black/70 backdrop-blur-xs text-[11px] text-[#e0e0e0] px-1.5 py-0.5 rounded font-normal">
            {drama.label}
          </span>
        )}

        {/* Bottom Right Episode Pill (e.g. "EP 12", "EP 16") */}
        {drama.episodesCount !== undefined && drama.episodesCount > 0 && (
          <span className="absolute bottom-1.5 right-2 bg-black/70 backdrop-blur-xs text-[11px] text-[#e0e0e0] px-1.5 py-0.5 rounded font-medium">
            EP {drama.episodesCount}
          </span>
        )}
      </div>

      {/* Title below card */}
      <div className="mt-2 px-0.5">
        <h3
          title={drama.title}
          className="text-white text-[13.5px] font-normal leading-snug truncate group-hover:text-[#69f0ae] transition-colors"
        >
          {drama.title}
        </h3>
      </div>
    </div>
  );
};
