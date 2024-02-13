import { ButtonHTMLAttributes } from 'react';
import * as S from './LoginButton.styled';

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
    <S.StyledButton onClick={onClick} {...props}>
      <S.StyledText className="text-gradient400">{ment}</S.StyledText>
    </S.StyledButton>
  );
}
