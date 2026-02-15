'use client';

import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { kitsuApi } from '@/services/kitsu';

const FilterContainer = styled.div`
  background: ${(props) => props.theme.colors.gray[800]};
  border-bottom: 1px solid ${(props) => props.theme.colors.gray[700]};
  padding: ${(props) => props.theme.spacing.md} ${(props) => props.theme.spacing.xl};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
  }
`;

const FilterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.md};
  overflow-x: auto;

  /* Hide scrollbar but keep functionality */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    gap: ${(props) => props.theme.spacing.sm};
  }
`;

const FilterLabel = styled.span`
  color: ${(props) => props.theme.colors.gray[400]};
  font-size: ${(props) => props.theme.fontSize.sm};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  white-space: nowrap;
  flex-shrink: 0;
`;

const CategoryButton = styled.button<{ $isActive?: boolean }>`
  padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
  background: ${(props) =>
    props.$isActive
      ? 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)'
      : props.theme.colors.gray[700]};
  color: ${(props) => (props.$isActive ? 'white' : props.theme.colors.gray[300])};
  border: 2px solid ${(props) => (props.$isActive ? '#8b5cf6' : 'transparent')};
  border-radius: ${(props) => props.theme.borderRadius.full};
  font-size: ${(props) => props.theme.fontSize.sm};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  cursor: pointer;
  transition: all ${(props) => props.theme.transitions.base};
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    background: ${(props) =>
      props.$isActive
        ? 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)'
        : props.theme.colors.gray[600]};
    color: white;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    padding: ${(props) => props.theme.spacing.xs} ${(props) => props.theme.spacing.sm};
    font-size: ${(props) => props.theme.fontSize.xs};
  }
`;

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  const { data: categoriesData, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => kitsuApi.getAllCategories(15),
    staleTime: 1000 * 60 * 60,
  });

  const categories = [
    { slug: '', title: 'All' },
    ...(categoriesData?.data.map((cat) => ({
      slug: cat.attributes.slug,
      title: cat.attributes.title,
    })) || []),
  ];

  if (isLoading) {
    return (
      <FilterContainer>
        <FilterContent>
          <FilterLabel>Category:</FilterLabel>
          <CategoryButton $isActive>All</CategoryButton>
        </FilterContent>
      </FilterContainer>
    );
  }

  return (
    <FilterContainer>
      <FilterContent>
        <FilterLabel>Category:</FilterLabel>
        {categories.map((category) => (
          <CategoryButton
            key={category.slug}
            $isActive={selectedCategory === category.slug}
            onClick={() => onCategoryChange(category.slug)}
          >
            {category.title}
          </CategoryButton>
        ))}
      </FilterContent>
    </FilterContainer>
  );
}
