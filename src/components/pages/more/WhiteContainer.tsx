import { PropsWithChildren } from 'react';
import styled from 'styled-components';

const Container = styled.div<{ top: string }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 34px 40px;
  gap: 7px;

  position: absolute;
  width: 333px;
  height: calc(100% - ${(props) => props.top});
  left: 28px;
  top: ${(props) => props.top};

  background: ${({ theme }) => theme.color.white};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  border-radius: 20px 20px 0px 0px;
`;

type WhiteContainerProps = {
  top: string;
};

function WhiteContainer({
  children,
  top,
}: PropsWithChildren<WhiteContainerProps>) {
  return <Container top={top}>{children}</Container>;
}
export default WhiteContainer;
