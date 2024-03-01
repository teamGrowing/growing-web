import { observer } from 'mobx-react';
import Skeleton from 'react-loading-skeleton';
import { FallbackProps } from 'react-error-boundary';
import store from 'stores/RootStore';
import { ErrorMessage, ResetButton } from 'components/common/fallback/Common';
import { useChatPhotoBoxData } from 'hooks/queries';
import { MENT_CHAT, MENT_COMMON } from 'constants/ments';
import Icon from 'components/common/Icon/Icon';
import VideoPlayBtn from 'pages/chat/components/VideoPlayBtn/VideoPlayBtn';
import { ChatPhotoLineDto } from 'models/chat';
import * as S from './PhotoList.styled';

interface Props {
  onPhotoClick: (photo: ChatPhotoLineDto) => void;
  getSelected: (id: string) => boolean;
  isSelectMode: boolean;
  getIndex: (id: string) => number;
}

const PhotoList = ({
  onPhotoClick,
  getSelected,
  isSelectMode,
  getIndex,
}: Props) => {
  const { userStore } = store;

  const { data: photos } = useChatPhotoBoxData({
    coupleId: userStore.user?.coupleId ?? '',
  });

  return (
    <S.ViewAllPhotos>
      {!photos ? (
        <S.EmptyCase className="text-gradient400">
          <Icon icon="IconLogo" size={60} />
          {MENT_CHAT.ARCHIVED_EMPTY}
        </S.EmptyCase>
      ) : (
        photos?.map((photo) => (
          <S.PhotoContainer key={photo.i}>
            <S.GridPhoto
              url={photo.u[0]}
              onClick={() => onPhotoClick(photo)}
              isSelected={getSelected(photo.i)}
            >
              {isSelectMode && (
                <S.PhotoSelect isSelected={getSelected(photo.i)}>
                  {getIndex(photo.i) === 0 ? '' : getIndex(photo.i)}
                </S.PhotoSelect>
              )}
              {photo.u.length > 1 && (
                <S.PhotoLengthLabel className="text-gradient400">
                  <Icon icon="IconGallery" size={13} />
                  {photo.u.length}
                </S.PhotoLengthLabel>
              )}
              {photo.t && <VideoPlayBtn />}
            </S.GridPhoto>
          </S.PhotoContainer>
        ))
      )}
    </S.ViewAllPhotos>
  );
};

PhotoList.Loading = () => {
  const skeletonItems = Array(5).fill(null);

  return (
    <S.ViewAllPhotos>
      {skeletonItems.map((_, idx) => (
        <S.SkeletonWrapper key={idx}>
          <S.SkeletonInnerWrapper>
            <Skeleton />
          </S.SkeletonInnerWrapper>
        </S.SkeletonWrapper>
      ))}
    </S.ViewAllPhotos>
  );
};

PhotoList.Error = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <S.ErrorContainer>
      <ErrorMessage>{MENT_COMMON.ERROR}</ErrorMessage>
      <ResetButton onClick={resetErrorBoundary}>
        {MENT_COMMON.RETRY}
      </ResetButton>
    </S.ErrorContainer>
  );
};

export default observer(PhotoList);
