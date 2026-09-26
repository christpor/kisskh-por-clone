export interface DramaItem {
  id: number;
  title: string;
  thumbnail: string;
  episodesCount?: number;
  label?: string | null;
  favoriteID?: number | null;
}

export interface DramaEpisode {
  id: number;
  number: number;
  sub: number;
}

export interface DramaDetail extends DramaItem {
  description: string;
  releaseDate?: string;
  trailer?: string;
  country?: string;
  status?: string;
  type?: string;
  episodes?: DramaEpisode[];
}

export interface DramaListResponse {
  page: number;
  pageSize: number;
  totalCount: number;
  data: DramaItem[];
}
