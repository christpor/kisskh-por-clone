import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Server, MessageSquare, Download, AlertCircle } from 'lucide-react';
import { DramaDetail } from '../types/drama';
import { api } from '../services/api';

interface WatchPageProps {
  dramaId: number | string;
  episodeNumber: number;
  onBack: () => void;
  onSelectEpisode: (epNum: number) => void;
}

export const WatchPage: React.FC<WatchPageProps> = ({
  dramaId,
  episodeNumber,
  onBack,
  onSelectEpisode,
}) => {
  const [drama, setDrama] = useState<DramaDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentServer, setCurrentServer] = useState(1);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Array<{ name: string; time: string; text: string }>>([
    { name: 'K-Drama Fan', time: '2 hours ago', text: 'This episode was so intense! Can not wait for the next one.' },
    { name: 'Sophea', time: '1 day ago', text: 'Subtitles are super clear and high quality 1080p. Thank you KissKH!' },
  ]);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      setLoading(true);
      try {
        const d = await api.getDrama(dramaId);
        if (isMounted) {
          setDrama(d);
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to load drama for player', err);
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, [dramaId]);

  const totalEpisodes = drama?.episodes?.length || drama?.episodesCount || 16;
  const hasPrev = episodeNumber > 1;
  const hasNext = episodeNumber < totalEpisodes;

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([
      { name: 'You (Guest)', time: 'Just now', text: newComment.trim() },
      ...comments,
    ]);
    setNewComment('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#181818] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#69f0ae] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#141414] text-white pb-16">
      {/* Top Header Bar */}
      <div className="bg-[#1f1f1f] border-b border-[#2d2d2d] px-4 lg:px-8 py-3 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-sm text-gray-300 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Drama Details</span>
        </button>

        <div className="text-sm font-semibold truncate max-w-md text-center">
          <span className="text-[#69f0ae]">{drama?.title}</span> — Episode {episodeNumber}
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => hasPrev && onSelectEpisode(episodeNumber - 1)}
            disabled={!hasPrev}
            className="p-1.5 rounded bg-[#2c2c2c] hover:bg-[#383838] disabled:opacity-30 disabled:hover:bg-[#2c2c2c]"
            title="Previous Episode"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => hasNext && onSelectEpisode(episodeNumber + 1)}
            disabled={!hasNext}
            className="p-1.5 rounded bg-[#2c2c2c] hover:bg-[#383838] disabled:opacity-30 disabled:hover:bg-[#2c2c2c]"
            title="Next Episode"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 lg:px-8 pt-4">
        {/* Main Grid: Video Player + Episode List */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column: Player (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            {/* Player Shell */}
            <div className="relative aspect-video w-full bg-black rounded-lg overflow-hidden shadow-2xl border border-[#2b2b2b]">
              {currentServer === 1 ? (
                // Official Embed Simulation / High Quality HTML5 Player
                <video
                  key={`${dramaId}-${episodeNumber}`}
                  controls
                  autoPlay
                  playsInline
                  poster={drama?.thumbnail}
                  className="w-full h-full object-contain"
                  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#181818]">
                  <Server className="w-12 h-12 text-[#69f0ae] mb-3 animate-pulse" />
                  <h3 className="text-base font-bold mb-1">External Streaming Mirror ({currentServer === 2 ? 'Alpha' : 'Beta'})</h3>
                  <p className="text-xs text-gray-400 max-w-sm mb-4">
                    Connecting to encrypted HLS stream shards with English subtitles.
                  </p>
                  <button
                    onClick={() => setCurrentServer(1)}
                    className="px-4 py-2 bg-[#69f0ae] text-black font-semibold rounded text-xs hover:bg-[#58e0a0]"
                  >
                    Switch to Primary Video Stream
                  </button>
                </div>
              )}
            </div>

            {/* Server Controls & Actions */}
            <div className="bg-[#1f1f1f] border border-[#2d2d2d] rounded-lg p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center space-x-2">
                <span className="text-gray-400 font-medium">Server:</span>
                {[1, 2, 3].map((srv) => (
                  <button
                    key={srv}
                    onClick={() => setCurrentServer(srv)}
                    className={`px-3 py-1.5 rounded font-semibold transition-all ${
                      currentServer === srv
                        ? 'bg-[#69f0ae] text-black'
                        : 'bg-[#2b2b2b] text-gray-300 hover:text-white'
                    }`}
                  >
                    Server {srv} {srv === 1 ? '(1080p HD)' : ''}
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => alert('Download mirror link generated: 1080p (MP4)')}
                  className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#2a2a2a] hover:bg-[#333] text-gray-200 rounded font-medium"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
                <button
                  onClick={() => alert('Report submitted to KissKH support team.')}
                  className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#2a2a2a] hover:bg-[#333] text-gray-200 rounded font-medium"
                >
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Report Error</span>
                </button>
              </div>
            </div>

            {/* Comments Thread */}
            <div className="bg-[#1f1f1f] border border-[#2d2d2d] rounded-lg p-5 space-y-4">
              <div className="flex items-center space-x-2 pb-2 border-b border-[#2d2d2d]">
                <MessageSquare className="w-4 h-4 text-[#69f0ae]" />
                <h3 className="font-bold text-sm">Discussion &amp; Comments ({comments.length})</h3>
              </div>

              <form onSubmit={handlePostComment} className="flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Leave a comment about this episode..."
                  className="flex-1 bg-[#141414] border border-[#333] rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#69f0ae]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#69f0ae] text-black font-semibold text-xs rounded hover:bg-[#52e59e]"
                >
                  Post
                </button>
              </form>

              <div className="space-y-3 pt-2">
                {comments.map((c, i) => (
                  <div key={i} className="bg-[#181818] p-3 rounded border border-[#262626] text-xs">
                    <div className="flex items-center justify-between text-gray-400 mb-1">
                      <span className="font-semibold text-white">{c.name}</span>
                      <span>{c.time}</span>
                    </div>
                    <p className="text-gray-300">{c.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Episode List (1 Col) */}
          <div className="bg-[#1f1f1f] border border-[#2d2d2d] rounded-lg p-4 h-fit max-h-[750px] flex flex-col">
            <h3 className="text-sm font-bold text-white mb-3 pb-2 border-b border-[#2d2d2d]">
              Episodes ({totalEpisodes})
            </h3>
            <div className="overflow-y-auto space-y-1.5 pr-1 no-scrollbar flex-1">
              {Array.from({ length: totalEpisodes }, (_, i) => i + 1).map((epNum) => {
                const isCurrent = epNum === episodeNumber;
                return (
                  <button
                    key={epNum}
                    onClick={() => onSelectEpisode(epNum)}
                    className={`w-full text-left px-3 py-2.5 rounded text-xs font-medium flex items-center justify-between transition-colors ${
                      isCurrent
                        ? 'bg-[#69f0ae] text-black font-bold'
                        : 'bg-[#181818] hover:bg-[#282828] text-gray-300'
                    }`}
                  >
                    <span>Episode {epNum}</span>
                    <span className="text-[10px] opacity-75">English Sub</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
