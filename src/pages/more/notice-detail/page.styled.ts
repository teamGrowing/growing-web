import styled from 'styled-components';
import {
  TopbarBackgroundContainer,
  TopbarInnerContainer,
} from 'components/layout/PageLayout/TopbarLayout';

export const Container = styled(TopbarBackgroundContainer)`
  background: ${({ theme }) => theme.color.background};
`;

export const InnerContainer = styled(TopbarInnerContainer)`
  padding: 20px;
  height: 100%;
  gap: 10px;
`;
