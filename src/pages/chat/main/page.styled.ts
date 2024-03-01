import styled from 'styled-components';
import {
  TopbarBackgroundContainer,
  TopbarInnerContainer,
} from 'components/layout/PageLayout/TopbarLayout';

export const ChattingPageContainer = styled(TopbarBackgroundContainer)`
  background-color: ${({ theme }) => theme.color.gray50};
`;

export const Chats = styled(TopbarInnerContainer)`
  position: relative;

  padding: 0 16px;
  overflow-x: hidden;
  padding-bottom: 70px;
`;
