import { Suspense } from 'react';
import Icon from 'components/common/Icon/Icon';
import TopBar from 'components/common/TopBar/TopBar';
import { useNavigate } from 'react-router-dom';
import BlockErrorBoundary from 'components/common/fallback/BlockErrorBoundary/BlockErrorBoundary';
import NoticeContent from './components/NoticeContent';
import * as S from './page.styled';

const NoticeDetailPage = () => {
  const navigate = useNavigate();

  return (
    <S.Container>
      <TopBar
        title="공지사항"
        leftNode={<Icon icon="IconArrowLeft" />}
        onLeftClick={() => navigate(-1)}
      />
      <S.InnerContainer>
        <BlockErrorBoundary fallbackComponent={NoticeContent.Error}>
          <Suspense fallback={<NoticeContent.Loading />}>
            <NoticeContent />
          </Suspense>
        </BlockErrorBoundary>
      </S.InnerContainer>
    </S.Container>
  );
};

export default NoticeDetailPage;
