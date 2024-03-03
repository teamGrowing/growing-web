import { useState, Suspense } from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import store from 'stores/RootStore';
import Icon from 'components/common/Icon/Icon';
import TopBar from 'components/common/TopBar/TopBar';
import BlockErrorBoundary from 'components/common/fallback/BlockErrorBoundary/BlockErrorBoundary';
import { ChatListLoading } from './components/ChatListSkeleton/ChatListSkeleton';
import ChatList from './components/ChatList/ChatList';
import * as S from './page.styled';

function ChattingPage() {
  const { chatStore } = store;
  const navigation = useNavigate();

  const [onSubMenu, setOnSubMenu] = useState<boolean>(false);

  return (
    <S.ChattingPageContainer>
      <TopBar
        title="growing"
        leftNode={<Icon icon="IconArrowLeft" />}
        onLeftClick={() => {
          navigation('/');
          chatStore.exitChatRoom();
        }}
        rightMainNode={
          <Icon icon={onSubMenu ? 'IconOpenEnvelope' : 'IconEnvelope'} />
        }
        onRightMainClick={() => setOnSubMenu(!onSubMenu)}
      />

      <BlockErrorBoundary fallbackComponent={ChatList.Error}>
        <Suspense fallback={<ChatListLoading />}>
          <ChatList onSubMenu={onSubMenu} />
        </Suspense>
      </BlockErrorBoundary>
    </S.ChattingPageContainer>
  );
}

export default observer(ChattingPage);
