import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { DramaItem } from '../types/drama';
import { api } from '../services/api';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (drama: DramaItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<DramaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
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
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#222222] border border-[#383838] rounded-lg shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-[#333333] bg-[#282828]">
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Asian dramas, movies, anime..."
            className="w-full bg-transparent text-white placeholder-gray-400 text-base focus:outline-none"
          />
          {loading ? (
            <Loader2 className="w-5 h-5 text-[#69f0ae] animate-spin" />
          ) : query ? (
            <button
              onClick={() => setQuery('')}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-xs uppercase font-medium bg-[#333] px-2 py-1 rounded"
            >
              Esc
            </button>
          )}
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2 no-scrollbar">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-gray-400 text-sm">
              Type drama title or keywords to search (e.g. "Watermelon", "Frost", "Beauty")
            </div>
          ) : results.length === 0 && !loading ? (
            <div className="py-8 text-center text-gray-400 text-sm">
              No results found for "<span className="text-white">{query}</span>"
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {results.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelect(item);
                    onClose();
                  }}
                  className="flex items-center space-x-3 p-2 rounded bg-[#1c1c1c] hover:bg-[#2e2e2e] cursor-pointer transition-colors group"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-16 h-10 object-cover rounded flex-shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://media.themoviedb.org/t/p/w1000_and_h563_face/l5F7zrjACILbCwYAozRs74q3W18.jpg';
                    }}
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm text-white group-hover:text-[#69f0ae] truncate font-medium">
                      {item.title}
                    </h4>
                    {item.episodesCount && (
                      <span className="text-[11px] text-gray-400">
                        {item.episodesCount} Episodes
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
