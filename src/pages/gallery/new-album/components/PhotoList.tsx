import { useInfiniteGalleryList } from 'hooks/queries';
import PhotoContainer from 'pages/gallery/components/PhotoContainer/PhotoContainer';
import store from 'stores/RootStore';
import Skeleton from 'react-loading-skeleton';
import { ErrorMessage, ResetButton } from 'components/common/fallback/Common';
import { MENT_COMMON } from 'constants/ments';
import { FallbackProps } from 'react-error-boundary';
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
      {new Array(50).fill(0).map(() => (
        // TODO key를 어떻게 줄 것인가
        <S.SkeletonWrapper>
          <Skeleton containerClassName="react-loading-wrapper" />
        </S.SkeletonWrapper>
      ))}
    </S.SkeletonContainer>
  );
};

PhotoList.Error = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <S.ErrorWrapper>
      <ErrorMessage>예상치 못한 오류가 발생했습니다.</ErrorMessage>
      <ResetButton onClick={resetErrorBoundary}>
        {MENT_COMMON.RETRY}
      </ResetButton>
    </S.ErrorWrapper>
  );
};

export default PhotoList;
