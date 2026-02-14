'use client';

import styled, { css } from 'styled-components';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const getVariantStyles = (variant: ButtonProps['variant']) => {
  switch (variant) {
    case 'primary':
      return css`
        background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
        color: white;
        border: none;

        &:hover:not(:disabled) {
          background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%);
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(139, 92, 246, 0.3);
        }
      `;
    case 'secondary':
      return css`
        background: ${(props) => props.theme.colors.gray[700]};
        color: white;
        border: none;

        &:hover:not(:disabled) {
          background: ${(props) => props.theme.colors.gray[600]};
        }
      `;
    case 'outline':
      return css`
        background: transparent;
        color: #8b5cf6;
        border: 2px solid #8b5cf6;

        &:hover:not(:disabled) {
          background: rgba(139, 92, 246, 0.1);
        }
      `;
    case 'ghost':
      return css`
        background: transparent;
        color: ${(props) => props.theme.colors.gray[300]};
        border: none;

        &:hover:not(:disabled) {
          background: ${(props) => props.theme.colors.gray[800]};
        }
      `;
    default:
      return '';
  }
};

const getSizeStyles = (size: ButtonProps['size']) => {
  switch (size) {
    case 'sm':
      return css`
        padding: ${(props) => props.theme.spacing.sm}
          ${(props) => props.theme.spacing.md};
        font-size: ${(props) => props.theme.fontSize.sm};
      `;
    case 'lg':
      return css`
        padding: ${(props) => props.theme.spacing.md}
          ${(props) => props.theme.spacing.xl};
        font-size: ${(props) => props.theme.fontSize.lg};
      `;
    default:
      return css`
        padding: ${(props) => props.theme.spacing.sm}
          ${(props) => props.theme.spacing.lg};
        font-size: ${(props) => props.theme.fontSize.base};
      `;
  }
};

const StyledButton = styled.button<{
  $variant?: ButtonProps['variant'];
  $size?: ButtonProps['size'];
  $fullWidth?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.spacing.sm};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  font-weight: ${(props) => props.theme.fontWeight.semibold};
  cursor: pointer;
  transition: all ${(props) => props.theme.transitions.base};
  white-space: nowrap;
  width: ${(props) => (props.$fullWidth ? '100%' : 'auto')};

  ${(props) => getVariantStyles(props.$variant || 'primary')}
  ${(props) => getSizeStyles(props.$size || 'md')}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid #8b5cf6;
    outline-offset: 2px;
  }
`;

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  ...props
}: ButtonProps) {
  return (
    <StyledButton $variant={variant} $size={size} $fullWidth={fullWidth} {...props}>
      {children}
    </StyledButton>
  );
}
