/* eslint-disable react/no-unstable-nested-components */
import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from 'components/common/TopBar/TopBar';
import Icon from 'components/common/Icon/Icon';
import BlockErrorBoundary from 'components/common/fallback/BlockErrorBoundary/BlockErrorBoundary';
import PhotoSwiper from './components/PhotoSwiper/PhotoSwiper';
import PhotoInfo from './components/PhotoInfo/PhotoInfo';
import * as S from './page.styled';

// TODO: 넘기면 다음 채팅 사진으로
function ChatPhotoDetailPage() {
  const navigation = useNavigate();

  const ErrorTopbar = () => (
    <TopBar
      mode="DARK"
      border={false}
      leftNode={<Icon icon="IconArrowLeft" themeColor="gray50" />}
      onLeftClick={() => navigation(-1)}
    />
  );

  return (
    <S.PageContainer>
      <BlockErrorBoundary fallbackComponent={ErrorTopbar}>
        <Suspense fallback={<PhotoInfo.Loading />}>
          <PhotoInfo />
        </Suspense>
      </BlockErrorBoundary>

      <BlockErrorBoundary fallbackComponent={PhotoSwiper.Error}>
        <Suspense fallback={<PhotoSwiper.Loading />}>
          <PhotoSwiper />
        </Suspense>
      </BlockErrorBoundary>
    </S.PageContainer>
  );
}

export default ChatPhotoDetailPage;
