import Skeleton from 'react-loading-skeleton';
import { observer } from 'mobx-react';
import { FallbackProps } from 'react-error-boundary';
import { BlockErrorFallback } from 'components/common/fallback/BlockErrorBoundary/BlockErrorFallback';
import { useGalleryList } from 'hooks/queries';
import { Idtype } from 'pages/chat/hooks/usePhotos';
import store from 'stores/RootStore';
import * as S from './PlusMenuPhotoList.styled';
import VideoPlayBtn from '../../VideoPlayBtn/VideoPlayBtn';

interface Props {
  updateId: ({ id, isPhoto }: Idtype) => Promise<Number>;
  getSelected: (id: string) => boolean;
  getIndex: (id: string) => number;
}

const PlusMenuPhotoList = ({ updateId, getSelected, getIndex }: Props) => {
  const { userStore } = store;

  const { data: photos } = useGalleryList({
    coupleId: userStore.user?.coupleId ?? '',
  });

  return (
    <S.ViewAllPhotos>
      {photos?.map((photo) => (
        <S.PhotoContainer>
          <S.GridPhoto
            key={photo.i}
            url={photo.u}
            onClick={() => updateId({ id: photo.i, isPhoto: photo.t === null })}
            isSelected={getSelected(photo.i)}
          >
            <S.PhotoSelect isSelected={getSelected(photo.i)}>
              {getIndex(photo.i) === 0 ? '' : getIndex(photo.i)}
            </S.PhotoSelect>
            {photo.t && <VideoPlayBtn />}
          </S.GridPhoto>
        </S.PhotoContainer>
      ))}
    </S.ViewAllPhotos>
  );
};

PlusMenuPhotoList.Loading = () => {
  const skeletonItems = Array(5).fill(null);

  return (
    <S.ViewAllPhotos>
      {skeletonItems.map((_, idx) => (
        <S.SkeletonWrapper key={idx}>
          <S.SkeletonInnerWrapper>
            <Skeleton
              baseColor="rgba(252, 227, 138, 0.2)"
              highlightColor=" rgba(243, 129, 129, 0.2)"
            />
          </S.SkeletonInnerWrapper>
        </S.SkeletonWrapper>
      ))}
    </S.ViewAllPhotos>
  );
};

PlusMenuPhotoList.Error = (props: FallbackProps) => {
  return (
    <BlockErrorFallback.Common containerStyle={{ height: '100%' }} {...props} />
  );
};

export default observer(PlusMenuPhotoList);
