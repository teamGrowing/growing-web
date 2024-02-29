import PhotoContainer from 'pages/gallery/components/PhotoContainer/PhotoContainer';
import store from 'stores/RootStore';
import { useParams } from 'react-router-dom';
import { useAlbumPhotosList } from 'hooks/queries';
import { ErrorMessage, ResetButton } from 'components/common/fallback/Common';
import { MENT_COMMON } from 'constants/ments';
import { FallbackProps } from 'react-error-boundary';
import Skeleton from 'react-loading-skeleton';
import * as S from './PhotoSection.styled';

const PhotoSection = () => {
  const { aId } = useParams();
  const { data: photos } = useAlbumPhotosList({
    coupleId: store.userStore.user?.coupleId ?? '',
    albumId: aId ?? '',
  });

  return <PhotoContainer photoObjects={photos ?? []} />;
};

PhotoSection.Loading = () => {
  return (
    <>
      <S.SkeletonContainer>
        {new Array(50).fill(0).map(() => (
          // TODO key를 어떻게 줄 것인가
          <S.SkeletonWrapper>
            <Skeleton containerClassName="react-loading-wrapper" />
          </S.SkeletonWrapper>
        ))}
      </S.SkeletonContainer>
    </>
  );
};

PhotoSection.Error = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <S.ErrorWrapper>
      <ErrorMessage>예상치 못한 오류가 발생했습니다.</ErrorMessage>
      <ResetButton onClick={resetErrorBoundary}>
        {MENT_COMMON.RETRY}
      </ResetButton>
    </S.ErrorWrapper>
  );
};

export default PhotoSection;
