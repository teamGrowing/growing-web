import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Suspense, useRef } from 'react';
import { useInfiniteGalleryList } from 'hooks/queries';
import PhotoContainer from 'pages/gallery/components/PhotoContainer/PhotoContainer';
import GalleryTitle from 'pages/gallery/components/GalleryTitle/GalleryTitle';
import Icon from 'components/common/Icon/Icon';
import store from 'stores/RootStore';
import { ErrorBoundary } from 'react-error-boundary';
import AlbumSection from './components/AlbumSection';
import * as S from './GalleryMainPage.styled';
import FloatingButtonWrapper from '../components/FloatingButton/FloatingButtonWrapper';

const GalleryMainPage = () => {
  const navigate = useNavigate();
  const touchPositionX = useRef<number | null>(null);
  const touchPositionY = useRef<number | null>(null);

  const coupleId = store.userStore.user?.coupleId ?? '';
  const { data: photos } = useInfiniteGalleryList({ coupleId });

  return (
    <S.Container
      className="hidden-scrollbar"
      onScroll={() => navigate('photo')}
    >
      <ErrorBoundary FallbackComponent={AlbumSection.Error}>
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
      </ErrorBoundary>
      <GalleryTitle
        title="PHOTO"
        rightNode={
          (photos?.pages[0] ?? []).length > 0 && <Icon icon="IconCheck" />
        }
        onRightClick={() =>
          navigate('photo', { state: { selectingAvailable: true } })
        }
      />
      <S.FixedContainer
        onTouchStart={(e) => {
          touchPositionY.current = e.touches[0].clientY;
        }}
        onTouchMove={(e) => {
          if (!touchPositionY.current) return;

          if (touchPositionY.current - e.touches[0].clientY > 10)
            navigate('photo');
        }}
      >
        <PhotoContainer
          photoObjects={photos?.pages.flatMap((res) => res) ?? []}
          type="UPLOADED"
        />
      </S.FixedContainer>
      <FloatingButtonWrapper />
    </S.Container>
  );
};

export default observer(GalleryMainPage);
