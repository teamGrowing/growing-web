import styled from 'styled-components';
import {
  TopbarBackgroundContainer,
  TopbarInnerContainer,
} from 'components/layout/PageLayout/TopbarLayout';

export const ChatNoticePageContainer = styled(TopbarBackgroundContainer)`
  background: ${({ theme }) => theme.color.background};
`;

export const InnerContainer = styled(TopbarInnerContainer)``;

export const ChatWrapper = styled.div`
  padding: 16px 32px;

  font-size: 16px;
  color: ${({ theme }) => theme.color.gray900};
`;

export const Profile = styled.div`
  display: flex;
  justify-content: center;

  margin: 0 32px;
  padding: 16px 0px;

  border-bottom: 1px solid ${({ theme }) => theme.color.gray200};

  > p {
    font-size: 14px;
  }
`;
