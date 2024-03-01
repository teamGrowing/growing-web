import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import TopBar from 'components/common/TopBar/TopBar';
import Icon from 'components/common/Icon/Icon';
import PhotoSwiper from './components/PhotoSwiper/PhotoSwiper';
import PhotoInfo from './components/PhotoInfo/PhotoInfo';
import * as S from './page.styled';

// TODO: 넘기면 다음 채팅 사진으로
function ChatPhotoDetailPage() {
  const { reset } = useQueryErrorResetBoundary();
  const navigation = useNavigate();

  return (
    <S.PageContainer>
      <ErrorBoundary
        fallback={
          <TopBar
            mode="DARK"
            border={false}
            leftNode={<Icon icon="IconArrowLeft" themeColor="gray50" />}
            onLeftClick={() => navigation(-1)}
          />
        }
      >
        <Suspense fallback={<PhotoInfo.Loading />}>
          <PhotoInfo />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary onReset={reset} FallbackComponent={PhotoSwiper.Error}>
        <Suspense fallback={<PhotoSwiper.Loading />}>
          <PhotoSwiper />
        </Suspense>
      </ErrorBoundary>
    </S.PageContainer>
  );
}

export default ChatPhotoDetailPage;
