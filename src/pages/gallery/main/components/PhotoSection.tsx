import PhotoContainer from 'pages/gallery/components/PhotoContainer/PhotoContainer';
import GalleryTitle from 'pages/gallery/components/GalleryTitle/GalleryTitle';
import Icon from 'components/common/Icon/Icon';
import store from 'stores/RootStore';
import { useInfiniteGalleryList } from 'hooks/queries';
import { useNavigate } from 'react-router-dom';
import { FallbackProps } from 'react-error-boundary';
import Skeleton from 'react-loading-skeleton';
import { BlockErrorFallback } from 'components/common/fallback/BlockErrorBoundary/BlockErrorFallback';
import * as S from './PhotoSection.styled';

const PhotoSection = () => {
  const navigate = useNavigate();
  const { data: photos } = useInfiniteGalleryList({
    coupleId: store.userStore.user?.coupleId ?? '',
  });

  return (
    <>
      <GalleryTitle
        title="PHOTO"
        rightNode={
          (photos?.pages[0] ?? []).length > 0 && <Icon icon="IconCheck" />
        }
        onRightClick={() =>
          navigate('photo', { state: { selectingAvailable: true } })
        }
      />
      <S.FixedContainer>
        <PhotoContainer
          photoObjects={photos?.pages.flatMap((res) => res) ?? []}
        />
      </S.FixedContainer>
    </>
  );
};

PhotoSection.Loading = () => {
  return (
    <>
      <GalleryTitle title="PHOTO" />
      <S.SkeletonContainer>
        {new Array(50).fill(null).map((_, i) => (
          <S.SkeletonWrapper key={i}>
            <Skeleton containerClassName="react-loading-wrapper" />
          </S.SkeletonWrapper>
        ))}
      </S.SkeletonContainer>
    </>
  );
};

PhotoSection.Error = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <>
      <GalleryTitle title="PHOTO" />
      <S.FixedContainer>
        <BlockErrorFallback.Common
          error={error}
          resetErrorBoundary={resetErrorBoundary}
          containerStyle={{ height: '100%' }}
        />
      </S.FixedContainer>
    </>
  );
};

export default PhotoSection;
