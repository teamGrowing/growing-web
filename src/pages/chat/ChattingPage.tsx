/* eslint-disable consistent-return */
import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import store from 'stores/RootStore';
import { plusMenuProps } from 'stores/ChatStore';
import { useChatData } from 'hooks/queries/chat.queries';
import useReactQuerySubscription from 'hooks/chat/useReactQuerySubscription';
import Icon from 'components/common/Icon/Icon';
import TopBar from 'components/common/TopBar/TopBar';
import ChatBallon from 'components/pages/chat/ChatBallon';
import InputChat from 'components/pages/chat/InputChat';
import SubMenu from 'components/pages/chat/SubMenu';
import ChatNotice from 'components/pages/chat/ChatNotice';
import { PLUS_MENU_HEIGHT } from 'constants/constants';

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
  const scrollTimeoutRef = useRef<NodeJS.Timer | null>(null);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  const {
    data: chats,
    fetchNextPage,
    isFetchingNextPage,
  } = useChatData({
    coupleId: userStore.user?.coupleId ?? '',
  });

  function scrollToBottom() {
    chatEndRef.current?.scrollIntoView();
    return Promise.resolve(1);
  }

  const { createChat } = useReactQuerySubscription({
    coupleId: userStore.user?.coupleId ?? '',
    userId: userStore.user?.id ?? '',
    scrollToBottom,
  });

  const scrollByPlusMenu = (isOpen: boolean) => {
    if (!chatsRef.current) return;

    if (
      !plusMenuProps.includes(chatStore.chatMode.mode) &&
      chatStore.chatMode.mode !== 'Chatting'
    ) {
      return;
    }

    const SCROLL_PADDING = 5;
    const num = isOpen ? PLUS_MENU_HEIGHT : -PLUS_MENU_HEIGHT;

    const maxScrollTop =
      chatsRef.current.scrollHeight - chatsRef.current.clientHeight;

    const isAtBottom =
      chatsRef.current.scrollTop + SCROLL_PADDING >= maxScrollTop;

    const updateScrollPosition = () => {
      if (!chatsRef.current) return;

      if (isOpen || !isAtBottom) {
        chatsRef.current.scrollTop += num;
      } else {
        chatsRef.current.scrollTop = maxScrollTop;
      }
    };

    if (isAtBottom) {
      const timer = setTimeout(() => {
        scrollToBottom().then(() => {
          clearTimeout(timer);
        });
      }, 100);
    } else {
      updateScrollPosition();
    }
  };

  const handleDefaultMode = () => {
    scrollByPlusMenu(false);
    chatStore.clear();
  };

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
    if (!isFetchingNextPage) {
      const scrollHeight = chatsRef.current?.scrollHeight ?? 0;
      chatsRef.current?.scrollTo(0, scrollHeight - prevScrollHeight);
    }
  }, [isFetchingNextPage]);

  useEffect(() => {
    if (!chatStartRef.current) {
      return;
    }
    const chatObserver = new IntersectionObserver(
      ([entries]) => {
        if (entries.isIntersecting) {
          const scrollHeight = chatsRef.current?.scrollHeight ?? 0;
          setPrevScrollHeight(scrollHeight);
          fetchNextPage();
        }
      },
      {
        threshold: 0.1,
      }
    );
    // 채팅창 상단으로 이동시, 추가적인 데이터 요청
    chatObserver.observe(chatStartRef.current);

    return () => chatObserver.disconnect();
  }, []);

  const handleChange = () => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
      setIsScrolling(true);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      chatStore.setScrollHeight(chatsRef?.current?.scrollTop ?? null);
      setIsScrolling(false);
    }, 300);
  };

  useEffect(() => {
    setTimeout(() => {
      if (chatStore.scrollHeight != null) {
        chatsRef.current?.scrollTo(0, chatStore.scrollHeight);
      } else {
        scrollToBottom();
      }
    }, 100);
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
          chatStore.exitChatRoom();
        }}
        rightMainNode={
          <Icon icon={onSubMenu ? 'IconOpenEnvelope' : 'IconEnvelope'} />
        }
        onRightMainClick={() => setOnSubMenu(!onSubMenu)}
      />
      <ChatNotice />

      <Chats ref={chatsRef} onClick={handleDefaultMode} onScroll={handleChange}>
        <SubMenu open={onSubMenu} />
        <div ref={chatStartRef} style={{ height: '8px' }} />

        {chats?.pages
          .flatMap((x) => x)
          .map((chat, idx) => (
            <ChatBallon
              key={chat.parentChatting.id}
              isNewDay={getNewDay(idx)}
              isScrolling={isScrolling}
              {...chat}
            />
          ))}
        <div ref={chatEndRef} />

        <InputChat
          createChat={createChat}
          scrollByPlusMenu={scrollByPlusMenu}
        />
      </Chats>
    </ChattingPageContainer>
  );
}

export default observer(ChattingPage);
