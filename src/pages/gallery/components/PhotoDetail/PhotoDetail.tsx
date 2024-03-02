import Video from 'pages/chat/components/ChatVideo/ChatVideo';
import { useGalleryDetail } from 'hooks/queries';
import { useParams } from 'react-router-dom';
import store from 'stores/RootStore';
import Skeleton from 'react-loading-skeleton';
import { FallbackProps } from 'react-error-boundary';
import { BlockErrorFallback } from 'components/common/fallback/BlockErrorBoundary/BlockErrorFallback';
import * as S from './PhotoDetail.styled';

const PhotoDetail = () => {
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
};

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

PhotoDetail.Error = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <S.Scrolls>
      <BlockErrorFallback.Common
        error={error}
        resetErrorBoundary={resetErrorBoundary}
      />
    </S.Scrolls>
  );
};

export default PhotoDetail;
