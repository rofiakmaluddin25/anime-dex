'use client';

import styled from 'styled-components';
import Link from 'next/link';

const CardContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.colors.gray[800]};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  overflow: hidden;
  transition: all ${(props) => props.theme.transitions.base};
  cursor: pointer;
  text-decoration: none;
  border: 1px solid ${(props) => props.theme.colors.gray[700]};

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(139, 92, 246, 0.3);
    border-color: #8b5cf6;
  }
`;

const PosterContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 2/3;
  overflow: hidden;
  background: ${(props) => props.theme.colors.gray[700]};
`;

const PosterImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RatingBadge = styled.div`
  position: absolute;
  top: ${(props) => props.theme.spacing.sm};
  right: ${(props) => props.theme.spacing.sm};
  background: rgba(17, 24, 39, 0.9);
  backdrop-filter: blur(10px);
  padding: ${(props) => props.theme.spacing.xs} ${(props) => props.theme.spacing.sm};
  border-radius: ${(props) => props.theme.borderRadius.full};
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xs};
  font-size: ${(props) => props.theme.fontSize.sm};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  color: white;
`;

const StarIcon = styled.span`
  color: #fbbf24;
  font-size: ${(props) => props.theme.fontSize.sm};
`;

const CardContent = styled.div`
  padding: ${(props) => props.theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.xs};
  flex: 1;
`;

const GenreText = styled.div`
  font-size: ${(props) => props.theme.fontSize.xs};
  color: #8b5cf6;
  font-weight: ${(props) => props.theme.fontWeight.semibold};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Title = styled.h3`
  font-size: ${(props) => props.theme.fontSize.lg};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  color: white;
  margin: 0;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Subtitle = styled.p`
  font-size: ${(props) => props.theme.fontSize.sm};
  color: ${(props) => props.theme.colors.gray[400]};
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${(props) => props.theme.spacing.sm};
  padding-top: ${(props) => props.theme.spacing.sm};
  border-top: 1px solid ${(props) => props.theme.colors.gray[700]};
`;

const EpisodeCount = styled.span`
  font-size: ${(props) => props.theme.fontSize.sm};
  color: ${(props) => props.theme.colors.gray[400]};
`;

const ViewDetailsButton = styled.span`
  font-size: ${(props) => props.theme.fontSize.sm};
  color: #8b5cf6;
  font-weight: ${(props) => props.theme.fontWeight.semibold};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export interface CardProps {
  id: string;
  title: string;
  subtitle?: string;
  posterImage: string;
  rating?: string;
  genre?: string;
  episodeCount?: number;
}

export default function Card({
  id,
  title,
  subtitle,
  posterImage,
  rating,
  genre,
  episodeCount,
}: CardProps) {
  return (
    <CardContainer href={`/anime/${id}`}>
      <PosterContainer>
        <PosterImage src={posterImage} alt={title} loading="lazy" />
        {rating && (
          <RatingBadge>
            <StarIcon>★</StarIcon>
            {rating}
          </RatingBadge>
        )}
      </PosterContainer>
      <CardContent>
        {genre && <GenreText>{genre}</GenreText>}
        <Title>{title}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
        <CardFooter>
          {episodeCount && <EpisodeCount>{episodeCount} Eps</EpisodeCount>}
          <ViewDetailsButton>View Details</ViewDetailsButton>
        </CardFooter>
      </CardContent>
    </CardContainer>
  );
}
