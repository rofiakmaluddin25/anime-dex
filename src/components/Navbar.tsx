'use client';

import styled from 'styled-components';
import { Input } from './ui';
import Link from 'next/link';

const NavbarContainer = styled.nav`
  background: ${(props) => props.theme.colors.gray[900]};
  border-bottom: 1px solid ${(props) => props.theme.colors.gray[800]};
  padding: ${(props) => props.theme.spacing.md} ${(props) => props.theme.spacing.xl};
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
  background: rgba(17, 24, 39, 0.95);

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
  }
`;

const NavbarContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xl};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    gap: ${(props) => props.theme.spacing.md};
  }
`;

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
  text-decoration: none;
  flex-shrink: 0;
`;

const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
  border-radius: ${(props) => props.theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => props.theme.fontSize.xl};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  color: white;
  box-shadow: ${(props) => props.theme.shadows.md};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    width: 36px;
    height: 36px;
    font-size: ${(props) => props.theme.fontSize.lg};
  }
`;

const LogoText = styled.span`
  font-size: ${(props) => props.theme.fontSize.xl};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  color: white;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    font-size: ${(props) => props.theme.fontSize.lg};
  }
`;

const LogoTextAccent = styled.span`
  background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const SearchContainer = styled.div`
  flex: 1;
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    max-width: 100%;
  }
`;

const SearchIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

interface NavbarProps {
  onSearch?: (query: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch?.(e.target.value);
  };

  return (
    <NavbarContainer>
      <NavbarContent>
        <LogoContainer href="/">
          <LogoIcon>A</LogoIcon>
          <LogoText>
            Anime<LogoTextAccent>Dex</LogoTextAccent>
          </LogoText>
        </LogoContainer>

        <SearchContainer>
          <Input placeholder="Search anime..." icon={<SearchIcon />} onChange={handleSearch} />
        </SearchContainer>
      </NavbarContent>
    </NavbarContainer>
  );
}
