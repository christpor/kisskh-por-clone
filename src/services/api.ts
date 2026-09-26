import { DramaItem, DramaDetail, DramaListResponse } from '../types/drama';
import mockData from '../data/mock-kisskh.json';

const FETCH_TIMEOUT_MS = 3000;

async function fetchWithTimeout(url: string, options: RequestInit = {}): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return res;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

export const api = {
  async getShow(): Promise<DramaItem[]> {
    try {
      const res = await fetchWithTimeout('/api/DramaList/Show');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch (e) {
      console.warn('Falling back to local snapshot for Show', e);
    }
    return mockData.show as DramaItem[];
  },

  async getTopKDrama(): Promise<DramaItem[]> {
    try {
      const res = await fetchWithTimeout('/api/DramaList/MostView?ispc=true&c=2');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch (e) {
      console.warn('Falling back to local snapshot for TopKDrama', e);
    }
    return mockData.topKDrama as DramaItem[];
  },

  async getTopCDrama(): Promise<DramaItem[]> {
    try {
      const res = await fetchWithTimeout('/api/DramaList/MostView?ispc=true&c=1');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch (e) {
      console.warn('Falling back to local snapshot for TopCDrama', e);
    }
    return mockData.topCDrama as DramaItem[];
  },

  async getLastUpdate(): Promise<DramaItem[]> {
    try {
      const res = await fetchWithTimeout('/api/DramaList/LastUpdate?page=1&type=0');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch (e) {
      console.warn('Falling back to local snapshot for LastUpdate', e);
    }
    return mockData.lastUpdate as DramaItem[];
  },

  async getHollywood(): Promise<DramaItem[]> {
    try {
      const res = await fetchWithTimeout('/api/DramaList/TopRating?ispc=true');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch (e) {
      console.warn('Falling back to local snapshot for Hollywood', e);
    }
    return mockData.hollywood as DramaItem[];
  },

  async getMostSearch(): Promise<DramaItem[]> {
    try {
      const res = await fetchWithTimeout('/api/DramaList/MostSearch?ispc=true');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch (e) {
      console.warn('Falling back to local snapshot for MostSearch', e);
    }
    return (mockData as any).mostSearch as DramaItem[];
  },

  async getExplore(page = 1, country = 0, type = 0, status = 0, order = 1): Promise<DramaListResponse> {
    try {
      const res = await fetchWithTimeout(`/api/DramaList/List?page=${page}&type=${type}&sub=0&country=${country}&status=${status}&order=${order}`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.data) return data;
      }
    } catch (e) {
      console.warn('Falling back to local snapshot for Explore', e);
    }
    return mockData.explore as DramaListResponse;
  },

  async getDrama(id: number | string): Promise<DramaDetail> {
    try {
      const res = await fetchWithTimeout(`/api/DramaList/Drama/${id}`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.title) return data;
      }
    } catch (e) {
      console.warn(`Falling back to local snapshot for Drama ${id}`, e);
    }

    const cached = (mockData.dramaDetails as Record<string, DramaDetail>)[String(id)];
    if (cached) return cached;

    // Default synthesis from other lists if id isn't in specific details
    const all = [
      ...mockData.show,
      ...mockData.topKDrama,
      ...mockData.topCDrama,
      ...mockData.lastUpdate,
      ...mockData.hollywood,
      ...mockData.explore.data,
    ] as DramaItem[];
    const match = all.find((item) => String(item.id) === String(id));

    return {
      id: Number(id),
      title: match?.title || `Drama #${id}`,
      thumbnail: match?.thumbnail || 'https://media.themoviedb.org/t/p/w1066_and_h600_face/mA4ClzkBvBCiTHQ8zHFsuWRaLW2.jpg',
      episodesCount: match?.episodesCount || 16,
      label: match?.label || '',
      description: 'Follow the captivating story of characters as their destinies collide in an unforgettable emotional rollercoaster filled with romance, drama, and unexpected turns.',
      country: 'South Korea',
      status: 'Completed',
      type: 'Drama',
      releaseDate: '2024-2026',
      episodes: Array.from({ length: match?.episodesCount || 16 }, (_, i) => ({
        id: 200000 + Number(id) * 10 + (i + 1),
        number: i + 1,
        sub: 1,
      })),
    };
  },

  async search(query: string): Promise<DramaItem[]> {
    if (!query.trim()) return [];
    try {
      const res = await fetchWithTimeout(`/api/DramaList/Search?q=${encodeURIComponent(query)}`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) return data;
      }
    } catch (e) {
      console.warn('Falling back to local search', e);
    }

    const q = query.toLowerCase();
    const all = [
      ...mockData.show,
      ...mockData.topKDrama,
      ...mockData.topCDrama,
      ...mockData.lastUpdate,
      ...mockData.hollywood,
      ...mockData.explore.data,
    ] as DramaItem[];

    const seen = new Set<number>();
    return all.filter((item) => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return item.title.toLowerCase().includes(q);
    });
  },
};
