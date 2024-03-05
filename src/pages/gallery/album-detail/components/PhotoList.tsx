import PhotoContainer from 'pages/gallery/components/PhotoContainer/PhotoContainer';
import store from 'stores/RootStore';
import { useParams } from 'react-router-dom';
import { useAlbumPhotosList } from 'hooks/queries';
import { FallbackProps } from 'react-error-boundary';
import Skeleton from 'react-loading-skeleton';
import { BlockErrorFallback } from 'components/common/fallback/BlockErrorBoundary/BlockErrorFallback';
import * as S from './PhotoList.styled';

const PhotoList = () => {
  const { aId } = useParams();
  const { data: photos } = useAlbumPhotosList({
    coupleId: store.userStore.user?.coupleId ?? '',
    albumId: aId ?? '',
  });

  return <PhotoContainer photoObjects={photos ?? []} />;
};

PhotoList.Loading = () => {
  return (
    <>
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

PhotoList.Error = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <BlockErrorFallback.Common
      error={error}
      resetErrorBoundary={resetErrorBoundary}
      containerStyle={{ height: '100%' }}
    />
  );
};

export default PhotoList;
