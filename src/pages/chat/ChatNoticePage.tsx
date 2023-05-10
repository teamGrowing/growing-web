import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import Icon from 'components/common/Icon/Icon';
import TopBar from 'components/common/TopBar/TopBar';
import queryKeys from 'constants/queryKeys';
import { Notice } from 'types/chat/Notice';

const ChatNoticePageContainer = styled.div`
  background-color: ${({ theme }) => theme.color.gray50};
`;

const ChatWrapper = styled.div`
  padding: 16px 32px;

  font-size: 16px;
  color: ${({ theme }) => theme.color.gray900};
`;

const Profile = styled.div`
  display: flex;
  justify-content: center;

  margin: 0 32px;
  padding: 16px 0px;

  border-bottom: 1px solid ${({ theme }) => theme.color.gray200};

  > p {
    font-size: 14px;
  }
`;

function ChatNoticePage() {
  const navigation = useNavigate();
  const queryClient = useQueryClient();

  const { data: notice } = queryClient.getQueryData(
    queryKeys.chatKeys.notice
  ) as AxiosResponse<Notice>;

  const handleBack = () => {
    navigation(-1);
  };

  return (
    <ChatNoticePageContainer className="page-container with-topbar">
      <TopBar
        title="공지사항"
        leftNode={<Icon icon="IconArrowLeft" />}
        onLeftClick={handleBack}
      />
      <Profile>
        <p className="text-gradient400">{notice.announcer}</p>
      </Profile>
      <ChatWrapper>{notice.content}</ChatWrapper>
    </ChatNoticePageContainer>
  );
}

export default ChatNoticePage;
