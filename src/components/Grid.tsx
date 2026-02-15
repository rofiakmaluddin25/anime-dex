'use client';

import styled from 'styled-components';
import Card, { CardProps } from './Card';
import CardSkeleton from './CardSkeleton';
import EmptyState from './EmptyState';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${(props) => props.theme.spacing.xl};
  padding: ${(props) => props.theme.spacing.xl};
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: ${(props) => props.theme.spacing.lg};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: ${(props) => props.theme.spacing.md};
    padding: ${(props) => props.theme.spacing.md};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const SectionTitle = styled.h2`
  font-size: ${(props) => props.theme.fontSize['3xl']};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  color: white;
  margin: 0;
  padding: ${(props) => props.theme.spacing.xl};
  padding-bottom: 0;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    font-size: ${(props) => props.theme.fontSize['2xl']};
    padding: ${(props) => props.theme.spacing.md};
    padding-bottom: 0;
  }
`;

interface GridProps {
  title?: string;
  items: CardProps[];
  isLoading?: boolean;
}

export default function Grid({ title = 'Discover Anime', items, isLoading = false }: GridProps) {
  if (isLoading) {
    return (
      <>
        {title && <SectionTitle>{title}</SectionTitle>}
        <GridContainer>
          {Array.from({ length: 10 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </GridContainer>
      </>
    );
  }

  if (items.length === 0) {
    return (
      <>
        {title && <SectionTitle>{title}</SectionTitle>}
        <EmptyState />
      </>
    );
  }

  return (
    <>
      {title && <SectionTitle>{title}</SectionTitle>}
      <GridContainer>
        {items.map((item) => (
          <Card key={item.id} {...item} />
        ))}
      </GridContainer>
    </>
  );
}
