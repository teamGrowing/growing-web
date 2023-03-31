import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import store from '../../stores/RootStore';
import { useChatData } from '../../hooks/queries/chat.queries';
import useReactQuerySubscription from '../../hooks/chat/useReactQuerySubscription';
import Icon from '../../components/common/Icon/Icon';
import TopBar from '../../components/common/TopBar/TopBar';
import ChatBallon from '../../components/pages/chat/ChatBallon';
import InputChat from '../../components/pages/chat/InputChat';
import SubMenu from '../../components/pages/chat/SubMenu';
import ChatNotice from '../../components/pages/chat/ChatNotice';

const ChattingPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 24px);

  background-color: ${({ theme }) => theme.color.gray50};

  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
`;

const Chats = styled.section`
  flex: 1;

  display: flex;
  flex-direction: column;

  padding: 0 16px 8px;
  padding-bottom: calc(24px + constant(safe-area-inset-bottom));
  padding-bottom: calc(24px + env(safe-area-inset-bottom));

  height: 100%;

  overflow-y: scroll;
`;

// TODO: 마지막 데이터 받은 후, 더이상 요청하지 말기
function ChattingPage() {
  const navigation = useNavigate();
  const { userStore, chatStore } = store;

  const chatStartRef = useRef<HTMLDivElement | null>(null);
  const chatsRef = useRef<HTMLDivElement | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const [onSubMenu, setOnSubMenu] = useState<boolean>(false);
  const [prevScrollHeight, setPrevScrollHeight] = useState<number>(0);

  const { data: chats, fetchNextPage } = useChatData({
    coupleId: userStore.user?.coupleId ?? '',
  });

  const { createChat } = useReactQuerySubscription({
    coupleId: userStore.user?.coupleId ?? '',
    userId: userStore.user?.id ?? '',
  });

  const handleDefaultMode = () => {
    chatStore.clear();
  };

  function scrollToBottom() {
    chatEndRef.current?.scrollIntoView();
  }

  function loadMore() {
    fetchNextPage();
  }

  function getNewDay(idx: number) {
    if (idx === 0) {
      return true;
    }
    if (!chats) {
      return false;
    }
    return (
      new Date(
        chats?.pages.flatMap((x) => x)[idx].parentChatting.createdAt
      ).getDay() !==
      new Date(
        chats?.pages.flatMap((x) => x)[
          idx - 1 > 0 ? idx - 1 : 0
        ].parentChatting.createdAt
      ).getDay()
    );
  }

  useEffect(() => {
    // 무한스크롤시 스크롤 위치 고정
    const scrollHeight = chatsRef.current?.scrollHeight ?? 0;
    chatsRef.current?.scrollTo(0, scrollHeight - prevScrollHeight);
  }, [chats]);

  useEffect(() => {
    if (!chatStartRef.current) {
      return;
    }
    const chatObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const scrollHeight = chatsRef.current?.scrollHeight ?? 0;
          setPrevScrollHeight(scrollHeight);
          loadMore();
        }
      },
      {
        threshold: 0.1,
      }
    );
    chatObserver.observe(chatStartRef.current);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <ChattingPageContainer className="page-container with-topbar">
      <TopBar
        title="growing"
        leftNode={<Icon icon="IconArrowLeft" />}
        onLeftClick={() => {
          navigation(-1);
          chatStore.clear();
        }}
        rightMainNode={
          <Icon icon={onSubMenu ? 'IconOpenEnvelope' : 'IconEnvelope'} />
        }
        onRightMainClick={() => setOnSubMenu(!onSubMenu)}
      />
      <ChatNotice />

      <Chats ref={chatsRef} onClick={handleDefaultMode}>
        <SubMenu open={onSubMenu} />
        <div ref={chatStartRef} style={{ height: '8px' }} />

        {chats?.pages
          .flatMap((x) => x)
          .map((chat, idx) => (
            <ChatBallon
              key={chat.parentChatting.id}
              isNewDay={getNewDay(idx)}
              {...chat}
            />
          ))}

        <div ref={chatEndRef} />
      </Chats>

      <InputChat createChat={createChat} />
    </ChattingPageContainer>
  );
}

export default observer(ChattingPage);
