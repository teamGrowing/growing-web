import styled from 'styled-components';
import { TopbarInnerContainer } from 'components/layout/PageLayout/TopbarLayout';

export const Chats = styled(TopbarInnerContainer)`
  position: relative;

  padding: 0 16px 70px;
  overflow-x: hidden;
`;

export const ErrorContainer = styled(TopbarInnerContainer)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
