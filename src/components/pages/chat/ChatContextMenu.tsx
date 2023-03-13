import React from 'react';
import { observer } from 'mobx-react';
import styled, { keyframes } from 'styled-components';
import { useQueryClient } from '@tanstack/react-query';
import store from '../../../stores/RootStore';
import Icon from '../../common/Icon/Icon';
import queryKeys from '../../../constants/queryKeys';
import { useNotifyChatMutate } from '../../../hooks/queries/chat-notice.queries';

interface ChatContextMenuProps {
  chatId: string;
  isMine: boolean;
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

  position: absolute;
  top: calc(100% + 8px);
  ${(props) => (props.isMine ? 'right: 0;' : 'left: 0;')}

  display: flex;
  flex-direction: column;

  width: 150px;

  background-color: ${({ theme }) => theme.color.white};
  border-radius: 10px;
  box-shadow: 0px 1px 20px rgba(0, 0, 0, 0.25);

  animation: ${keyframe} 0.2s;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 10px 16px;

  border-bottom: 1px solid ${({ theme }) => theme.color.gray200};

  font-size: 14px;
  color: ${({ theme }) => theme.color.gray700};
`;

function ChatContextMenu({ chatId, isMine }: ChatContextMenuProps) {
  const queryClient = useQueryClient();
  const { userStore, chatStore } = store;

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
      <Item>
        <Icon icon="IconCopy" size={16} />
        <p>복사</p>
      </Item>
      <Item>
        <Icon icon="IconEnvelope" size={16} />
        <p>보관</p>
      </Item>
      <Item onClick={notifyChat}>
        <Icon icon="IconBell" size={16} />
        <p>공지</p>
      </Item>
      <Item>
        <Icon icon="IconTrash" size={16} />
        <p>삭제</p>
      </Item>
    </Container>
  );
}

export default observer(ChatContextMenu);
