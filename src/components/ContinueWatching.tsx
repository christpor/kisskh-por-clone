import React from 'react';
import { DramaItem } from '../types/drama';

interface ContinueWatchingProps {
  isLoggedIn: boolean;
  history: DramaItem[];
  onOpenAuth: () => void;
  onSelect: (drama: DramaItem) => void;
}

export const ContinueWatching: React.FC<ContinueWatchingProps> = ({
  isLoggedIn,
  history,
  onOpenAuth,
  onSelect,
}) => {
  return (
    <section className="px-4 lg:px-8 py-5 select-none">
      <h2 className="text-white text-lg sm:text-xl font-bold mb-3 tracking-wide">
        Continue watching
      </h2>

      {!isLoggedIn || history.length === 0 ? (
        <div className="py-8 text-center text-[#aaaaaa] text-sm">
          <p>
            <button
              onClick={onOpenAuth}
              className="text-[#cccccc] hover:text-white hover:underline transition-colors focus:outline-none"
            >
              Sign in now to save your watch history.
            </button>
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {history.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelect(item)}
              className="group cursor-pointer bg-[#242424] rounded overflow-hidden hover:ring-2 hover:ring-[#69f0ae] transition-all"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
                  <div className="h-full bg-[#69f0ae] w-2/3" />
                </div>
              </div>
              <div className="p-2">
                <h3 className="text-xs text-white truncate font-medium">{item.title}</h3>
                <span className="text-[11px] text-gray-400">Episode 1</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
