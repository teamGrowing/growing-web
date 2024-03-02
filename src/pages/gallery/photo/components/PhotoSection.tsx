import PhotoContainer from 'pages/gallery/components/PhotoContainer/PhotoContainer';
import GalleryTitle from 'pages/gallery/components/GalleryTitle/GalleryTitle';
import Icon from 'components/common/Icon/Icon';
import store from 'stores/RootStore';
import { useDeletePhotosMutation, useInfiniteGalleryList } from 'hooks/queries';
import { useNavigate } from 'react-router-dom';
import { FallbackProps } from 'react-error-boundary';
import { MENT_GALLERY } from 'constants/ments';
import Skeleton from 'react-loading-skeleton';
import useToast from 'hooks/common/useToast';
import Modal from 'components/common/Modal/Modal';
import { useState } from 'react';
import { observer } from 'mobx-react';
import { BlockErrorFallback } from 'components/common/fallback/BlockErrorBoundary/BlockErrorFallback';
import * as S from './PhotoSection.styled';

interface Props {
  selectingAvailable: boolean;
  selectedPhotos: string[];
  setSelectingAvailable: React.Dispatch<boolean>;
  clearList: () => void;
}

const PhotoSection = ({
  selectingAvailable,
  selectedPhotos,
  setSelectingAvailable,
  clearList,
}: Props) => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [onModal, setOnModal] = useState(false);
  const { data: photos } = useInfiniteGalleryList({
    coupleId: store.userStore.user?.coupleId ?? '',
  });
  const { mutate: deletePhotosMutate } = useDeletePhotosMutation({
    coupleId: store.userStore.user?.coupleId ?? '',
    options: {
      useErrorBoundary: false,
    },
  });

  const clickCancel = () => {
    clearList();
    setSelectingAvailable(false);
  };

  const clickCheck = () => {
    setSelectingAvailable(true);
  };

  const deletePhotos = () => {
    deletePhotosMutate(selectedPhotos, {
      onError: () => {
        addToast(MENT_GALLERY.PHOTO_DELETE_FAIL);
      },
      onSuccess: () => {
        setSelectingAvailable(false);
        addToast(MENT_GALLERY.PHOTO_DELETE_SUCCESS);
      },
    });
    clearList();
  };

  return (
    <>
      <GalleryTitle
        title="PHOTO"
        backBtn
        onBackBtnClick={() => navigate('/gallery')}
        rightNode={
          !selectingAvailable ? (
            <Icon icon="IconCheck" />
          ) : (
            <S.Cancel className="text-gradient400">취소</S.Cancel>
          )
        }
        onRightClick={selectingAvailable ? clickCancel : clickCheck}
        rightSubNode={selectingAvailable && <Icon icon="IconTrash" />}
        onRightSubClick={() => {
          if (selectedPhotos.length <= 0) {
            addToast(MENT_GALLERY.PHOTO_DELETE_FAIL_NO_SELECTED);
            return;
          }
          setOnModal(true);
        }}
      />
      <S.FixedContainer className="hidden-scrollbar">
        <PhotoContainer
          photoObjects={photos?.pages.flatMap((res) => res) ?? []}
        />
      </S.FixedContainer>
      {onModal && (
        <Modal
          onModal={onModal}
          setOnModal={setOnModal}
          description={MENT_GALLERY.PHOTO_DELETE_CONFIRM}
          mainActionLabel="확인"
          onMainAction={deletePhotos}
          subActionLabel="취소"
          onSubAction={() => setOnModal(false)}
        />
      )}
    </>
  );
};

PhotoSection.Loading = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  return (
    <>
      <GalleryTitle
        title="PHOTO"
        backBtn
        onBackBtnClick={() => navigate('/gallery')}
      />
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
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();

  return (
    <>
      <GalleryTitle
        title="PHOTO"
        backBtn
        onBackBtnClick={() => navigate('/gallery')}
      />
      <S.ErrorContainer>
        <BlockErrorFallback.Common
          error={error}
          resetErrorBoundary={resetErrorBoundary}
        />
      </S.ErrorContainer>
    </>
  );
};

export default observer(PhotoSection);
