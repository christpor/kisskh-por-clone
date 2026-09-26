import React, { useState, useEffect } from 'react';
import { Play, Bookmark, Share2, Calendar, Globe, Film, CheckCircle2, ArrowLeft, ExternalLink } from 'lucide-react';
import { DramaDetail } from '../types/drama';
import { api } from '../services/api';

interface DramaDetailPageProps {
  dramaId: number | string;
  onBack: () => void;
  onWatchEpisode: (dramaId: number | string, epNumber: number) => void;
}

export const DramaDetailPage: React.FC<DramaDetailPageProps> = ({
  dramaId,
  onBack,
  onWatchEpisode,
}) => {
  const [drama, setDrama] = useState<DramaDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadDrama() {
      setLoading(true);
      try {
        const detail = await api.getDrama(dramaId);
        if (isMounted) {
          setDrama(detail);
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to load drama details', err);
        if (isMounted) setLoading(false);
      }
    }
    loadDrama();
    return () => {
      isMounted = false;
    };
  }, [dramaId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#181818] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#69f0ae] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!drama) {
    return (
      <div className="min-h-screen bg-[#181818] text-center py-20 text-gray-400">
        <p>Drama not found.</p>
        <button onClick={onBack} className="mt-4 px-4 py-2 bg-[#2c2c2c] text-white rounded">
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#181818] pb-16">
      {/* Top Backdrop with Gradient */}
      <div className="relative h-[280px] sm:h-[380px] md:h-[460px] w-full overflow-hidden">
        <img
          src={drama.thumbnail}
          alt={drama.title}
          className="w-full h-full object-cover object-center filter blur-[1px] brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/60 to-transparent" />
        <div className="absolute top-4 left-4 lg:left-8 z-10">
          <button
            onClick={onBack}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded bg-black/60 hover:bg-black/80 text-white text-sm backdrop-blur-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        </div>
      </div>

      {/* Main Info Box */}
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 -mt-36 sm:-mt-52 relative z-20">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
          {/* Left Poster */}
          <div className="w-44 sm:w-56 md:w-64 flex-shrink-0 rounded-lg overflow-hidden shadow-2xl border border-[#333333] bg-[#222]">
            <img
              src={drama.thumbnail}
              alt={drama.title}
              className="w-full aspect-[2/3] object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://media.themoviedb.org/t/p/w1000_and_h563_face/l5F7zrjACILbCwYAozRs74q3W18.jpg';
              }}
            />
          </div>

          {/* Right Details */}
          <div className="flex-1 space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
              {drama.title}
            </h1>

            {/* Badges / Metadata Row */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-300">
              <span className="flex items-center space-x-1 bg-[#262626] px-2.5 py-1 rounded">
                <Globe className="w-3.5 h-3.5 text-[#69f0ae]" />
                <span>{drama.country || 'South Korea'}</span>
              </span>
              <span className="flex items-center space-x-1 bg-[#262626] px-2.5 py-1 rounded">
                <Film className="w-3.5 h-3.5 text-[#69f0ae]" />
                <span>{drama.type || 'Drama'}</span>
              </span>
              <span className="flex items-center space-x-1 bg-[#262626] px-2.5 py-1 rounded">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#69f0ae]" />
                <span>{drama.status || 'Completed'}</span>
              </span>
              {drama.releaseDate && (
                <span className="flex items-center space-x-1 bg-[#262626] px-2.5 py-1 rounded">
                  <Calendar className="w-3.5 h-3.5 text-[#69f0ae]" />
                  <span>{drama.releaseDate}</span>
                </span>
              )}
            </div>

            {/* Synopsis */}
            <div className="bg-[#212121] border border-[#2e2e2e] p-4 rounded-lg text-sm text-gray-300 leading-relaxed">
              <h3 className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">
                Synopsis
              </h3>
              <p>{drama.description}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onWatchEpisode(drama.id, 1)}
                className="flex items-center space-x-2 bg-[#69f0ae] hover:bg-[#52e59e] text-black font-bold px-6 py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Watch Episode 1</span>
              </button>

              <a
                href={`https://kisskh.do/Drama/${drama.title.replace(/[^\w\s-]/g, '-').trim().replace(/\s+/g, '-')}?id=${drama.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-[#ff5722] hover:bg-[#e64a19] text-white font-bold px-4 py-2.5 rounded-lg shadow-lg transition-all"
                title="View authentic movie page on kisskh.do"
              >
                <ExternalLink className="w-4 h-4" />
                <span>KissKH Original</span>
              </a>

              <button
                onClick={() => setBookmarked(!bookmarked)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                  bookmarked
                    ? 'border-[#69f0ae] bg-[#69f0ae]/10 text-[#69f0ae]'
                    : 'border-[#383838] bg-[#222222] text-gray-300 hover:text-white'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
                <span>{bookmarked ? 'Bookmarked' : 'Add to Favorite'}</span>
              </button>

              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-lg border border-[#383838] bg-[#222222] text-gray-300 hover:text-white text-sm font-medium transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Episode Grid Section */}
        <div className="mt-12">
          <div className="flex items-center justify-between pb-3 border-b border-[#2b2b2b] mb-4">
            <h2 className="text-xl font-bold text-white">Episodes</h2>
            <span className="text-xs text-gray-400">
              Total: {drama.episodes?.length || drama.episodesCount || 16} Episodes
            </span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5">
            {(
              drama.episodes ||
              Array.from({ length: drama.episodesCount || 16 }, (_, i) => ({
                id: i + 1,
                number: i + 1,
                sub: 1,
              }))
            ).map((ep) => (
              <button
                key={ep.id || ep.number}
                onClick={() => onWatchEpisode(drama.id, ep.number)}
                className="py-3 px-2 bg-[#212121] hover:bg-[#69f0ae] hover:text-black text-white text-center rounded border border-[#2f2f2f] hover:border-[#69f0ae] font-semibold text-sm transition-all shadow-sm focus:outline-none"
              >
                EP {ep.number}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
