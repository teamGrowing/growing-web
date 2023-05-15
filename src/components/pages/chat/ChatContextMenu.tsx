import React from 'react';
import { observer } from 'mobx-react';
import styled, { keyframes } from 'styled-components';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useQueryClient } from '@tanstack/react-query';
import store from '../../../stores/RootStore';
import Icon from '../../common/Icon/Icon';
import queryKeys from '../../../constants/queryKeys';
import { MENT_CHAT } from '../../../constants/ments';
import { useNotifyChatMutate } from '../../../hooks/queries/chat-notice.queries';
import { useArchivedChatMutate } from '../../../hooks/queries/chat-archived.queries';
import { useOurChatDelete } from '../../../hooks/queries/chat.queries';
import useToast from '../../../hooks/common/useToast';

interface ChatContextMenuProps {
  chatId: string;
  isMine: boolean;
  text: string | null;
  isTop: boolean;
}

const keyframe = keyframes`
 from {
    opacity: 0;
    transform: scale3d(0.95, 0.95, 0.95);
  }
  to {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
`;

const Container = styled.div<{ isMine: boolean; isTop: boolean }>`
  z-index: 2;

  position: absolute;
  ${(props) =>
    props.isTop ? 'top: calc(100% + 8px);' : 'bottom: calc(100% + 8px);'}
  ${(props) => (props.isMine ? 'right: 0;' : 'left: 38px;')}

  display: flex;
  flex-direction: column;

  width: 150px;

  background-color: ${({ theme }) => theme.color.white};
  border-radius: 10px;
  box-shadow: 0px 1px 20px rgba(0, 0, 0, 0.25);

  animation: ${keyframe} 0.2s;
`;

const Item = styled.div<{ lastItem?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 10px 16px;

  border-bottom: ${(props) =>
    !props.lastItem ? `1px solid ${props.theme.color.gray200}` : ''};

  font-size: 14px;
  color: ${({ theme }) => theme.color.gray700};
`;

function ChatContextMenu({
  chatId,
  isMine,
  text,
  isTop,
}: ChatContextMenuProps) {
  const queryClient = useQueryClient();
  const { userStore, chatStore } = store;
  const { addToast } = useToast();

  const { mutate: archiveChat } = useArchivedChatMutate({
    coupleId: userStore.user?.coupleId ?? '',
    chattingId: chatId ?? '',
    options: {
      onSuccess: () => {
        chatStore.clear();
        queryClient.invalidateQueries(queryKeys.chatKeys.archived);
        addToast(MENT_CHAT.ARCHIVED_SUCCESS);
      },
    },
  });

  const { mutate: notifyChat } = useNotifyChatMutate({
    coupleId: userStore.user?.coupleId ?? '',
    chattingId: chatId ?? '',
    options: {
      onSuccess: () => {
        chatStore.clear();
        queryClient.invalidateQueries(queryKeys.chatKeys.notice);
      },
    },
  });

  const { mutateAsync: deleteOurChat } = useOurChatDelete({
    coupleId: userStore.user?.coupleId ?? '',
    options: {
      onSuccess: () => {
        addToast('삭제되었습니다');
        queryClient.invalidateQueries(queryKeys.chatKeys.all);
      },
    },
  });

  return (
    <Container
      isMine={isMine}
      isTop={isTop}
      onClick={(e) => e.stopPropagation()}
    >
      {/* <Item>
        <Icon icon="IconReply" size={16} />
        <p>답장</p>
      </Item> */}
      {!!text && (
        <CopyToClipboard
          text={text}
          onCopy={() => {
            addToast(MENT_CHAT.COPY);
          }}
        >
          <Item>
            <Icon icon="IconCopy" size={16} />
            <p>복사</p>
          </Item>
        </CopyToClipboard>
      )}
      {!!text && (
        <Item onClick={archiveChat}>
          <Icon icon="IconEnvelope" size={16} />
          <p>보관</p>
        </Item>
      )}
      {!!text && (
        <Item onClick={notifyChat}>
          <Icon icon="IconBell" size={16} />
          <p>공지</p>
        </Item>
      )}
      <Item lastItem onClick={() => deleteOurChat(chatId)}>
        <Icon icon="IconTrash" size={16} />
        <p>삭제</p>
      </Item>
    </Container>
  );
}

export default observer(ChatContextMenu);
