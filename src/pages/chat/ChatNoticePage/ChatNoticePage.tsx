import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import Icon from 'components/common/Icon/Icon';
import TopBar from 'components/common/TopBar/TopBar';
import queryKeys from 'constants/queryKeys';
import { Notice } from 'types/chat/Notice';
import * as S from './ChatNoticePage.styled';

function ChatNoticePage() {
  const navigation = useNavigate();
  const queryClient = useQueryClient();

  const { data: notice } = queryClient.getQueryData(
    queryKeys.chatKeys.notice
  ) as AxiosResponse<Notice>;

  const handleBack = () => {
    navigation(-1);
  };

  return (
    <S.ChatNoticePageContainer className="page-container with-topbar">
      <TopBar
        title="공지사항"
        leftNode={<Icon icon="IconArrowLeft" />}
        onLeftClick={handleBack}
      />
      <S.Profile>
        <p className="text-gradient400">{notice.announcer}</p>
      </S.Profile>
      <S.ChatWrapper>{notice.content}</S.ChatWrapper>
    </S.ChatNoticePageContainer>
  );
}

export default ChatNoticePage;
