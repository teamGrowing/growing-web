import { observer } from 'mobx-react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useQueryClient } from '@tanstack/react-query';
import store from 'stores/RootStore';
import queryKeys from 'libs/react-query/queryKeys';
import { MENT_CHAT } from 'constants/ments';
import {
  useNotifyChatMutate,
  useArchivedChatMutate,
  useOurChatDelete,
} from 'hooks/queries';
import useToast from 'hooks/common/useToast';
import Icon from 'components/common/Icon/Icon';
import * as S from './ChatContextMenu.styled';

interface ChatContextMenuProps {
  chatId: string;
  isMine: boolean;
  text: string | null;
  isTop: boolean;
}

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
    <S.Container
      isMine={isMine}
      isTop={isTop}
      onClick={(e) => e.stopPropagation()}
    >
      {/* <S.Item>
        <Icon icon="IconReply" size={16} />
        <p>답장</p>
      </S.Item> */}
      {!!text && (
        <CopyToClipboard
          text={text}
          onCopy={() => {
            addToast(MENT_CHAT.COPY);
          }}
        >
          <S.Item>
            <Icon icon="IconCopy" size={16} />
            <p>복사</p>
          </S.Item>
        </CopyToClipboard>
      )}
      {!!text && (
        <S.Item onClick={archiveChat}>
          <Icon icon="IconEnvelope" size={16} />
          <p>보관</p>
        </S.Item>
      )}
      {!!text && (
        <S.Item onClick={notifyChat}>
          <Icon icon="IconBell" size={16} />
          <p>공지</p>
        </S.Item>
      )}
      <S.Item lastItem onClick={() => deleteOurChat(chatId)}>
        <Icon icon="IconTrash" size={16} />
        <p>삭제</p>
      </S.Item>
    </S.Container>
  );
}

export default observer(ChatContextMenu);
