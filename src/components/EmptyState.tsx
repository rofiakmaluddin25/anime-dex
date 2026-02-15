'use client';

import styled from 'styled-components';

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: ${(props) => props.theme.spacing.xl};
  text-align: center;
`;

const EmptyIcon = styled.div`
  font-size: 64px;
  margin-bottom: ${(props) => props.theme.spacing.lg};
  opacity: 0.5;
`;

const EmptyTitle = styled.h3`
  font-size: ${(props) => props.theme.fontSize['2xl']};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  color: white;
  margin: 0 0 ${(props) => props.theme.spacing.sm};
`;

const EmptyDescription = styled.p`
  font-size: ${(props) => props.theme.fontSize.base};
  color: ${(props) => props.theme.colors.gray[400]};
  margin: 0;
  max-width: 400px;
`;

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: string;
}

export default function EmptyState({
  title = 'No Results Found',
  description = "Try adjusting your search or filters to find what you're looking for.",
  icon = '🔍',
}: EmptyStateProps) {
  return (
    <EmptyContainer>
      <EmptyIcon>{icon}</EmptyIcon>
      <EmptyTitle>{title}</EmptyTitle>
      <EmptyDescription>{description}</EmptyDescription>
    </EmptyContainer>
  );
}
