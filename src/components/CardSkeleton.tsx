'use client';

import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const SkeletonCard = styled.div`
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.colors.gray[800]};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  overflow: hidden;
  border: 1px solid ${(props) => props.theme.colors.gray[700]};
`;

const SkeletonPoster = styled.div`
  width: 100%;
  aspect-ratio: 2/3;
  background: linear-gradient(
    90deg,
    ${(props) => props.theme.colors.gray[700]} 0px,
    ${(props) => props.theme.colors.gray[600]} 40px,
    ${(props) => props.theme.colors.gray[700]} 80px
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite linear;
`;

const SkeletonContent = styled.div`
  padding: ${(props) => props.theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.sm};
`;

const SkeletonLine = styled.div<{ $width?: string; $height?: string }>`
  width: ${(props) => props.$width || '100%'};
  height: ${(props) => props.$height || '16px'};
  background: linear-gradient(
    90deg,
    ${(props) => props.theme.colors.gray[700]} 0px,
    ${(props) => props.theme.colors.gray[600]} 40px,
    ${(props) => props.theme.colors.gray[700]} 80px
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite linear;
  border-radius: ${(props) => props.theme.borderRadius.sm};
`;

const SkeletonFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${(props) => props.theme.spacing.sm};
  padding-top: ${(props) => props.theme.spacing.sm};
  border-top: 1px solid ${(props) => props.theme.colors.gray[700]};
`;

export default function CardSkeleton() {
  return (
    <SkeletonCard>
      <SkeletonPoster />
      <SkeletonContent>
        <SkeletonLine $width="40%" $height="12px" />
        <SkeletonLine $width="90%" $height="20px" />
        <SkeletonLine $width="70%" $height="14px" />
        <SkeletonFooter>
          <SkeletonLine $width="30%" $height="14px" />
          <SkeletonLine $width="35%" $height="14px" />
        </SkeletonFooter>
      </SkeletonContent>
    </SkeletonCard>
  );
}
