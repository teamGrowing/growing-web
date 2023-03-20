/* eslint-disable no-extra-boolean-cast */
/* eslint-disable react/no-array-index-key */
import React, { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import dayjs from 'dayjs';
import store from '../../../stores/RootStore';
import useLongPress from '../../../hooks/common/useLongPress';
import { ParentChildChattingDto } from '../../../types/chat/Chatting.dto';
import ChatContextMenu from './ChatContextMenu';
import Icon from '../../common/Icon/Icon';

const NewDay = styled.div`
  margin: 24px auto 13px;

  background: linear-gradient(
    130.11deg,
    rgba(113, 23, 234, 0.1) 7.3%,
    rgba(234, 96, 96, 0.1) 100%
  );
  border-radius: 100px;
  padding: 4px 10px;

  font-size: 14px;
  color: ${({ theme }) => theme.color.gray900};
`;

const Container = styled.div<{ isMine: boolean }>`
  position: relative;

  display: flex;
  justify-content: ${(props) => (props.isMine ? 'flex-end' : 'flex-start')};
  align-items: flex-end;
  gap: 8px;

  padding: 4px 0;
`;

const OneChatImage = styled.img`
  width: auto;
  height: auto;
  max-width: 50%;
  max-height: 200px;
  background-size: 50%;
  border-radius: 12px;
`;

const ChatImage = styled.img`
  width: 55px;
  height: 55px;

  border-radius: 6px;
`;

const ChatImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 55px;
  grid-gap: 2px;
  justify-items: center;
`;

const ProfileImg = styled.img`
  align-self: flex-start;

  width: 30px;
  height: 30px;

  background-color: ${({ theme }) => theme.color.gray400};
  border-radius: 10px;
`;

const DateWrapper = styled.div`
  font-family: 'PretendardLight';
  font-size: 12px;
  color: ${({ theme }) => theme.color.gray900};
`;

const ChatWrapper = styled.div<{ isMine: boolean }>`
  position: relative;

  padding: 10px;

  max-width: 270px;

  background: ${(props) =>
    !props.isMine
      ? `${props.theme.color.gray200}99`
      : 'linear-gradient(130.11deg, rgba(113, 23, 234, 0.1) 7.3%,  rgba(234, 96, 96, 0.1) 100%)'};
  border-radius: 8px;

  > p {
    white-space: normal;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 20;
    -webkit-box-orient: vertical;

    font-size: 14px;
    color: ${({ theme }) => theme.color.gray900};
  }
`;

const OverflowChat = styled.div`
  z-index: 1;
`;

const ViewAllButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 10px 4px 4px;

  font-family: 'PretendardLight';
  font-size: 12px;
  color: ${({ theme }) => theme.color.gray600};
`;

interface ChatBallonProps extends ParentChildChattingDto {
  isNewDay: boolean;
}

function ChatBallon({
  parentChatting,
  childChatting,
  isNewDay,
}: ChatBallonProps) {
  const navigation = useNavigate();
  const { chatStore } = store;

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

  const longPressMenu = useLongPress<HTMLDivElement | HTMLImageElement>(
    {
      onLongPress: () => {
        showMenu();
      },
      onClick: (e) => {
        if (chatStore.chatMode.mode === 'Context') {
          hideMenu();
        } else if (isLongChat) {
          // TODO: scroll시 이동 막기
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
      },
    },
    {
      delay: 400,
    }
  );

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
        <NewDay>
          {dayjs(parentChatting.createdAt).format('YYYY년 M월 D일')}
        </NewDay>
      )}
      <Container isMine={parentChatting.isMine!}>
        {parentChatting.isMine && (
          <DateWrapper>
            {dayjs(parentChatting.createdAt).format('H:mm')}
          </DateWrapper>
        )}

        {!parentChatting.isMine && (
          <ProfileImg src={parentChatting.Writer?.imageUrl} />
        )}

        {/* image */}
        {isImageChat &&
          (parentChatting.imageUrls.length === 1 ? (
            <OneChatImage
              {...longPressMenu}
              src={parentChatting.imageUrls[0]}
            />
          ) : (
            <ChatImageGrid>
              {parentChatting.imageUrls.map((imageUrl, idx) => (
                <ChatImage
                  key={idx}
                  {...longPressMenu}
                  src={imageUrl}
                  data-index={idx}
                />
              ))}
            </ChatImageGrid>
          ))}

        {/* video */}
        {/* TODO: video 재생 모양 */}
        {!!parentChatting.videoUrls[0] && (
          <OneChatImage
            {...longPressMenu}
            src={parentChatting.videoUrls[0].thumbnailUrl}
          />
        )}

        {/* emoji */}
        {!!parentChatting.emojiUrl && (
          <OneChatImage
            {...longPressMenu}
            src={parentChatting.emojiUrl}
            style={{ width: '140px', height: '140px' }}
          />
        )}

        {/* 일반 채팅 */}
        {parentChatting.content && (
          <ChatWrapper isMine={parentChatting.isMine!}>
            {!isLongChat ? (
              <p {...longPressMenu}>{parentChatting.content}</p>
            ) : (
              <OverflowChat {...longPressMenu}>
                <p>{parentChatting.content?.slice(0, 350)}...</p>
                <ViewAllButton>
                  전체보기
                  <Icon icon="IconArrowRight" size={16} themeColor="gray600" />
                </ViewAllButton>
              </OverflowChat>
            )}
          </ChatWrapper>
        )}

        {!parentChatting.isMine && (
          <DateWrapper>
            {dayjs(parentChatting.createdAt).format('H:mm')}
          </DateWrapper>
        )}

        {chatStore.chatMode.mode === 'Context' &&
          chatStore.chatMode.chat?.parentChatting.id === parentChatting.id && (
            <ChatContextMenu
              chatId={parentChatting.id!}
              isMine={parentChatting.isMine!}
              type={isImageChat ? 'IMAGE' : 'CONTENT'}
            />
          )}
      </Container>
    </>
  );
}

export default observer(ChatBallon);
