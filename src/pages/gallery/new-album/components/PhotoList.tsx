import { useInfiniteGalleryList } from 'hooks/queries';
import PhotoContainer from 'pages/gallery/components/PhotoContainer/PhotoContainer';
import store from 'stores/RootStore';
import Skeleton from 'react-loading-skeleton';
import { FallbackProps } from 'react-error-boundary';
import { BlockErrorFallback } from 'components/common/fallback/BlockErrorBoundary/BlockErrorFallback';
import * as S from './PhotoList.styled';

const PhotoList = () => {
  const { data: photos, fetchNextPage } = useInfiniteGalleryList({
    coupleId: store.userStore.user?.coupleId ?? '',
  });
  return (
    <PhotoContainer
      photoObjects={photos?.pages.flatMap((res) => res) ?? []}
      fetchNextPage={fetchNextPage}
    />
  );
};

PhotoList.Loading = () => {
  return (
    <S.SkeletonContainer>
      {new Array(50).fill(null).map((_, i) => (
        <S.SkeletonWrapper key={i}>
          <Skeleton containerClassName="react-loading-wrapper" />
        </S.SkeletonWrapper>
      ))}
    </S.SkeletonContainer>
  );
};

PhotoList.Error = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <S.ErrorWrapper>
      <BlockErrorFallback.Common
        error={error}
        resetErrorBoundary={resetErrorBoundary}
      />
    </S.ErrorWrapper>
  );
};

export default PhotoList;
