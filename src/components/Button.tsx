import React from 'react';
import styled from 'styled-components';

export interface ButtonProps {
  className?: string;
  hasLeftIcon?: boolean;
  hasRightIcon?: boolean;
  iconDisclosure?: string;
  hasFocusRing?: boolean;
  buttonText?: string;
  isLoading?: boolean;
  hasText?: boolean;
  iconSwap?: string;
  type?: 'primary' | 'secondary' | 'tertiary';
  state?: 'pressed' | 'default' | 'hover' | 'disabled';
  onClick?: () => void;
  disabled?: boolean;
}

const ButtonContainer = styled.button<{
  type: 'primary' | 'secondary' | 'tertiary';
  state: 'pressed' | 'default' | 'hover' | 'disabled';
  hasFocusRing: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 9999px;
  border: none;
  cursor: ${props => props.state === 'disabled' ? 'not-allowed' : 'pointer'};
  font-family: 'Lufthansa Text', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  transition: all 0.2s ease;
  position: relative;
  min-height: 40px;
  
  /* Focus ring */
  ${props => props.hasFocusRing && `
    &:focus {
      outline: 2px solid #435db2;
      outline-offset: 2px;
    }
  `}

  /* Primary button styles */
  ${props => props.type === 'primary' && `
    background-color: #435db2;
    color: #ffffff;
    
    ${props.state === 'hover' && `
      background-color: #4d6fc3;
    `}
    
    ${props.state === 'pressed' && `
      background-color: #344374;
    `}
    
    ${props.state === 'disabled' && `
      background-color: #edeef1;
      color: #b6bac3;
    `}
  `}

  /* Secondary button styles */
  ${props => props.type === 'secondary' && `
    background-color: transparent;
    color: #435db2;
    border: 1px solid #435db2;
    
    ${props.state === 'hover' && `
      background-color: #4d6fc3;
      border-color: #4d6fc3;
      color: #ffffff;
    `}
    
    ${props.state === 'pressed' && `
      background-color: #344374;
      border-color: #344374;
      color: #ffffff;
    `}
    
    ${props.state === 'disabled' && `
      background-color: transparent;
      border-color: #b6bac3;
      color: #b6bac3;
    `}
  `}

  /* Tertiary button styles */
  ${props => props.type === 'tertiary' && `
    background-color: transparent;
    color: #435db2;
    border: none;
    
    ${props.state === 'hover' && `
      background-color: #4d6fc3;
      color: #ffffff;
    `}
    
    ${props.state === 'pressed' && `
      background-color: #344374;
      color: #ffffff;
    `}
    
    ${props.state === 'disabled' && `
      background-color: transparent;
      color: #b6bac3;
    `}
  `}

  &:hover {
    ${props => props.state !== 'disabled' && props.state !== 'pressed' && `
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    `}
  }

  &:active {
    ${props => props.state !== 'disabled' && `
      transform: translateY(0);
    `}
  }
`;

const ButtonText = styled.p`
  margin: 0;
  font-family: 'Lufthansa Text', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  white-space: nowrap;
`;

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
`;

export const Button: React.FC<ButtonProps> = ({
  className,
  hasLeftIcon = false,
  hasRightIcon = false,
  iconDisclosure,
  hasFocusRing = false,
  buttonText = "Buy Now",
  isLoading = false,
  hasText = true,
  iconSwap,
  type = "primary",
  state = "default",
  onClick,
  disabled = false,
}) => {
  const currentState = disabled ? 'disabled' : state;
  
  const handleClick = () => {
    if (!disabled && !isLoading && onClick) {
      onClick();
    }
  };

  return (
    <ButtonContainer
      className={className}
      type={type}
      state={currentState}
      hasFocusRing={hasFocusRing}
      onClick={handleClick}
      disabled={disabled || isLoading}
      data-name={`type=${type}, state=${currentState}`}
    >
      {hasLeftIcon && (
        <IconContainer>
          {/* Add your left icon here */}
        </IconContainer>
      )}
      
      {isLoading && <LoadingSpinner />}
      
      {hasText && !isLoading && (
        <ButtonText>{buttonText}</ButtonText>
      )}
      
      {hasRightIcon && (
        <IconContainer>
          {/* Add your right icon here */}
        </IconContainer>
      )}
    </ButtonContainer>
  );
};

export default Button;
