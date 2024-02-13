import { PropsWithChildren } from 'react';
import * as S from './WhiteContainer.styled';

type WhiteContainerProps = {
  top: string;
};

function WhiteContainer({
  children,
  top,
}: PropsWithChildren<WhiteContainerProps>) {
  return <S.Container top={top}>{children}</S.Container>;
}
export default WhiteContainer;
