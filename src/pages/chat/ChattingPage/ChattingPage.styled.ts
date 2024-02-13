import styled from 'styled-components';

export const ChattingPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

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
