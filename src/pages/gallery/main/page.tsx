import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Suspense, useRef } from 'react';
import BlockErrorBoundary from 'components/common/fallback/BlockErrorBoundary/BlockErrorBoundary';
import PhotoSection from './components/PhotoSection';
import AlbumSection from './components/AlbumSection';
import * as S from './page.styled';
import FloatingButtonWrapper from '../components/FloatingButton/FloatingButtonWrapper';

const GalleryMainPage = () => {
  const navigate = useNavigate();
  const touchPositionX = useRef<number | null>(null);
  const touchPositionY = useRef<number | null>(null);

  return (
    <S.Container
      className="hidden-scrollbar"
      onWheel={() => navigate('photo')}
      onTouchStart={(e) => {
        touchPositionY.current = e.touches[0].clientY;
      }}
      onTouchMove={(e) => {
        if (!touchPositionY.current) return;

        if (touchPositionY.current - e.touches[0].clientY > 50)
          navigate('photo');
      }}
    >
      <BlockErrorBoundary fallbackComponent={AlbumSection.Error}>
        <Suspense fallback={<AlbumSection.Loading />}>
          <AlbumSection
            onTouchStart={(e) => {
              touchPositionX.current = e.touches[0].clientX;
            }}
            onTouchMove={(e) => {
              if (!touchPositionX.current) return;

              if (touchPositionX.current - e.touches[0].clientX > 200)
                navigate('album');
            }}
          />
        </Suspense>
      </BlockErrorBoundary>
      <BlockErrorBoundary fallbackComponent={PhotoSection.Error}>
        <Suspense fallback={<PhotoSection.Loading />}>
          <PhotoSection />
        </Suspense>
      </BlockErrorBoundary>
      <FloatingButtonWrapper />
    </S.Container>
  );
};

export default observer(GalleryMainPage);
