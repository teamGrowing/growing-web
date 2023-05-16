import React from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Icon from 'components/common/Icon/Icon';
import TopBar from 'components/common/TopBar/TopBar';
import store from 'stores/RootStore';

const LongChattingPageContainer = styled.div`
  background-color: ${({ theme }) => theme.color.gray50};
`;
const ChatWrapper = styled.div`
  padding: 16px 32px;

  font-size: 16px;
  color: ${({ theme }) => theme.color.gray900};
`;

function LongChattingPage() {
  const navigation = useNavigate();
  const { chatStore } = store;

  const handleBack = () => {
    navigation(-1);
    chatStore.setChatMode({
      mode: 'Default',
    });
  };

  const handleArchive = () => {
    // TODO
  };

  return (
    <LongChattingPageContainer className="page-container with-topbar">
      <TopBar
        title="전체보기"
        leftNode={<Icon icon="IconArrowLeft" />}
        onLeftClick={handleBack}
        rightMainNode={<div>보관</div>}
        onRightMainClick={handleArchive}
      />
      <ChatWrapper>
        {chatStore.chatMode?.chat?.parentChatting.content ?? ''}
      </ChatWrapper>
    </LongChattingPageContainer>
  );
}

export default observer(LongChattingPage);
