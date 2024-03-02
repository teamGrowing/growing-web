import { PropsWithChildren } from 'react';
import * as S from './WhiteContainer.styled';

type Props = {
  top: string;
};

const WhiteContainer = ({ children, top }: PropsWithChildren<Props>) => {
  return <S.Container top={top}>{children}</S.Container>;
};
export default WhiteContainer;
