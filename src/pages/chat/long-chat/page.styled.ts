import styled from 'styled-components';
import {
  TopbarBackgroundContainer,
  TopbarInnerContainer,
} from 'components/layout/PageLayout/TopbarLayout';

export const LongChattingPageContainer = styled(TopbarBackgroundContainer)`
  background-color: ${({ theme }) => theme.color.gray50};
`;

export const ChatWrapper = styled(TopbarInnerContainer)`
  padding: 16px 32px;

  font-size: 16px;
  color: ${({ theme }) => theme.color.gray900};
`;
