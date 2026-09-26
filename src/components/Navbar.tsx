import React, { useState } from 'react';
import { Home, HelpCircle, MessageSquarePlus, Palette, Compass, Search, UserCircle, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
  onOpenTheme: () => void;
  onOpenAuth: () => void;
  isLoggedIn?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  onOpenSearch,
  onOpenTheme,
  onOpenAuth,
  isLoggedIn = false,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'FAQ', path: '/FAQ', icon: HelpCircle },
    { label: 'Request Drama', path: '/RequestDrama', icon: MessageSquarePlus },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#212121] border-b border-[#303030] text-white select-none">
      <div className="max-w-[1720px] mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <div className="flex items-center space-x-6">
          <button
            onClick={() => onNavigate('/')}
            className="flex items-center focus:outline-none transition-transform hover:scale-105"
            aria-label="KissKH Home"
          >
            <img
              src="/assets/icons/long_icon.svg"
              alt="KISSKH"
              className="h-8 md:h-9 w-auto object-contain"
            />
          </button>
        </div>

        {/* Center / Right: Desktop Navigation Items */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.label}
                onClick={() => onNavigate(item.path)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded text-[13.5px] font-medium transition-colors ${
                  isActive
                    ? 'bg-[#3b3b3b] text-white shadow-sm'
                    : 'text-[#d5d5d5] hover:text-white hover:bg-[#2b2b2b]'
                }`}
              >
                <Icon className="w-4 h-4 text-[#bdbdbd]" />
                <span>{item.label}</span>
              </button>
            );
          })}

          <button
            onClick={onOpenTheme}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded text-[13.5px] font-medium text-[#d5d5d5] hover:text-white hover:bg-[#2b2b2b] transition-colors"
          >
            <Palette className="w-4 h-4 text-[#bdbdbd]" />
            <span>Theme</span>
          </button>

          <button
            onClick={() => onNavigate('/List')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded text-[13.5px] font-medium transition-colors ${
              currentPath === '/List' || currentPath === '/Explore'
                ? 'bg-[#3b3b3b] text-white shadow-sm'
                : 'text-[#d5d5d5] hover:text-white hover:bg-[#2b2b2b]'
            }`}
          >
            <Compass className="w-4 h-4 text-[#bdbdbd]" />
            <span>Explore</span>
          </button>

          <button
            onClick={onOpenSearch}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded text-[13.5px] font-medium text-[#d5d5d5] hover:text-white hover:bg-[#2b2b2b] transition-colors"
          >
            <Search className="w-4 h-4 text-[#bdbdbd]" />
            <span>Search</span>
          </button>

          <button
            onClick={onOpenAuth}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded text-[13.5px] font-medium text-[#d5d5d5] hover:text-white hover:bg-[#2b2b2b] transition-colors ml-1"
          >
            <UserCircle className="w-4 h-4 text-[#bdbdbd]" />
            <span>{isLoggedIn ? 'Account' : 'Sign in'}</span>
          </button>
        </nav>

        {/* Mobile menu hamburger */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            onClick={onOpenSearch}
            className="p-2 text-[#d5d5d5] hover:text-white hover:bg-[#2b2b2b] rounded"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#d5d5d5] hover:text-white hover:bg-[#2b2b2b] rounded focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Sheet */}
      {mobileMenuOpen && (
        <div
          data-lenis-prevent
          className="md:hidden bg-[#242424] border-b border-[#383838] px-4 py-3 space-y-1 overscroll-contain animate-fadeIn"
        >
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.label}
                onClick={() => {
                  onNavigate(item.path);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded text-sm font-medium ${
                  isActive ? 'bg-[#383838] text-white' : 'text-gray-300 hover:bg-[#2c2c2c]'
                }`}
              >
                <Icon className="w-4 h-4 text-[#69f0ae]" />
                <span>{item.label}</span>
              </button>
            );
          })}

          <button
            onClick={() => {
              onNavigate('/List');
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded text-sm font-medium text-gray-300 hover:bg-[#2c2c2c]"
          >
            <Compass className="w-4 h-4 text-[#69f0ae]" />
            <span>Explore</span>
          </button>

          <button
            onClick={() => {
              onOpenTheme();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded text-sm font-medium text-gray-300 hover:bg-[#2c2c2c]"
          >
            <Palette className="w-4 h-4 text-[#69f0ae]" />
            <span>Theme</span>
          </button>

          <button
            onClick={() => {
              onOpenAuth();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded text-sm font-medium text-gray-300 hover:bg-[#2c2c2c]"
          >
            <UserCircle className="w-4 h-4 text-[#69f0ae]" />
            <span>{isLoggedIn ? 'Account' : 'Sign in'}</span>
          </button>
        </div>
      )}
    </header>
  );
};
