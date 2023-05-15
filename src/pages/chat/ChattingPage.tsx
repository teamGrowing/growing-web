import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import store from 'stores/RootStore';
import { useChatData } from 'hooks/queries/chat.queries';
import useReactQuerySubscription from 'hooks/chat/useReactQuerySubscription';
import Icon from 'components/common/Icon/Icon';
import TopBar from 'components/common/TopBar/TopBar';
import ChatBallon from 'components/pages/chat/ChatBallon';
import InputChat from 'components/pages/chat/InputChat';
import SubMenu from 'components/pages/chat/SubMenu';
import ChatNotice from 'components/pages/chat/ChatNotice';

const ChattingPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  background-color: ${({ theme }) => theme.color.gray50};
`;

const Chats = styled.section`
  flex: 1;

  display: flex;
  flex-direction: column;

  padding: 0 16px;

  height: 100%;

  overflow-x: hidden;
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

  const scrollByMenu = (isOpen: boolean) => {
    if (!chatsRef.current) return;

    const num = isOpen ? 260 : -260;
    chatsRef.current.scrollTop += num;
  };

  const handleDefaultMode = () => {
    chatStore.clear();
    scrollByMenu(false);
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
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ChattingPageContainer
      className="page-container with-topbar"
      style={{ paddingBottom: '0' }}
    >
      <TopBar
        title="growing"
        leftNode={<Icon icon="IconArrowLeft" />}
        onLeftClick={() => {
          navigation('/');
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

        <InputChat createChat={createChat} scrollByMenu={scrollByMenu} />
      </Chats>
    </ChattingPageContainer>
  );
}

export default observer(ChattingPage);
