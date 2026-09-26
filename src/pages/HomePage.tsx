import React, { useState, useEffect } from 'react';
import { DramaItem } from '../types/drama';
import { api } from '../services/api';
import mockData from '../data/mock-kisskh.json';
import { HeroCarousel } from '../components/HeroCarousel';
import { ContinueWatching } from '../components/ContinueWatching';
import { DramaRail } from '../components/DramaRail';

interface HomePageProps {
  onSelectDrama: (drama: DramaItem) => void;
  onNavigate: (path: string) => void;
  onOpenAuth: () => void;
  isLoggedIn: boolean;
  history: DramaItem[];
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectDrama,
  onNavigate,
  onOpenAuth,
  isLoggedIn,
  history,
}) => {
  // Initialize with bundled snapshot for instant zero-latency paint
  const [showSlides, setShowSlides] = useState<DramaItem[]>(mockData.show as DramaItem[]);
  const [lastUpdate, setLastUpdate] = useState<DramaItem[]>(mockData.lastUpdate as DramaItem[]);
  const [topKDrama, setTopKDrama] = useState<DramaItem[]>(mockData.topKDrama as DramaItem[]);
  const [topCDrama, setTopCDrama] = useState<DramaItem[]>(mockData.topCDrama as DramaItem[]);
  const [hollywood, setHollywood] = useState<DramaItem[]>(mockData.hollywood as DramaItem[]);

  useEffect(() => {
    let isMounted = true;
    async function loadFreshData() {
      try {
        const [shows, latest, kdrama, cdrama, hw] = await Promise.all([
          api.getShow(),
          api.getLastUpdate(),
          api.getTopKDrama(),
          api.getTopCDrama(),
          api.getHollywood(),
        ]);
        if (isMounted) {
          setShowSlides(shows);
          setLastUpdate(latest);
          setTopKDrama(kdrama);
          setTopCDrama(cdrama);
          setHollywood(hw);
        }
      } catch (err) {
        console.warn('Using bundled snapshot data', err);
      }
    }
    loadFreshData();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#181818] pb-12">
      {/* 1. Hero Carousel matching Screenshot 2 (Between Steps 2026) */}
      <HeroCarousel slides={showSlides} onSelect={onSelectDrama} />

      {/* 2. Continue Watching matching Screenshot 2 */}
      <ContinueWatching
        isLoggedIn={isLoggedIn}
        history={history}
        onOpenAuth={onOpenAuth}
        onSelect={onSelectDrama}
      />

      {/* 3. Lastest Update matching Screenshot 2 */}
      <DramaRail
        title="Lastest Update"
        items={lastUpdate}
        onSelect={onSelectDrama}
        onViewAll={() => onNavigate('/List?order=1')}
      />

      {/* 4. Top K-Drama matching Screenshot 1 */}
      <DramaRail
        title="Top K-Drama"
        items={topKDrama}
        onSelect={onSelectDrama}
        onViewAll={() => onNavigate('/List?country=2')}
      />

      {/* 5. Top C-Drama matching Screenshot 1 */}
      <DramaRail
        title="Top C-Drama"
        items={topCDrama}
        onSelect={onSelectDrama}
        onViewAll={() => onNavigate('/List?country=1')}
      />

      {/* 6. Hollywood matching Screenshot 1 bottom */}
      <DramaRail
        title="Hollywood"
        items={hollywood}
        onSelect={onSelectDrama}
        onViewAll={() => onNavigate('/List?type=2')}
      />
    </div>
  );
};
