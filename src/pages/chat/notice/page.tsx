import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/common/Icon/Icon';
import TopBar from 'components/common/TopBar/TopBar';
import BlockErrorBoundary from 'components/common/fallback/BlockErrorBoundary/BlockErrorBoundary';
import * as S from './page.styled';
import NoticeContent from './components/NoticeContent/NoticeContent';

function ChatNoticePage() {
  const navigation = useNavigate();

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
        <BlockErrorBoundary fallbackComponent={NoticeContent.Error}>
          <Suspense fallback={<NoticeContent.Loading />}>
            <NoticeContent />
          </Suspense>
        </BlockErrorBoundary>
      </S.InnerContainer>
    </S.ChatNoticePageContainer>
  );
}

export default ChatNoticePage;
