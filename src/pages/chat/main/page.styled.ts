import styled from 'styled-components';
import {
  TopbarBackgroundContainer,
  TopbarInnerContainer,
} from 'components/layout/PageLayout/TopbarLayout';

export const ChattingPageContainer = styled(TopbarBackgroundContainer)`
  background-color: ${({ theme }) => theme.color.gray50};

  overflow: hidden;
`;

export const Chats = styled(TopbarInnerContainer)`
  position: relative;

  padding: 0 16px;

  height: 100%;

  overflow-x: hidden;
  overflow-y: scroll;
`;
