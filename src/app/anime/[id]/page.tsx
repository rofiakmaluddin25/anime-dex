'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { kitsuApi } from '@/services/kitsu';
import styled from 'styled-components';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${(props) => props.theme.colors.gray[900]};
  display: flex;
  flex-direction: column;
`;

const HeroSection = styled.div`
  padding: ${(props) => props.theme.spacing.xl};
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  gap: ${(props) => props.theme.spacing.xl};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: column;
    padding: ${(props) => props.theme.spacing.md};
  }
`;

const PosterImage = styled.img`
  width: 200px;
  height: 300px;
  object-fit: cover;
  border-radius: ${(props) => props.theme.borderRadius.lg};
  border: 3px solid ${(props) => props.theme.colors.purple[500]};
  flex-shrink: 0;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    width: 150px;
    height: 225px;
  }
`;

const HeroContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.md};
`;

const Title = styled.h1`
  font-size: ${(props) => props.theme.fontSize['4xl']};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  color: white;
  margin: 0;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    font-size: ${(props) => props.theme.fontSize['2xl']};
  }
`;

const JapaneseTitle = styled.p`
  font-size: ${(props) => props.theme.fontSize.lg};
  color: ${(props) => props.theme.colors.gray[400]};
  margin: 0;
`;

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.md};
  flex-wrap: wrap;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xs};
  color: ${(props) => props.theme.colors.purple[400]};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  font-size: ${(props) => props.theme.fontSize.lg};
`;

const MetaItem = styled.span`
  color: ${(props) => props.theme.colors.gray[300]};
  font-size: ${(props) => props.theme.fontSize.sm};
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xs};
  color: ${(props) => props.theme.colors.gray[400]};
  text-decoration: none;
  font-size: ${(props) => props.theme.fontSize.sm};
  margin-bottom: ${(props) => props.theme.spacing.md};
  transition: color ${(props) => props.theme.transitions.base};

  &:hover {
    color: ${(props) => props.theme.colors.purple[400]};
  }
`;

const ContentSection = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  padding: 0 ${(props) => props.theme.spacing.xl};
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: ${(props) => props.theme.spacing.xl};

  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    padding: 0 ${(props) => props.theme.spacing.md};
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.xl};
`;

const Section = styled.section`
  background: ${(props) => props.theme.colors.gray[800]};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  padding: ${(props) => props.theme.spacing.lg};
`;

const SectionTitle = styled.h2`
  font-size: ${(props) => props.theme.fontSize['2xl']};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  color: white;
  margin: 0 0 ${(props) => props.theme.spacing.md};
`;

const Synopsis = styled.p`
  color: ${(props) => props.theme.colors.gray[300]};
  line-height: 1.8;
  margin: 0;
  white-space: pre-line;
`;

const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.lg};
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${(props) => props.theme.spacing.md};
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.xs};
`;

const InfoLabel = styled.span`
  font-size: ${(props) => props.theme.fontSize.xs};
  color: ${(props) => props.theme.colors.purple[400]};
  text-transform: uppercase;
  font-weight: ${(props) => props.theme.fontWeight.semibold};
`;

const InfoValue = styled.span`
  font-size: ${(props) => props.theme.fontSize.sm};
  color: white;
  font-weight: ${(props) => props.theme.fontWeight.medium};
`;

const CategoryTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${(props) => props.theme.spacing.sm};
`;

const CategoryTag = styled.span`
  padding: ${(props) => props.theme.spacing.xs} ${(props) => props.theme.spacing.sm};
  background: ${(props) => props.theme.colors.purple[500]}40;
  color: ${(props) => props.theme.colors.purple[300]};
  border-radius: ${(props) => props.theme.borderRadius.full};
  font-size: ${(props) => props.theme.fontSize.xs};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  border: 1px solid ${(props) => props.theme.colors.purple[500]}60;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  color: ${(props) => props.theme.colors.gray[400]};
`;

export default function AnimeDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const { data, isLoading, error } = useQuery({
    queryKey: ['anime', 'detail', id],
    queryFn: () => kitsuApi.getAnimeById(id),
  });

  const { data: categoriesData } = useQuery({
    queryKey: ['anime', 'categories', id],
    queryFn: () => kitsuApi.getAnimeCategories(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <PageContainer>
        <Navbar showSearch={false} />
        <LoadingContainer>Loading...</LoadingContainer>
        <Footer />
      </PageContainer>
    );
  }

  if (error || !data) {
    return (
      <PageContainer>
        <Navbar showSearch={false} />
        <LoadingContainer>Error loading anime details</LoadingContainer>
        <Footer />
      </PageContainer>
    );
  }

  const anime = data.data;
  const rating = anime.attributes.averageRating
    ? (parseFloat(anime.attributes.averageRating) / 10).toFixed(1)
    : 'N/A';

  return (
    <PageContainer>
      <Navbar showSearch={false} />

      <HeroSection>
        <BackButton href="/">← Back to Browse</BackButton>
      </HeroSection>

      <HeroSection>
        <PosterImage
          src={anime.attributes.posterImage.medium}
          alt={anime.attributes.canonicalTitle}
        />
        <HeroContent>
          <Title>{anime.attributes.canonicalTitle}</Title>
          {anime.attributes.titles.ja_jp && (
            <JapaneseTitle>{anime.attributes.titles.ja_jp}</JapaneseTitle>
          )}
          <MetaInfo>
            <Rating>⭐ {rating}/10</Rating>
            <MetaItem>{anime.attributes.episodeCount || '?'} Episodes</MetaItem>
            <MetaItem>{anime.attributes.status}</MetaItem>
            <MetaItem>{anime.attributes.startDate?.split('-')[0] || 'TBA'}</MetaItem>
            <MetaItem>{anime.attributes.ageRating || 'Not Rated'}</MetaItem>
          </MetaInfo>
        </HeroContent>
      </HeroSection>

      <ContentSection>
        <MainContent>
          <Section>
            <SectionTitle>Synopsis</SectionTitle>
            <Synopsis>{anime.attributes.synopsis || 'No synopsis available.'}</Synopsis>
          </Section>

          {categoriesData && categoriesData.data.length > 0 && (
            <Section>
              <SectionTitle>Categories</SectionTitle>
              <CategoryTags>
                {categoriesData.data.map((cat) => (
                  <CategoryTag key={cat.id}>{cat.attributes.title}</CategoryTag>
                ))}
              </CategoryTags>
            </Section>
          )}
        </MainContent>

        <Sidebar>
          <Section>
            <SectionTitle>Information</SectionTitle>
            <InfoGrid>
              <InfoItem>
                <InfoLabel>Type</InfoLabel>
                <InfoValue>{anime.attributes.subtype || 'Unknown'}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Episodes</InfoLabel>
                <InfoValue>{anime.attributes.episodeCount || '?'}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Duration</InfoLabel>
                <InfoValue>
                  {anime.attributes.episodeLength
                    ? `${anime.attributes.episodeLength} min/ep`
                    : 'Unknown'}
                </InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Status</InfoLabel>
                <InfoValue>{anime.attributes.status}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Aired</InfoLabel>
                <InfoValue>{anime.attributes.startDate || 'TBA'}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Rating</InfoLabel>
                <InfoValue>{anime.attributes.ageRating || 'Not Rated'}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Rank</InfoLabel>
                <InfoValue>#{anime.attributes.ratingRank || 'N/A'}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Popularity</InfoLabel>
                <InfoValue>#{anime.attributes.popularityRank || 'N/A'}</InfoValue>
              </InfoItem>
            </InfoGrid>
          </Section>
        </Sidebar>
      </ContentSection>

      <Footer />
    </PageContainer>
  );
}
