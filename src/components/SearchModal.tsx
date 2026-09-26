import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, UserCircle, Loader2 } from 'lucide-react';
import { DramaItem } from '../types/drama';
import { api } from '../services/api';
import mockData from '../data/mock-kisskh.json';
import { DramaCard } from './DramaCard';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (drama: DramaItem) => void;
  onOpenAuth: () => void;
  isLoggedIn?: boolean;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  onOpenAuth,
  isLoggedIn = false,
}) => {
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [popularSearches, setPopularSearches] = useState<DramaItem[]>(
    ((mockData as any).mostSearch || []) as DramaItem[]
  );
  const [results, setResults] = useState<DramaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filterPills = ['All', 'TVSeries', 'Movie', 'Anime', 'Hollywood'];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
      api.getMostSearch().then((items) => {
        if (items && items.length > 0) setPopularSearches(items);
      });
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await api.search(query);
        setResults(data);
      } catch (err) {
        console.error('Search error', err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  const displayedItems = query.trim() ? results : popularSearches;

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-50 bg-[#181818] overflow-y-auto no-scrollbar animate-fadeIn select-none"
    >
      {/* 1. Top Navigation Bar Replacement (Matches Screenshot 1) */}
      <div className="bg-[#212121] border-b border-[#303030] px-4 lg:px-8 py-2.5">
        <div className="max-w-[1720px] mx-auto flex items-center justify-between gap-4">
          {/* Left: Brand Logo + Back Chevron */}
          <div className="flex items-center space-x-3 sm:space-x-4 flex-shrink-0">
            <button
              onClick={onClose}
              className="flex items-center focus:outline-none"
              aria-label="KissKH Home"
            >
              <img
                src="/assets/icons/long_icon.svg"
                alt="KISSKH"
                className="h-8 md:h-9 w-auto object-contain"
              />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-300 hover:text-white rounded hover:bg-[#333] transition-colors"
              aria-label="Back"
            >
              <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
            </button>
          </div>

          {/* Middle: Underline Search Input */}
          <div className="flex-1 max-w-4xl relative">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="w-full bg-transparent border-b-2 border-white/80 focus:border-[#69f0ae] text-white text-base sm:text-lg pb-1.5 px-1 placeholder-gray-400 focus:outline-none transition-colors"
            />
            {loading && (
              <Loader2 className="w-5 h-5 text-[#69f0ae] animate-spin absolute right-2 top-1" />
            )}
          </div>

          {/* Right: Sign In Button */}
          <div className="flex-shrink-0">
            <button
              onClick={() => {
                onClose();
                onOpenAuth();
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded text-[13.5px] font-medium text-[#d5d5d5] hover:text-white hover:bg-[#2b2b2b] transition-colors"
            >
              <UserCircle className="w-4 h-4 text-[#bdbdbd]" />
              <span className="hidden sm:inline">{isLoggedIn ? 'Account' : 'Sign in'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Filter Pills Row & Content Container */}
      <div className="max-w-[1720px] mx-auto px-4 lg:px-8 py-5">
        {/* Filter Pills matching Screenshot 1 */}
        <div className="flex items-center space-x-2.5 overflow-x-auto no-scrollbar pb-4">
          {filterPills.map((pill) => {
            const isSelected = selectedFilter === pill;
            return (
              <button
                key={pill}
                onClick={() => setSelectedFilter(pill)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-white text-black shadow-sm'
                    : 'bg-[#2e2e2e] text-gray-300 hover:text-white hover:bg-[#3a3a3a]'
                }`}
              >
                {pill}
              </button>
            );
          })}
        </div>

        {/* Section Heading: "Popular Search" or "Search Results" */}
        <div className="mt-3 mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {query.trim() ? `Search Results for "${query}"` : 'Popular Search'}
          </h2>
        </div>

        {/* 3. 4-Column Responsive Grid matching Screenshot 1 */}
        {displayedItems.length === 0 ? (
          <div className="py-20 text-center text-gray-400 text-sm">
            {loading ? 'Searching...' : `No results found for "${query}"`}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5">
            {displayedItems.map((item) => (
              <div key={item.id} className="w-full">
                <DramaCard
                  drama={item}
                  onSelect={(d) => {
                    onSelect(d);
                    onClose();
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
