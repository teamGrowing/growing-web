import Video from 'pages/chat/components/ChatVideo/ChatVideo';
import { useGalleryDetail } from 'hooks/queries';
import { useParams } from 'react-router-dom';
import store from 'stores/RootStore';
import Skeleton from 'react-loading-skeleton';
import { ErrorMessage, ResetButton } from 'components/common/fallback/Common';
import { FallbackProps } from 'react-error-boundary';
import { MENT_COMMON } from 'constants/ments';
import * as S from './PhotoDetail.styled';

function PhotoDetail() {
  const { pId } = useParams();
  const coupleId = store.userStore.user?.coupleId ?? '';
  const photoId = pId ?? '';
  const { data: photo } = useGalleryDetail({ coupleId, photoId });
  const date = new Date(photo ? photo.createdAt : '');

  if (!photo) return null;

  return (
    <S.Scrolls>
      {!photo.videoUrl && <S.Photo backgroundUrl={photo.urls} />}
      {photo.videoUrl && photo.time && (
        <Video
          id={photo.id}
          thumbnailUrl={photo.urls}
          time={photo.time}
          videoUrl={photo.videoUrl}
          height="60%"
        />
      )}
      <S.Info>
        <S.Name>{photo.name}</S.Name>
        <S.CreatedAt>{`${date.getFullYear()}/${
          date.getMonth() + 1
        }/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`}</S.CreatedAt>
      </S.Info>
    </S.Scrolls>
  );
}

PhotoDetail.Loading = () => {
  return (
    <S.Scrolls>
      <S.SkeletonWrapper>
        <Skeleton containerClassName="react-loading-wrapper" />
      </S.SkeletonWrapper>
      <S.Info>
        <Skeleton width={200} />
        <Skeleton width={150} />
      </S.Info>
    </S.Scrolls>
  );
};

PhotoDetail.Error = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <S.Scrolls>
      <ErrorMessage>예기치 못한 오류가 발생했습니다.</ErrorMessage>
      <ResetButton onClick={resetErrorBoundary}>
        {MENT_COMMON.RETRY}
      </ResetButton>
    </S.Scrolls>
  );
};

export default PhotoDetail;
