import React from 'react';
import { X, Check } from 'lucide-react';

interface ThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: string;
  onSelectTheme: (theme: string) => void;
}

export const ThemeModal: React.FC<ThemeModalProps> = ({
  isOpen,
  onClose,
  currentTheme,
  onSelectTheme,
}) => {
  if (!isOpen) return null;

  const themes = [
    { id: 'dark-green', name: 'Purple & Green (Official KissKH)', primary: '#212121', accent: '#69f0ae' },
    { id: 'amoled', name: 'AMOLED Pure Black', primary: '#0a0a0a', accent: '#69f0ae' },
    { id: 'dark-blue', name: 'Midnight Slate', primary: '#151b26', accent: '#38bdf8' },
    { id: 'classic-dark', name: 'Classic Dark Grey', primary: '#2d3748', accent: '#f59e0b' },
  ];

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#222222] border border-[#383838] rounded-lg shadow-2xl p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#333333]">
          <h3 className="text-lg font-bold text-white">Select Theme</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-2.5">
          {themes.map((t) => {
            const isSelected = currentTheme === t.id;
            return (
              <button
                key={t.id}
                onClick={() => {
                  onSelectTheme(t.id);
                  onClose();
                }}
                className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                  isSelected
                    ? 'border-[#69f0ae] bg-[#2b2b2b]'
                    : 'border-[#333333] bg-[#1a1a1a] hover:bg-[#252525]'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="w-6 h-6 rounded-full border border-gray-600 flex items-center justify-center"
                    style={{ backgroundColor: t.primary }}
                  >
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: t.accent }} />
                  </div>
                  <span className="text-sm font-medium text-white">{t.name}</span>
                </div>
                {isSelected && <Check className="w-4 h-4 text-[#69f0ae]" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
