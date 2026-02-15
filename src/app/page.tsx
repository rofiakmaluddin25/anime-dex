'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import CategoryFilter from '@/components/CategoryFilter';
import Grid from '@/components/Grid';
import Pagination from '@/components/Pagination';
import Footer from '@/components/Footer';
import { useQuery } from '@tanstack/react-query';
import { kitsuApi } from '@/services/kitsu';
import { CardProps } from '@/components/Card';
import styled from 'styled-components';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${(props) => props.theme.colors.gray[900]};
  display: flex;
  flex-direction: column;
`;

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const queryKey = [
    'anime',
    debouncedSearch && selectedCategory
      ? 'search-category'
      : debouncedSearch
        ? 'search'
        : selectedCategory
          ? 'category'
          : 'list',
    debouncedSearch,
    selectedCategory,
    currentPage,
  ];

  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: () =>
      kitsuApi.getAnime({
        page: currentPage,
        limit: 10,
        search: debouncedSearch || undefined,
        category: selectedCategory || undefined,
      }),
  });

  const items: CardProps[] =
    data?.data.map((anime) => ({
      id: anime.id,
      title: anime.attributes.titles.en || anime.attributes.canonicalTitle,
      subtitle: anime.attributes.titles.ja_jp,
      posterImage: anime.attributes.posterImage.medium,
      rating: anime.attributes.averageRating
        ? (parseFloat(anime.attributes.averageRating) / 10).toFixed(1)
        : undefined,
      genre: 'Anime',
      episodeCount: anime.attributes.episodeCount,
    })) || [];

  if (error) {
    return (
      <PageContainer>
        <Navbar />
        <div
          style={{
            color: 'white',
            textAlign: 'center',
            padding: '2rem',
          }}
        >
          Error loading anime: {(error as Error).message}
        </div>
      </PageContainer>
    );
  }

  const totalPages = data?.meta?.count ? Math.ceil(data.meta.count / 10) : 1;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const gridTitle =
    debouncedSearch && selectedCategory
      ? `Search "${debouncedSearch}" in ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`
      : debouncedSearch
        ? `Search Results for "${debouncedSearch}"`
        : selectedCategory
          ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Anime`
          : 'Discover Anime';

  return (
    <PageContainer>
      <Navbar onSearch={handleSearch} />
      <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
      <Grid title={gridTitle} items={items} isLoading={isLoading} />
      {!isLoading && !error && items.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
      <Footer />
    </PageContainer>
  );
}
