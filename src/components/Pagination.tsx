'use client';

import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.spacing.sm};
  padding: ${(props) => props.theme.spacing.xl};
  margin: 0 auto;
  max-width: 1400px;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    padding: ${(props) => props.theme.spacing.md};
    gap: ${(props) => props.theme.spacing.xs};
  }
`;

const PageButton = styled.button<{ $isActive?: boolean }>`
  min-width: 40px;
  height: 40px;
  padding: ${(props) => props.theme.spacing.sm};
  background: ${(props) =>
    props.$isActive
      ? 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)'
      : props.theme.colors.gray[800]};
  color: ${(props) => (props.$isActive ? 'white' : props.theme.colors.gray[300])};
  border: 2px solid ${(props) => (props.$isActive ? '#8b5cf6' : props.theme.colors.gray[700])};
  border-radius: ${(props) => props.theme.borderRadius.md};
  font-size: ${(props) => props.theme.fontSize.base};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  cursor: pointer;
  transition: all ${(props) => props.theme.transitions.base};

  &:hover:not(:disabled) {
    background: ${(props) =>
      props.$isActive
        ? 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)'
        : props.theme.colors.gray[700]};
    border-color: ${(props) => (props.$isActive ? '#7c3aed' : '#8b5cf6')};
    color: white;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    min-width: 36px;
    height: 36px;
    font-size: ${(props) => props.theme.fontSize.sm};
  }
`;

const NavButton = styled(PageButton)`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xs};
  padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    span {
      display: none;
    }
  }
`;

const Ellipsis = styled.span`
  color: ${(props) => props.theme.colors.gray[500]};
  padding: 0 ${(props) => props.theme.spacing.xs};
  user-select: none;
`;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const getPageNumbers = (): (number | 'ellipsis')[] => {
    const pages: (number | 'ellipsis')[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    pages.push(1);

    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <= 3) {
      startPage = 2;
      endPage = 4;
    }

    if (currentPage >= totalPages - 2) {
      startPage = totalPages - 3;
      endPage = totalPages - 1;
    }

    if (startPage > 2) {
      pages.push('ellipsis');
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) {
      pages.push('ellipsis');
    }

    pages.push(totalPages);

    return pages;
  };

  const pageNumbers = getPageNumbers();

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <PaginationContainer>
      <NavButton onClick={handlePrevious} disabled={currentPage === 1}>
        <span>‹</span>
        <span>Previous</span>
      </NavButton>

      {pageNumbers.map((page, index) => {
        if (page === 'ellipsis') {
          return <Ellipsis key={`ellipsis-${index}`}>...</Ellipsis>;
        }

        return (
          <PageButton
            key={page}
            $isActive={page === currentPage}
            onClick={() => onPageChange(page)}
          >
            {page}
          </PageButton>
        );
      })}

      <NavButton onClick={handleNext} disabled={currentPage === totalPages}>
        <span>Next</span>
        <span>›</span>
      </NavButton>
    </PaginationContainer>
  );
}
