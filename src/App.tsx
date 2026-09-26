import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { DramaItem } from './types/drama';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { ThemeModal } from './components/ThemeModal';
import { AuthModal } from './components/AuthModal';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { DramaDetailPage } from './pages/DramaDetailPage';
import { WatchPage } from './pages/WatchPage';
import { FAQPage } from './pages/FAQPage';
import { RequestPage } from './pages/RequestPage';

export function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');
  const [activeDramaId, setActiveDramaId] = useState<number | string | null>(null);
  const [activeEpisodeNum, setActiveEpisodeNum] = useState<number>(1);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('dark-green');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [history, setHistory] = useState<DramaItem[]>([]);

  // Initialize Lenis Kinetic Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Sync route on popstate
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname || '/';
      setCurrentPath(path);
      parsePath(path);
    };

    window.addEventListener('popstate', handlePopState);
    parsePath(window.location.pathname || '/');

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const parsePath = (path: string) => {
    const watchMatch = path.match(/^\/Watch\/([^\/]+)\/([^\/]+)/);
    if (watchMatch) {
      setActiveDramaId(watchMatch[1]);
      setActiveEpisodeNum(parseInt(watchMatch[2], 10) || 1);
      return;
    }

    const dramaMatch = path.match(/^\/Drama\/([^\/]+)/);
    if (dramaMatch) {
      setActiveDramaId(dramaMatch[1]);
      return;
    }
  };

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    parsePath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDrama = (drama: DramaItem) => {
    navigate(`/Drama/${drama.id}`);
  };

  const handleWatchEpisode = (dramaId: number | string, epNumber: number) => {
    navigate(`/Watch/${dramaId}/${epNumber}`);
    // Save to continue watching history
    setHistory((prev) => {
      const exists = prev.some((d) => String(d.id) === String(dramaId));
      if (exists) return prev;
      return [
        {
          id: Number(dramaId),
          title: `Drama #${dramaId}`,
          thumbnail: 'https://media.themoviedb.org/t/p/w1000_and_h563_face/l5F7zrjACILbCwYAozRs74q3W18.jpg',
          episodesCount: 16,
        },
        ...prev,
      ];
    });
  };

  const handleLoginSuccess = (user: { name: string; email: string }) => {
    setIsLoggedIn(true);
    // Add default initial history if empty
    if (history.length === 0) {
      setHistory([
        {
          id: 11923,
          title: 'Perfect Crown',
          thumbnail: 'https://media.themoviedb.org/t/p/w1000_and_h563_face/l5F7zrjACILbCwYAozRs74q3W18.jpg',
          episodesCount: 12,
        },
      ]);
    }
  };

  const renderCurrentView = () => {
    if (currentPath.startsWith('/Watch/')) {
      return (
        <WatchPage
          dramaId={activeDramaId || 11923}
          episodeNumber={activeEpisodeNum}
          onBack={() => navigate(`/Drama/${activeDramaId || 11923}`)}
          onSelectEpisode={(ep) => navigate(`/Watch/${activeDramaId || 11923}/${ep}`)}
        />
      );
    }

    if (currentPath.startsWith('/Drama/')) {
      return (
        <DramaDetailPage
          dramaId={activeDramaId || 11923}
          onBack={() => navigate('/')}
          onWatchEpisode={handleWatchEpisode}
        />
      );
    }

    if (currentPath === '/List' || currentPath === '/Explore') {
      const urlParams = new URLSearchParams(window.location.search);
      const c = parseInt(urlParams.get('country') || '0', 10);
      return <ExplorePage onSelectDrama={handleSelectDrama} initialCountry={c} />;
    }

    if (currentPath === '/FAQ') {
      return <FAQPage />;
    }

    if (currentPath === '/RequestDrama') {
      return <RequestPage />;
    }

    // Default Home Page
    return (
      <HomePage
        onSelectDrama={handleSelectDrama}
        onNavigate={navigate}
        onOpenAuth={() => setIsAuthOpen(true)}
        isLoggedIn={isLoggedIn}
        history={history}
      />
    );
  };

  return (
    <div
      className={`min-h-screen text-white flex flex-col ${
        currentTheme === 'amoled'
          ? 'bg-[#0a0a0a]'
          : currentTheme === 'dark-blue'
          ? 'bg-[#0f172a]'
          : 'bg-[#181818]'
      }`}
    >
      <Navbar
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenTheme={() => setIsThemeOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        isLoggedIn={isLoggedIn}
      />

      <main className="flex-1">{renderCurrentView()}</main>

      <Footer onNavigate={navigate} />

      {/* Interactive Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelect={handleSelectDrama}
      />

      <ThemeModal
        isOpen={isThemeOpen}
        onClose={() => setIsThemeOpen(false)}
        currentTheme={currentTheme}
        onSelectTheme={setCurrentTheme}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

export default App;
