import styled from 'styled-components';
import {
  TopbarBackgroundContainer,
  TopbarInnerContainer,
} from 'components/layout/PageLayout/TopbarLayout';

export const PageContainer = styled(TopbarBackgroundContainer)`
  background: ${({ theme }) => theme.color.background};
`;

export const InnerContainer = styled(TopbarInnerContainer)`
  padding: 16px 16px 50px;
`;
