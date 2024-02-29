import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import Icon from 'components/common/Icon/Icon';
import TopBar from 'components/common/TopBar/TopBar';
import queryKeys from 'libs/react-query/queryKeys';
import { Notice } from 'models/chat';
import * as S from './page.styled';

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
    <S.ChatNoticePageContainer>
      <TopBar
        title="공지사항"
        leftNode={<Icon icon="IconArrowLeft" />}
        onLeftClick={handleBack}
      />
      <S.InnerContainer>
        <S.Profile>
          <p className="text-gradient400">{notice.announcer}</p>
        </S.Profile>
        <S.ChatWrapper>{notice.content}</S.ChatWrapper>
      </S.InnerContainer>
    </S.ChatNoticePageContainer>
  );
}

export default ChatNoticePage;
