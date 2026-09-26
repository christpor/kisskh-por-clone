import React, { useState, useEffect } from 'react';
import { Filter, ChevronRight, Loader2 } from 'lucide-react';
import { DramaItem } from '../types/drama';
import { api } from '../services/api';
import { DramaCard } from '../components/DramaCard';

interface ExplorePageProps {
  onSelectDrama: (drama: DramaItem) => void;
  initialCountry?: number;
}

export const ExplorePage: React.FC<ExplorePageProps> = ({
  onSelectDrama,
  initialCountry = 0,
}) => {
  const [country, setCountry] = useState(initialCountry);
  const [type, setType] = useState(0);
  const [status, setStatus] = useState(0);
  const [order, setOrder] = useState(1);
  const [page, setPage] = useState(1);

  const [dramas, setDramas] = useState<DramaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const countries = [
    { id: 0, label: 'All Countries' },
    { id: 2, label: 'South Korea' },
    { id: 1, label: 'China' },
    { id: 3, label: 'Japan' },
    { id: 4, label: 'Taiwan' },
    { id: 5, label: 'Thailand' },
  ];

  const types = [
    { id: 0, label: 'All Types' },
    { id: 1, label: 'Drama' },
    { id: 2, label: 'Movie' },
    { id: 3, label: 'Anime' },
  ];

  const statuses = [
    { id: 0, label: 'All Status' },
    { id: 1, label: 'Ongoing' },
    { id: 2, label: 'Completed' },
  ];

  const orders = [
    { id: 1, label: 'Latest Updated' },
    { id: 2, label: 'Most Viewed' },
    { id: 3, label: 'Top Rating' },
  ];

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setLoading(true);
      try {
        const res = await api.getExplore(page, country, type, status, order);
        if (isMounted) {
          setDramas(res.data || []);
          setTotalCount(res.totalCount || 0);
          setLoading(false);
        }
      } catch (e) {
        console.error('Failed to load explore list', e);
        if (isMounted) setLoading(false);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, [country, type, status, order, page]);

  return (
    <div className="max-w-[1720px] mx-auto px-4 lg:px-8 py-6 min-h-screen">
      <div className="flex items-center space-x-2 text-white text-xl font-bold mb-5 pb-2 border-b border-[#2d2d2d]">
        <Filter className="w-5 h-5 text-[#69f0ae]" />
        <h1>Explore Dramas &amp; Movies</h1>
      </div>

      {/* Filters Filter Panel */}
      <div className="bg-[#212121] border border-[#303030] rounded-lg p-4 mb-6 space-y-4">
        {/* Country Filter */}
        <div>
          <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold block mb-2">
            Country:
          </span>
          <div className="flex flex-wrap gap-2">
            {countries.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setCountry(c.id);
                  setPage(1);
                }}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                  country === c.id
                    ? 'bg-[#69f0ae] text-black font-semibold shadow'
                    : 'bg-[#2b2b2b] text-gray-300 hover:text-white hover:bg-[#383838]'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Type & Status Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2 border-t border-[#2e2e2e]">
          <div>
            <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold block mb-2">
              Type:
            </span>
            <div className="flex flex-wrap gap-2">
              {types.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setType(t.id);
                    setPage(1);
                  }}
                  className={`px-3 py-1 rounded text-xs font-medium ${
                    type === t.id
                      ? 'bg-[#69f0ae] text-black font-semibold'
                      : 'bg-[#2b2b2b] text-gray-300 hover:bg-[#383838]'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold block mb-2">
              Status:
            </span>
            <div className="flex flex-wrap gap-2">
              {statuses.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setStatus(s.id);
                    setPage(1);
                  }}
                  className={`px-3 py-1 rounded text-xs font-medium ${
                    status === s.id
                      ? 'bg-[#69f0ae] text-black font-semibold'
                      : 'bg-[#2b2b2b] text-gray-300 hover:bg-[#383838]'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold block mb-2">
              Sort Order:
            </span>
            <div className="flex flex-wrap gap-2">
              {orders.map((o) => (
                <button
                  key={o.id}
                  onClick={() => {
                    setOrder(o.id);
                    setPage(1);
                  }}
                  className={`px-3 py-1 rounded text-xs font-medium ${
                    order === o.id
                      ? 'bg-[#69f0ae] text-black font-semibold'
                      : 'bg-[#2b2b2b] text-gray-300 hover:bg-[#383838]'
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Results */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-gray-400">
          <Loader2 className="w-8 h-8 text-[#69f0ae] animate-spin mb-3" />
          <p className="text-sm">Fetching catalog...</p>
        </div>
      ) : dramas.length === 0 ? (
        <div className="py-20 text-center text-gray-400 text-sm">
          No dramas match your current filter settings.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5 sm:gap-4">
            {dramas.map((drama) => (
              <DramaCard key={drama.id} drama={drama} onSelect={onSelectDrama} />
            ))}
          </div>

          {/* Simple Pagination Controls */}
          <div className="mt-8 flex justify-center items-center space-x-3">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-[#262626] hover:bg-[#333] text-sm text-white rounded disabled:opacity-40"
            >
              Previous
            </button>
            <span className="text-sm text-gray-400">Page {page}</span>
            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 bg-[#262626] hover:bg-[#333] text-sm text-white rounded"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};
