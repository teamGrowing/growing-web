import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useQueryClient } from '@tanstack/react-query';
import store from 'stores/RootStore';
import Icon from 'components/common/Icon/Icon';
import {
  useChatNoticeData,
  useFoldNoticeMutate,
  useInvisibleNoticeMutate,
} from 'hooks/queries';
import queryKeys from 'constants/queryKeys';
import * as S from './ChatNotice.styled';

function ChatNotice() {
  const queryClient = useQueryClient();
  const navigation = useNavigate();
  const { userStore } = store;

  const [isToggle, setIsToggle] = useState<boolean>(false);

  const { data: notice } = useChatNoticeData({
    coupleId: userStore.user?.coupleId ?? '',
  });

  const { mutate: foldNotice } = useFoldNoticeMutate({
    coupleId: userStore.user?.coupleId ?? '',
    noticeId: notice?.id ?? '',
    options: {
      onSuccess: () => queryClient.invalidateQueries(queryKeys.chatKeys.notice),
    },
  });

  const { mutate: invisibleNotice } = useInvisibleNoticeMutate({
    coupleId: userStore.user?.coupleId ?? '',
    noticeId: notice?.id ?? '',
    options: {
      onSuccess: () => queryClient.invalidateQueries(queryKeys.chatKeys.notice),
    },
  });

  const handleClick = () => {
    navigation('/chat/notice');
  };

  if (!notice) {
    return null;
  }

  if (notice?.isFolden) {
    return (
      <S.FoldenContainer onClick={foldNotice}>
        <Icon icon="IconBell" size={18} />
      </S.FoldenContainer>
    );
  }

  return (
    <S.Container>
      <S.NoticeContainer onClick={handleClick}>
        <Icon icon="IconBell" />
        <S.Contents isToggle={isToggle}>
          <p>{notice.content}</p>
          <span>{notice.announcer} 등록</span>
        </S.Contents>
        <Icon
          icon={!isToggle ? 'IconArrowDown' : 'IconArrowUp'}
          onClick={(e) => {
            e.stopPropagation();
            setIsToggle(!isToggle);
          }}
        />
      </S.NoticeContainer>
      {isToggle && (
        <S.Buttons>
          <S.StyledButton onClick={invisibleNotice}>
            다시 열지 않음
          </S.StyledButton>
          <S.StyledButtonBorder onClick={foldNotice}>
            접어두기
          </S.StyledButtonBorder>
        </S.Buttons>
      )}
    </S.Container>
  );
}

export default observer(ChatNotice);
