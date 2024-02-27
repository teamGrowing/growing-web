import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Icon from 'components/common/Icon/Icon';
import TopBar from 'components/common/TopBar/TopBar';
import { useNavigate } from 'react-router-dom';
import NoticeContent from './components/NoticeContent';
import * as S from './NoticeDetailPage.styled';

function NoticeDetailPage() {
  const navigate = useNavigate();

  return (
    <S.Container>
      <TopBar
        title="공지사항"
        leftNode={<Icon icon="IconArrowLeft" />}
        onLeftClick={() => navigate(-1)}
      />
      <S.InnerContainer>
        <ErrorBoundary FallbackComponent={NoticeContent.Error}>
          <Suspense fallback={<NoticeContent.Loading />}>
            <NoticeContent />
          </Suspense>
        </ErrorBoundary>
      </S.InnerContainer>
    </S.Container>
  );
}

export default NoticeDetailPage;
