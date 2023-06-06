import styled from 'styled-components';
import { useMemo, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import FloatingButton from 'components/pages/gallery/FloatingButton';
import PhotoContainer from 'components/pages/gallery/PhotoContainer';
import Icon from 'components/common/Icon/Icon';
import GalleryTitle from 'components/pages/gallery/GalleryTitle';
import {
  useDeletePhotosMutation,
  useInfiniteGalleryList,
} from 'hooks/queries/gallery.queries';
import store from '../../stores/RootStore';
import Modal from '../../components/common/Modal/Modal';
import useToast from '../../hooks/common/useToast';
import { MENT_GALLERY } from '../../constants/ments';
import DataContext from './context';

const Container = styled.div`
  position: relative;
`;

const Cancel = styled.div`
  height: 100%;

  font-family: 'PretendardRegular';
  font-size: 14px;
  line-height: 24px;
`;

const PaddingContainer = styled.div`
  position: absolute;
  top: calc(44px + constant(safe-area-inset-top) + 16px);
  top: calc(44px + env(safe-area-inset-top) + 16px);

  padding-bottom: calc(72px + constant(safe-area-inset-bottom));
  padding-bottom: calc(72px + env(safe-area-inset-bottom));

  width: 100%;
  max-width: 780px;
  height: calc(100vh - 52px - constant(safe-area-inset-top));
  height: calc(100vh - 52px - env(safe-area-inset-top));

  overflow-y: scroll;
`;

function PhotoPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToast } = useToast();
  const selectedPhotos = useRef<string[]>([]);
  const [selectingAvailable, setSelectingAvailable] = useState(
    location.state?.selectingAvailable ?? false
  );
  const [onModal, setOnModal] = useState(false);

  const coupleId = store.userStore.user?.coupleId ?? '';
  const { data: photos, fetchNextPage } = useInfiniteGalleryList({ coupleId });
  const { mutate: deletePhotosMutate } = useDeletePhotosMutation({
    coupleId,
  });

  const ctxValue = useMemo(() => {
    return {
      selectingAvailable,
      addToList: (photoId: string) => {
        selectedPhotos.current.push(photoId);
      },
      removeFromList: (photoId: string) => {
        const idx = selectedPhotos.current.findIndex((id) => id === photoId);
        selectedPhotos.current.splice(idx, 1);
        if (selectedPhotos.current.length === 0) {
          setSelectingAvailable(true);
        }
      },
    };
  }, [selectingAvailable]);

  const clearList = () => {
    selectedPhotos.current = [];
    setSelectingAvailable(false);
  };
  const clickCheck = () => setSelectingAvailable(true);

  const deletePhotos = () => {
    deletePhotosMutate(selectedPhotos.current, {
      onSuccess: () => {
        setSelectingAvailable(false);
        addToast(MENT_GALLERY.PHOTO_DELETE_SUCCESS);
      },
    });
  };

  return (
    <DataContext.Provider value={ctxValue}>
      <Container className="page-container with-navbar">
        <GalleryTitle
          title="PHOTO"
          backBtn
          onBackBtnClick={() => navigate('/gallery')}
          rightNode={
            !selectingAvailable ? (
              <Icon icon="IconCheck" />
            ) : (
              <Cancel className="text-gradient400">취소</Cancel>
            )
          }
          onRightClick={selectingAvailable ? clearList : clickCheck}
          rightSubNode={selectingAvailable && <Icon icon="IconTrash" />}
          onRightSubClick={() => {
            if (selectedPhotos.current.length <= 0) {
              addToast(MENT_GALLERY.PHOTO_DELETE_FAIL_NO_SELECTED);
              return;
            }
            setOnModal(true);
          }}
        />
        <PaddingContainer className="hidden-scrollbar">
          <PhotoContainer
            photoObjects={photos?.pages.flatMap((res) => res) ?? []}
            type="UPLOADED"
            fetchNextPage={fetchNextPage}
          />
        </PaddingContainer>
        <FloatingButton />
        {onModal && (
          <Modal
            onModal={onModal}
            setOnModal={setOnModal}
            description={MENT_GALLERY.PHOTO_DELETE_CONFIRM}
            mainActionLabel="확인"
            onMainAction={deletePhotos}
            subActionLabel="취소"
            onSubAction={() => {
              setOnModal(false);
            }}
          />
        )}
      </Container>
    </DataContext.Provider>
  );
}
export default observer(PhotoPage);
