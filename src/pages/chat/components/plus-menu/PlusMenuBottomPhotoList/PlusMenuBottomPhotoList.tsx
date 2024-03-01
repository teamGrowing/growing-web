import { observer } from 'mobx-react';
import Skeleton from 'react-loading-skeleton';
import { FallbackProps } from 'react-error-boundary';
import { ErrorMessage, ResetButton } from 'components/common/fallback/Common';
import { MENT_COMMON } from 'constants/ments';
import { useGalleryList } from 'hooks/queries';
import store from 'stores/RootStore';
import { Idtype } from 'pages/chat/hooks/usePhotos';
import * as S from './PlusMenuBottomPhotoList.styled';
import VideoPlayBtn from '../../VideoPlayBtn/VideoPlayBtn';

interface Props {
  updateId: ({ id, isPhoto }: Idtype) => void;
  getSelected: (id: string) => boolean;
  getIndex: (id: string) => number;
}

const PlusMenuBottomPhotoList = ({
  updateId,
  getIndex,
  getSelected,
}: Props) => {
  const { userStore } = store;

  const { data: photos } = useGalleryList({
    coupleId: userStore.user?.coupleId ?? '',
  });

  return (
    <S.Photos>
      {photos?.map((photo) => (
        <S.Photo
          key={photo.i}
          url={photo.u}
          onClick={() => updateId({ id: photo.i, isPhoto: photo.t === null })}
          isSelected={getSelected(photo.i)}
        >
          <S.PhotoSelect isSelected={getSelected(photo.i)}>
            {getIndex(photo.i) === 0 ? '' : getIndex(photo.i)}
          </S.PhotoSelect>
          {photo.t && <VideoPlayBtn />}
        </S.Photo>
      ))}
    </S.Photos>
  );
};

PlusMenuBottomPhotoList.Loading = () => {
  return (
    <S.Photos>
      <Skeleton width={140} height={212} />
      <Skeleton width={140} height={212} />
      <Skeleton width={140} height={212} />
      <Skeleton width={140} height={212} />
    </S.Photos>
  );
};

PlusMenuBottomPhotoList.Error = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <S.ErrorContainer>
      <ErrorMessage>{MENT_COMMON.ERROR}</ErrorMessage>
      <ResetButton onClick={resetErrorBoundary}>
        {MENT_COMMON.RETRY}
      </ResetButton>
    </S.ErrorContainer>
  );
};

export default observer(PlusMenuBottomPhotoList);
