import styled from 'styled-components';
import { LayoutWithNavbar } from 'components/layout/common';

export const ChattingPageContainer = styled(LayoutWithNavbar)`
  display: flex;
  flex-direction: column;

  background-color: ${({ theme }) => theme.color.gray50};
`;

export const Chats = styled.section`
  flex: 1;

  display: flex;
  flex-direction: column;

  padding: 0 16px;

  height: 100%;

  overflow-x: hidden;
  overflow-y: scroll;
`;
