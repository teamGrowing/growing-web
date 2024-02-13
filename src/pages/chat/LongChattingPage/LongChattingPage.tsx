import React from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/common/Icon/Icon';
import TopBar from 'components/common/TopBar/TopBar';
import store from 'stores/RootStore';
import * as S from './LongChattingPage.styled';

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
    <S.LongChattingPageContainer className="page-container with-topbar">
      <TopBar
        title="전체보기"
        leftNode={<Icon icon="IconArrowLeft" />}
        onLeftClick={handleBack}
        rightMainNode={<div>보관</div>}
        onRightMainClick={handleArchive}
      />
      <S.ChatWrapper>
        {chatStore.chatMode?.chat?.parentChatting.content ?? ''}
      </S.ChatWrapper>
    </S.LongChattingPageContainer>
  );
}

export default observer(LongChattingPage);
