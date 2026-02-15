// Kitsu API Types
export interface KitsuAnimeAttributes {
  titles: {
    en?: string;
    en_us?: string;
    en_jp?: string;
    ja_jp?: string;
  };
  canonicalTitle: string;
  posterImage: {
    tiny: string;
    small: string;
    medium: string;
    large: string;
    original: string;
  };
  coverImage?: {
    tiny: string;
    small: string;
    large: string;
    original: string;
  };
  averageRating?: string;
  description?: string;
  synopsis?: string;
  startDate?: string;
  endDate?: string;
  episodeCount?: number;
  status?: string;
  ageRating?: string;
  ageRatingGuide?: string;
  popularityRank?: number;
  ratingRank?: number;
  userCount?: number;
  favoritesCount?: number;
}

export interface KitsuAnime {
  id: string;
  type: 'anime';
  attributes: KitsuAnimeAttributes;
  relationships: {
    categories: {
      links: {
        related: string;
      };
    };
  };
}

export interface KitsuResponse<T> {
  data: T[];
  meta: {
    count: number;
  };
  links: {
    first: string;
    next?: string;
    last: string;
  };
}

export interface KitsuCategory {
  id: string;
  type: 'categories';
  attributes: {
    title: string;
    description: string;
    slug: string;
    totalMediaCount: number;
  };
}
