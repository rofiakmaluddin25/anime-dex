import axios from 'axios';
import { KitsuResponse, KitsuAnime, KitsuCategory } from '@/types/kitsu';

const BASE_URL = 'https://kitsu.io/api/edge';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/vnd.api+json',
    Accept: 'application/vnd.api+json',
  },
});

interface GetAnimeParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}

export const kitsuApi = {
  getAnime: async ({ page = 1, limit = 10, search, category }: GetAnimeParams = {}): Promise<
    KitsuResponse<KitsuAnime>
  > => {
    const offset = (page - 1) * limit;
    const params = new URLSearchParams({
      'page[limit]': limit.toString(),
      'page[offset]': offset.toString(),
    });

    if (search) {
      params.append('filter[text]', search);
    }

    if (category) {
      params.append('filter[categories]', category);
    }

    const url = `/anime?${params.toString()}`;
    const { data } = await axiosInstance.get<KitsuResponse<KitsuAnime>>(url);
    return data;
  },

  getAnimeById: async (id: string): Promise<{ data: KitsuAnime }> => {
    const { data } = await axiosInstance.get<{ data: KitsuAnime }>(`/anime/${id}`);
    return data;
  },

  getAnimeCategories: async (id: string): Promise<KitsuResponse<KitsuCategory>> => {
    const { data } = await axiosInstance.get<KitsuResponse<KitsuCategory>>(
      `/anime/${id}/categories`
    );
    return data;
  },

  getAllCategories: async (limit: number = 20): Promise<KitsuResponse<KitsuCategory>> => {
    const { data } = await axiosInstance.get<KitsuResponse<KitsuCategory>>(
      `/categories?page[limit]=${limit}&sort=-totalMediaCount`
    );
    return data;
  },
};
