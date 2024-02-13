/* eslint-disable no-extra-boolean-cast */
/* eslint-disable react/no-array-index-key */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import store from 'stores/RootStore';
import useLongPress from 'hooks/common/useLongPress';
import { ParentChildChattingDto } from 'models/chat';
import Icon from 'components/common/Icon/Icon';
import ChatContextMenu from '../ChatContextMenu/ChatContextMenu';
import VideoPlayBtn from '../VideoPlayBtn/VideoPlayBtn';
import * as S from './ChatBallon.styled';

interface ChatBallonProps extends ParentChildChattingDto {
  isNewDay: boolean;
  isScrolling: boolean;
}

function ChatBallon({
  parentChatting,
  childChatting,
  isScrolling,
  isNewDay,
}: ChatBallonProps) {
  const navigation = useNavigate();
  const { chatStore } = store;

  const ref = useRef<HTMLDivElement | null>(null);
  const [isTop, setIsTop] = useState<boolean>(false);

  const [isLongChat, setIsLongChat] = useState<boolean>(false);
  const [isImageChat, setIsImageChat] = useState<boolean>(false);
  const [isVideo, setIsVideo] = useState<boolean>(false);

  const showMenu = useCallback(() => {
    chatStore.setChatMode({
      mode: 'Context',
      chat: { parentChatting, childChatting },
    });
  }, []);

  const hideMenu = useCallback(() => {
    chatStore.clear();
  }, []);

  const longPressMenu = useLongPress(() => {
    setIsTop(
      (ref.current?.getBoundingClientRect().top ?? 0) < window.innerHeight / 2
    );
    showMenu();
  }, 400);

  const handleClick = (e: React.MouseEvent<HTMLElement | HTMLImageElement>) => {
    e.stopPropagation();

    if (chatStore.chatMode.mode === 'Context' || isScrolling) {
      hideMenu();
    } else if (isLongChat) {
      chatStore.setChatMode({
        mode: 'LongChat',
        chat: { parentChatting, childChatting },
      });
      navigation('/chat/all');
    } else if (isImageChat) {
      navigation(`/chat/photo-box/${parentChatting.id}`, {
        state: {
          idx: e.currentTarget.dataset.index ?? 0,
        },
      });
    } else if (isVideo) {
      navigation(`/chat/photo-box/${parentChatting.id}`);
    }
  };

  useEffect(() => {
    if (parentChatting.content) {
      setIsLongChat(parentChatting.content?.length > 350);
    } else if (parentChatting.imageUrls.length > 0) {
      setIsImageChat(true);
    } else if (!!parentChatting.videoUrls[0]) {
      setIsVideo(true);
    }
  }, [parentChatting]);

  return (
    <>
      {isNewDay && (
        <S.NewDay>
          {dayjs(parentChatting.createdAt).format('YYYY년 M월 D일')}
        </S.NewDay>
      )}
      <S.Container isMine={parentChatting.isMine!} ref={ref}>
        {parentChatting.isMine && (
          <S.DateWrapper>
            {dayjs(parentChatting.createdAt).format('H:mm')}
          </S.DateWrapper>
        )}

        {!parentChatting.isMine && (
          <S.ProfileImg src={parentChatting.Writer?.imageUrl} />
        )}

        {/* image */}
        {isImageChat &&
          (parentChatting.imageUrls.length === 1 ? (
            <S.OneChatImage
              {...longPressMenu}
              onClick={(e) => handleClick(e)}
              src={parentChatting.imageUrls[0]}
            />
          ) : (
            <S.ChatImageGrid>
              {parentChatting.imageUrls.map((imageUrl, idx) => (
                <S.ChatImage
                  key={idx}
                  {...longPressMenu}
                  onClick={(e) => handleClick(e)}
                  src={imageUrl}
                  data-index={idx}
                />
              ))}
            </S.ChatImageGrid>
          ))}

        {/* video */}
        {!!parentChatting.videoUrls[0] && (
          <S.VideoWrapper {...longPressMenu} onClick={(e) => handleClick(e)}>
            <S.OneChatImage src={parentChatting.videoUrls[0].thumbnailUrl} />
            <VideoPlayBtn style={{ zIndex: 1 }} />
          </S.VideoWrapper>
        )}

        {/* emoji */}
        {!!parentChatting.emojiUrl && (
          <S.OneChatImage
            {...longPressMenu}
            onClick={(e) => handleClick(e)}
            src={parentChatting.emojiUrl}
            style={{ width: '140px', height: '140px' }}
          />
        )}

        {/* 일반 채팅 */}
        {parentChatting.content && (
          <S.ChatWrapper isMine={parentChatting.isMine!}>
            {!isLongChat ? (
              <S.StyledP {...longPressMenu} onClick={(e) => handleClick(e)}>
                {parentChatting.content}
              </S.StyledP>
            ) : (
              <S.OverflowChat
                {...longPressMenu}
                onClick={(e) => handleClick(e)}
              >
                <p>{parentChatting.content?.slice(0, 350)}...</p>
                <S.ViewAllButton>
                  전체보기
                  <Icon icon="IconArrowRight" size={16} themeColor="gray600" />
                </S.ViewAllButton>
              </S.OverflowChat>
            )}
          </S.ChatWrapper>
        )}

        {!parentChatting.isMine && (
          <S.DateWrapper>
            {dayjs(parentChatting.createdAt).format('H:mm')}
          </S.DateWrapper>
        )}

        {chatStore.chatMode.mode === 'Context' &&
          chatStore.chatMode.chat?.parentChatting.id === parentChatting.id && (
            <ChatContextMenu
              chatId={parentChatting.id!}
              isMine={parentChatting.isMine!}
              text={parentChatting.content}
              isTop={isTop}
            />
          )}
      </S.Container>
    </>
  );
}

export default observer(ChatBallon);
