import { useRef, useState } from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import store from 'stores/RootStore';
import { plusMenuProps } from 'stores/ChatStore';
import { useChatData } from 'hooks/queries';
import useReactQuerySubscription from 'pages/chat/hooks/useReactQuerySubscription';
import Icon from 'components/common/Icon/Icon';
import TopBar from 'components/common/TopBar/TopBar';
import ChatBallon from 'pages/chat/components/ChatBallon/ChatBallon';
import InputChat from 'pages/chat/components/InputChat/InputChat';
import SubMenu from 'pages/chat/components/SubMenu/SubMenu';
import ChatNotice from 'pages/chat/components/ChatNotice/ChatNotice';
import { PLUS_MENU_HEIGHT } from 'constants/constants';
import useScrollRestoration from 'pages/chat/hooks/useScrollRestoration';
import * as S from './ChattingPage.styled';
import useChatObserver from '../hooks/useChatObserver';

function ChattingPage() {
  const navigation = useNavigate();
  const { userStore, chatStore } = store;

  const chatStartRef = useRef<HTMLDivElement | null>(null);
  const chatsRef = useRef<HTMLDivElement | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const [onSubMenu, setOnSubMenu] = useState<boolean>(false);

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

  const { saveScrollPosition } = useScrollRestoration(chatsRef, chatEndRef);

  useChatObserver({
    chatStartRef,
    chatsRef,
    isFetchingNextPage,
    fetchNextPage,
  });

  return (
    <S.ChattingPageContainer
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

      <S.Chats
        ref={chatsRef}
        onClick={handleDefaultMode}
        onScroll={saveScrollPosition}
      >
        <SubMenu open={onSubMenu} />
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
    </S.ChattingPageContainer>
  );
}

export default observer(ChattingPage);
