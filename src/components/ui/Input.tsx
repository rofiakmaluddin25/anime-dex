'use client';

import styled from 'styled-components';
import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const InputWrapper = styled.div<{ $fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.xs};
  width: ${(props) => (props.$fullWidth ? '100%' : 'auto')};
`;

const Label = styled.label`
  font-size: ${(props) => props.theme.fontSize.sm};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  color: ${(props) => props.theme.colors.gray[300]};
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  position: absolute;
  left: ${(props) => props.theme.spacing.md};
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colors.gray[400]};
  pointer-events: none;
`;

const StyledInput = styled.input<{ $hasIcon?: boolean; $hasError?: boolean }>`
  width: 100%;
  padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
  padding-left: ${(props) =>
    props.$hasIcon ? props.theme.spacing['3xl'] : props.theme.spacing.md};
  background: ${(props) => props.theme.colors.gray[800]};
  border: 2px solid
    ${(props) =>
      props.$hasError ? props.theme.colors.danger : props.theme.colors.gray[700]};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  color: ${(props) => props.theme.colors.white};
  font-size: ${(props) => props.theme.fontSize.base};
  transition: all ${(props) => props.theme.transitions.base};

  &::placeholder {
    color: ${(props) => props.theme.colors.gray[500]};
  }

  &:focus {
    outline: none;
    border-color: ${(props) =>
      props.$hasError ? props.theme.colors.danger : '#8b5cf6'};
    background: ${(props) => props.theme.colors.gray[700]};
    box-shadow: 0 0 0 3px
      ${(props) =>
        props.$hasError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(139, 92, 246, 0.1)'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(:disabled):not(:focus) {
    border-color: ${(props) => props.theme.colors.gray[600]};
  }
`;

const ErrorText = styled.span`
  font-size: ${(props) => props.theme.fontSize.sm};
  color: ${(props) => props.theme.colors.danger};
  margin-top: ${(props) => props.theme.spacing.xs};
`;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, fullWidth = false, ...props }, ref) => {
    return (
      <InputWrapper $fullWidth={fullWidth}>
        {label && <Label>{label}</Label>}
        <InputContainer>
          {icon && <IconWrapper>{icon}</IconWrapper>}
          <StyledInput
            ref={ref}
            $hasIcon={!!icon}
            $hasError={!!error}
            {...props}
          />
        </InputContainer>
        {error && <ErrorText>{error}</ErrorText>}
      </InputWrapper>
    );
  }
);

Input.displayName = 'Input';

export default Input;
