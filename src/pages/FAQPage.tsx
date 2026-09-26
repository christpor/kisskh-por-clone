import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const faqs = [
    {
      q: 'Why is the video loading slow or buffering?',
      a: 'Video streaming speeds depend on your local network connection and the traffic on our third-party media mirrors. If you experience buffering, try switching between Server 1, Server 2, or Server 3 using the server toggle above the player, or lower your playback resolution.',
    },
    {
      q: 'How can I request a missing drama, movie, or anime?',
      a: 'You can submit a request directly through our "Request Drama" page in the top menu. Please provide the accurate title and release year or a link to MyDramaList/IMDb to help our team index it faster.',
    },
    {
      q: 'Are the subtitles available in English and other languages?',
      a: 'All our drama episodes are released with high-quality English hardcoded or soft subtitles. Popular ongoing dramas are updated with subtitles within a few hours of their original Asian broadcast.',
    },
    {
      q: 'Can I download dramas for offline viewing?',
      a: 'Yes, each episode player includes a direct Download link under the server selection buttons. Simply click Download to save the MP4 video file to your local device.',
    },
    {
      q: 'How do I synchronize my watch history across devices?',
      a: 'Click "Sign in" on the top right navigation bar and sign in using your Google account. Your watch progress and bookmarked favorites will automatically sync across all your phones, tablets, and computers.',
    },
    {
      q: 'What should I do if an episode has no sound or video is black?',
      a: 'Try switching to a different server mirror or disable aggressive ad-blocking extensions that may block media CDN chunks. You can also click the "Report Error" button to notify our indexing bot.',
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-8 py-10 min-h-screen">
      <div className="flex items-center space-x-3 pb-4 border-b border-[#2d2d2d] mb-6">
        <HelpCircle className="w-6 h-6 text-[#69f0ae]" />
        <h1 className="text-2xl font-bold text-white">Frequently Asked Questions (FAQ)</h1>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-[#212121] border border-[#303030] rounded-lg overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full text-left px-5 py-4 flex items-center justify-between font-medium text-white hover:text-[#69f0ae] transition-colors focus:outline-none"
              >
                <span>{faq.q}</span>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-[#69f0ae] flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              {isOpen && (
                <div className="px-5 pb-4 pt-1 text-sm text-gray-300 leading-relaxed border-t border-[#2a2a2a] bg-[#1d1d1d]">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
