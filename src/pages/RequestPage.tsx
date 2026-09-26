import React, { useState } from 'react';
import { MessageSquarePlus, CheckCircle2, Send } from 'lucide-react';

export const RequestPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [country, setCountry] = useState('South Korea');
  const [link, setLink] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-8 py-10 min-h-screen">
      <div className="flex items-center space-x-3 pb-4 border-b border-[#2d2d2d] mb-6">
        <MessageSquarePlus className="w-6 h-6 text-[#69f0ae]" />
        <h1 className="text-2xl font-bold text-white">Request a Drama or Movie</h1>
      </div>

      <div className="bg-[#212121] border border-[#303030] rounded-xl p-6 sm:p-8 shadow-xl">
        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-[#69f0ae] mx-auto animate-bounce" />
            <h2 className="text-xl font-bold text-white">Request Received!</h2>
            <p className="text-sm text-gray-300 max-w-md mx-auto">
              Thank you for submitting "<span className="text-[#69f0ae] font-semibold">{title}</span>". Our indexing team will review and upload it if available with English subtitles.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setTitle('');
                setYear('');
                setLink('');
                setNotes('');
              }}
              className="mt-4 px-6 py-2.5 bg-[#2c2c2c] hover:bg-[#383838] text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Submit Another Request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Drama / Movie Title <span className="text-[#ff5722]">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. When the Phone Rings, Queen of Tears, Between Steps"
                className="w-full bg-[#181818] border border-[#333333] rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#69f0ae] text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Release Year
                </label>
                <input
                  type="text"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="e.g. 2026"
                  className="w-full bg-[#181818] border border-[#333333] rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#69f0ae] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Country of Origin
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full bg-[#181818] border border-[#333333] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#69f0ae] text-sm"
                >
                  <option value="South Korea">South Korea (K-Drama)</option>
                  <option value="China">China (C-Drama)</option>
                  <option value="Japan">Japan (J-Drama)</option>
                  <option value="Taiwan">Taiwan</option>
                  <option value="Thailand">Thailand</option>
                  <option value="Anime">Anime</option>
                  <option value="Hollywood">Hollywood / Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Reference Link (MyDramaList / IMDb / AsianWiki)
              </label>
              <input
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://mydramalist.com/..."
                className="w-full bg-[#181818] border border-[#333333] rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#69f0ae] text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Additional Notes
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Mention specific subtitle languages, episodes needed, or season details..."
                className="w-full bg-[#181818] border border-[#333333] rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#69f0ae] text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-2 bg-[#69f0ae] hover:bg-[#52e59e] text-black font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all text-sm"
            >
              <Send className="w-4 h-4" />
              <span>Submit Request</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
