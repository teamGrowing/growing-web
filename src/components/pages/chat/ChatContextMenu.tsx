import React from 'react';
import { observer } from 'mobx-react';
import styled, { keyframes } from 'styled-components';
import { useQueryClient } from '@tanstack/react-query';
import store from '../../../stores/RootStore';
import Icon from '../../common/Icon/Icon';
import queryKeys from '../../../constants/queryKeys';
import { MENT_CHAT } from '../../../constants/ments';
import { useNotifyChatMutate } from '../../../hooks/queries/chat-notice.queries';
import { useArchivedChatMutate } from '../../../hooks/queries/chat-archived.queries';
import useToast from '../../../hooks/common/useToast';

interface ChatContextMenuProps {
  chatId: string;
  isMine: boolean;
  type: 'CONTENT' | 'IMAGE';
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

const Container = styled.div<{ isMine: boolean }>`
  z-index: 2;

  /* TODO: height에 따라 위치 수정 */
  position: absolute;
  top: calc(100% + 8px);
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

function ChatContextMenu({ chatId, isMine, type }: ChatContextMenuProps) {
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

  return (
    <Container isMine={isMine}>
      <Item>
        <Icon icon="IconReply" size={16} />
        <p>답장</p>
      </Item>
      {type === 'CONTENT' && (
        <Item>
          <Icon icon="IconCopy" size={16} />
          <p>복사</p>
        </Item>
      )}
      {type === 'CONTENT' && (
        <Item onClick={archiveChat}>
          <Icon icon="IconEnvelope" size={16} />
          <p>보관</p>
        </Item>
      )}
      {type === 'CONTENT' && (
        <Item onClick={notifyChat}>
          <Icon icon="IconBell" size={16} />
          <p>공지</p>
        </Item>
      )}
      <Item lastItem>
        <Icon icon="IconTrash" size={16} />
        <p>삭제</p>
      </Item>
    </Container>
  );
}

export default observer(ChatContextMenu);
