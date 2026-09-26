import React from 'react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="mt-16 border-t border-[#2b2b2b] bg-[#1d1d1d] py-10 px-4 lg:px-8 text-center text-xs text-gray-400 select-none">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex justify-center mb-3">
          <img
            src="/assets/icons/long_icon.svg"
            alt="KissKH"
            className="h-8 w-auto opacity-80"
          />
        </div>

        <p className="max-w-2xl mx-auto leading-relaxed text-[#999999]">
          Disclaimer: kisskh does not store any files on our server. We only link to media hosted on 3rd party services. All other trademarks, logos, and images are the property of their respective owners.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 text-[#cccccc] font-medium pt-2">
          <button onClick={() => onNavigate('/')} className="hover:text-[#69f0ae] transition-colors">
            Home
          </button>
          <span>•</span>
          <button onClick={() => onNavigate('/List')} className="hover:text-[#69f0ae] transition-colors">
            Explore
          </button>
          <span>•</span>
          <button onClick={() => onNavigate('/FAQ')} className="hover:text-[#69f0ae] transition-colors">
            FAQ
          </button>
          <span>•</span>
          <button onClick={() => onNavigate('/RequestDrama')} className="hover:text-[#69f0ae] transition-colors">
            Request Drama
          </button>
          <span>•</span>
          <a href="#" className="hover:text-[#69f0ae] transition-colors">
            Privacy Policy
          </a>
          <span>•</span>
          <a href="#" className="hover:text-[#69f0ae] transition-colors">
            Terms &amp; Conditions
          </a>
        </div>

        <p className="text-[#777777] pt-2">
          &copy; {new Date().getFullYear()} kisskh. Asian Dramas &amp; Movies.
        </p>
      </div>
    </footer>
  );
};
