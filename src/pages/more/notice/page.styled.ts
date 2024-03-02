import {
  TopbarBackgroundContainer,
  TopbarInnerContainer,
} from 'components/layout/PageLayout/TopbarLayout';
import styled from 'styled-components';

export const Container = styled(TopbarBackgroundContainer)`
  background: ${({ theme }) => theme.color.background};
`;

export const InnerContainer = styled(TopbarInnerContainer)`
  padding-bottom: 50px;
`;

export const ListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;

  padding: 10px 20px;
`;
