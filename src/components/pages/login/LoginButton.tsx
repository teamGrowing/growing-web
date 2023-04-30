import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  padding: 16px 0;

  width: 100%;
  max-width: 400px;
  background: ${({ theme }) => theme.color.white};
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;

  font-family: 'PretendardMedium';
  font-size: 16px;
`;

const StyledText = styled.p`
  font-size: 19;
  font-family: 'PretendardMedium';
`;

interface LoginButtonType extends ButtonHTMLAttributes<HTMLButtonElement> {
  ment: string;
  onClick?: () => void;
}

export default function LoginButton({
  ment,
  onClick,
  ...props
}: LoginButtonType) {
  return (
    <StyledButton onClick={onClick} {...props}>
      <StyledText className="text-gradient400">{ment}</StyledText>
    </StyledButton>
  );
}
