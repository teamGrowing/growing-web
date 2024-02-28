import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/common/Icon/Icon';
import TopBar from 'components/common/TopBar/TopBar';
import store from 'stores/RootStore';
import { useArchivedChatMutate } from 'hooks/queries';
import { useQueryClient } from '@tanstack/react-query';
import queryKeys from 'libs/react-query/queryKeys';
import useToast from 'hooks/common/useToast';
import { MENT_CHAT } from 'constants/ments';
import * as S from './page.styled';

function LongChattingPage() {
  const navigation = useNavigate();
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  const { userStore, chatStore } = store;

  const { mutateAsync: archiveChat } = useArchivedChatMutate({
    coupleId: userStore.user?.coupleId ?? '',
    chattingId: chatStore.chatMode.chat?.parentChatting.id ?? '',
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.chatKeys.archived);
        addToast(MENT_CHAT.ARCHIVED_SUCCESS);
      },
    },
  });

  const handleBack = () => {
    navigation(-1);
    chatStore.setChatMode({
      mode: 'Default',
    });
  };

  return (
    <S.LongChattingPageContainer className="page-container with-topbar">
      <TopBar
        title="전체보기"
        leftNode={<Icon icon="IconArrowLeft" />}
        onLeftClick={handleBack}
        rightMainNode={<div>보관</div>}
        onRightMainClick={() => archiveChat({})}
      />
      <S.ChatWrapper>
        {chatStore.chatMode?.chat?.parentChatting.content ?? ''}
      </S.ChatWrapper>
    </S.LongChattingPageContainer>
  );
}

export default observer(LongChattingPage);
