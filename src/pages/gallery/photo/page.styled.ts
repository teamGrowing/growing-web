import {
  TopbarBackgroundContainer,
  TopbarInnerContainer,
} from 'components/layout/PageLayout/TopbarLayout';
import styled from 'styled-components';

export const PageContainer = styled(TopbarBackgroundContainer)`
  padding-bottom: var(--navbar-real-height);
`;

export const Cancel = styled.div`
  height: 100%;

  font-family: 'PretendardRegular';
  font-size: 14px;
  line-height: 24px;
`;

export const PaddingContainer = styled(TopbarInnerContainer)`
  overflow-y: scroll;

  background: ${({ theme }) => theme.color.background};
  padding: 16px 0 50px;
`;
