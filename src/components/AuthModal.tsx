import React, { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { name: string; email: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        onLoginSuccess({ name: 'KissKH User', email: 'user@kisskh.me' });
        onClose();
        setSuccess(false);
      }, 700);
    }, 800);
  };

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm bg-[#222222] border border-[#383838] rounded-xl shadow-2xl p-6 text-center select-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex justify-center mb-3">
          <img
            src="/assets/icons/long_icon.svg"
            alt="KissKH"
            className="h-10 w-auto"
          />
        </div>

        <h3 className="text-lg font-bold text-white mb-1">Sign in to KissKH</h3>
        <p className="text-xs text-gray-400 mb-6">
          Synchronize watch history, bookmark favorite dramas, and get episode update notifications.
        </p>

        {success ? (
          <div className="py-4 flex flex-col items-center space-y-2 text-[#69f0ae]">
            <CheckCircle2 className="w-10 h-10 animate-bounce" />
            <span className="text-sm font-medium">Successfully Signed In!</span>
          </div>
        ) : (
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center space-x-3 bg-white hover:bg-gray-100 text-gray-800 font-medium py-2.5 px-4 rounded-lg shadow transition-all focus:outline-none disabled:opacity-70"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span className="text-sm">
              {loading ? 'Signing in...' : 'Sign in with Google'}
            </span>
          </button>
        )}

        <div className="mt-6 text-[11px] text-gray-500">
          By signing in, you agree to KissKH's{' '}
          <a href="#" className="underline hover:text-gray-400">Terms</a> and{' '}
          <a href="#" className="underline hover:text-gray-400">Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
};
