import { Suspense, useRef } from 'react';
import { observer } from 'mobx-react';
import { FallbackProps } from 'react-error-boundary';
import { BlockErrorFallback } from 'components/common/fallback/BlockErrorBoundary/BlockErrorFallback';
import BlockErrorBoundary from 'components/common/fallback/BlockErrorBoundary/BlockErrorBoundary';
import store from 'stores/RootStore';
import ChatBallon from 'pages/chat/components/ChatBallon/ChatBallon';
import useChatObserver from 'pages/chat/hooks/useChatObserver';
import { useChatData } from 'hooks/queries';
import { TopbarInnerContainer } from 'components/layout/PageLayout/TopbarLayout';
import ChatNotice from 'pages/chat/components/ChatNotice/ChatNotice';
import SubMenu from 'pages/chat/components/SubMenu/SubMenu';
import InputChat from 'pages/chat/components/InputChat/InputChat';
import useReactQuerySubscription from 'pages/chat/hooks/useReactQuerySubscription';
import { PLUS_MENU_HEIGHT } from 'constants/constants';
import useScrollRestoration from 'pages/chat/hooks/useScrollRestoration';
import { plusMenuProps } from 'stores/ChatStore';
import * as S from './ChatList.styled';
import { ChatListFetching } from '../ChatListSkeleton/ChatListSkeleton';

interface Props {
  onSubMenu: boolean;
}

const ChatList = ({ onSubMenu }: Props) => {
  const { userStore, chatStore } = store;

  const chatStartRef = useRef<HTMLDivElement | null>(null);
  const chatsRef = useRef<HTMLDivElement | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const {
    data: chats,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useChatData({
    coupleId: userStore.user?.coupleId ?? '',
  });

  function scrollToBottom() {
    // chatEndRef.current?.scrollIntoView();
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

  const getNewDay = (idx: number) => {
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
  };

  const { saveScrollPosition } = useScrollRestoration(chatsRef, chatEndRef);

  useChatObserver({
    chatStartRef,
    chatsRef,
    isFetchingNextPage,
    fetchNextPage,
  });

  return (
    <TopbarInnerContainer className="hidden-scrollbar">
      <BlockErrorBoundary fallbackComponent={() => null}>
        <Suspense>
          <ChatNotice />
        </Suspense>
      </BlockErrorBoundary>

      <Suspense>
        <SubMenu open={onSubMenu} />
      </Suspense>

      <S.Chats
        ref={chatsRef}
        onClick={handleDefaultMode}
        onScroll={saveScrollPosition}
      >
        {hasNextPage && <ChatListFetching />}
        <div ref={chatStartRef} style={{ height: '8px' }} />

        {chats?.pages
          .flatMap((x) => x)
          .map((chat, idx) => (
            <ChatBallon
              key={chat.parentChatting.id}
              isNewDay={getNewDay(idx)}
              // TODO
              isScrolling={false}
              {...chat}
            />
          ))}
        <div ref={chatEndRef} />
      </S.Chats>

      <InputChat createChat={createChat} scrollByPlusMenu={scrollByPlusMenu} />
    </TopbarInnerContainer>
  );
};

ChatList.Error = (props: FallbackProps) => {
  return (
    <BlockErrorFallback.Common containerStyle={{ height: '100%' }} {...props} />
  );
};

export default observer(ChatList);
