'use client';

import styled from 'styled-components';
import Link from 'next/link';

const FooterContainer = styled.footer`
  background: ${(props) => props.theme.colors.gray[900]};
  border-top: 1px solid ${(props) => props.theme.colors.gray[800]};
  padding: ${(props) => props.theme.spacing.xl};
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.md};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: column;
    text-align: center;
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
  width: 32px;
  height: 32px;
  border-radius: ${(props) => props.theme.borderRadius.md};
  background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${(props) => props.theme.fontWeight.bold};
  font-size: ${(props) => props.theme.fontSize.lg};
  color: white;
`;

const LogoText = styled.span`
  font-size: ${(props) => props.theme.fontSize.lg};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  color: white;
`;

const Copyright = styled.p`
  color: ${(props) => props.theme.colors.gray[400]};
  font-size: ${(props) => props.theme.fontSize.sm};
  margin: 0;
`;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <LogoContainer href="/">
          <LogoIcon>A</LogoIcon>
          <LogoText>AnimeDex</LogoText>
        </LogoContainer>
        <Copyright>© {currentYear} All rights reserved.</Copyright>
      </FooterContent>
    </FooterContainer>
  );
}
