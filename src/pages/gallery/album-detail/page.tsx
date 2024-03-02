import { useState, useMemo, useRef, Suspense } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import Modal from 'components/common/Modal/Modal';
import TopBar from 'components/common/TopBar/TopBar';
import Icon from 'components/common/Icon/Icon';
import {
  useDeletePhotosFromAlbumMutation,
  usePatchAlbumMutation,
  useDeletePhotosMutation,
} from 'hooks/queries';
import { MENT_GALLERY } from 'constants/ments';
import store from 'stores/RootStore';
import useToast from 'hooks/common/useToast';
import { TopbarInnerContainer } from 'components/layout/PageLayout/TopbarLayout';
import BlockErrorBoundary from 'components/common/fallback/BlockErrorBoundary/BlockErrorBoundary';
import DataContext from '../context';
import * as S from './page.styled';
import AlbumModal from '../components/AlbumModal/AlbumModal';
import FloatingButton from '../components/FloatingButton/FloatingButton';
import PhotoList from './components/PhotoList';

const AlbumDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToast } = useToast();
  const [selectingAvailable, setSelectingAvailable] = useState(false);
  const [onModal, setOnModal] = useState(false);
  const [onAlbumModal, setOnAlbumModal] = useState(false);
  const [onConfirmModal, setOnConfirmModal] = useState(false);
  const selectedPhotos = useRef<string[]>([]);
  const isDeleteOnlyFromAlbum = useRef<null | boolean>(null);
  const { aId } = useParams();

  const coupleId = store.userStore.user?.coupleId ?? '';
  const albumId = aId ?? '';

  const { mutate: deletePhotosFromAlbumMutate } =
    useDeletePhotosFromAlbumMutation({
      coupleId,
      albumId,
      options: {
        useErrorBoundary: false,
      },
    });

  const { mutate: deletePhotosMutate } = useDeletePhotosMutation({
    coupleId,
    options: {
      useErrorBoundary: false,
    },
  });

  const { mutate: modifyAlbumInfoMutate } = usePatchAlbumMutation({
    coupleId,
    albumId,
    options: {
      useErrorBoundary: false,
    },
  });

  const ctxValue = useMemo(() => {
    return {
      selectingAvailable,
      addToList: (album: string) => {
        selectedPhotos.current.push(album);
      },
      removeFromList: (album: string) => {
        const idx = selectedPhotos.current.findIndex((id) => id === album);
        selectedPhotos.current.splice(idx, 1);
        if (selectedPhotos.current.length === 0) setSelectingAvailable(true);
      },
      data: { title: location.state.title, subTitle: location.state.subTitle },
    };
  }, [selectingAvailable]);

  const clearList = () => {
    selectedPhotos.current = [];
    setSelectingAvailable(false);
  };
  const clickCheck = () => {
    setSelectingAvailable(true);
  };

  const deletePhotosFromAlbum = () => {
    deletePhotosFromAlbumMutate(selectedPhotos.current, {
      onSuccess: () => addToast(MENT_GALLERY.ALBUM_PHOTO_DELETE_SUCCESS),
      onError: () => addToast(MENT_GALLERY.PHOTO_DELETE_FAIL),
    });
    clearList();
    isDeleteOnlyFromAlbum.current = null;
  };

  const deletePhotos = () => {
    deletePhotosMutate(selectedPhotos.current, {
      onSuccess: () => addToast(MENT_GALLERY.PHOTO_DELETE_SUCCESS),
      onError: () => addToast(MENT_GALLERY.PHOTO_DELETE_FAIL),
    });
    clearList();
    isDeleteOnlyFromAlbum.current = null;
  };

  return (
    <DataContext.Provider value={ctxValue}>
      <TopbarInnerContainer className="hidden-scrollbar">
        <S.RootContainer>
          <TopBar
            title={location.state.title}
            subTitle={location.state.subTitle}
            leftNode={<Icon icon="IconArrowLeft" />}
            onLeftClick={() => navigate('/gallery/album')}
            rightMainNode={
              selectingAvailable ? (
                <S.Option>취소</S.Option>
              ) : (
                <Icon icon="IconPencil" />
              )
            }
            onRightMainClick={
              selectingAvailable ? clearList : () => setOnAlbumModal(true)
            }
            rightSubNode={
              selectingAvailable ? (
                <Icon icon="IconTrash" />
              ) : (
                <Icon icon="IconCheck" />
              )
            }
            onRightSubClick={
              selectingAvailable
                ? () => {
                    if (selectedPhotos.current.length <= 0) {
                      addToast(MENT_GALLERY.PHOTO_DELETE_FAIL_NO_SELECTED);
                      return;
                    }
                    setOnModal(true);
                  }
                : clickCheck
            }
          />
          <S.Container className="hidden-scrollbar">
            <BlockErrorBoundary fallbackComponent={PhotoList.Error}>
              <Suspense fallback={<PhotoList.Loading />}>
                <PhotoList />
              </Suspense>
            </BlockErrorBoundary>
          </S.Container>
          <FloatingButton />
          {onConfirmModal && (
            <Modal
              onModal={onConfirmModal}
              setOnModal={setOnConfirmModal}
              description={MENT_GALLERY.PHOTO_DELETE_CONFIRM}
              mainActionLabel="확인"
              onMainAction={() => {
                if (isDeleteOnlyFromAlbum.current) {
                  deletePhotosFromAlbum();
                  return;
                }
                deletePhotos();
              }}
              subActionLabel="취소"
            />
          )}
          {onModal && (
            <Modal
              onModal={onModal}
              setOnModal={setOnModal}
              description={MENT_GALLERY.ALBUM_CHOOSE_DELETE_OPTION}
              mainActionLabel="앨범에서 제거"
              onMainAction={() => {
                isDeleteOnlyFromAlbum.current = true;
                setOnConfirmModal(true);
              }}
              subActionLabel="영구 삭제"
              onSubAction={() => {
                isDeleteOnlyFromAlbum.current = false;
                setOnConfirmModal(true);
              }}
            />
          )}
          {onAlbumModal && (
            <AlbumModal
              onModal={onAlbumModal}
              setOnModal={setOnAlbumModal}
              title="앨범 이름 변경"
              mainActionLabel="확인"
              onMainAction={(data) => {
                modifyAlbumInfoMutate(
                  {
                    title: data.albumTitle,
                    subTitle: data.albumSubTitle,
                  },
                  {
                    onSuccess: () => {
                      addToast(MENT_GALLERY.ALBUM_MODIFY);
                      navigate(location.pathname, {
                        state: {
                          ...location.state,
                          title: data.albumTitle,
                          subTitle: data.albumSubTitle,
                        },
                        replace: true,
                      });
                    },
                    onError: () => addToast(MENT_GALLERY.ALBUM_MODIFY_FAIL),
                  }
                );
              }}
              subActionLabel="취소"
              onSubAction={() => {}}
            />
          )}
        </S.RootContainer>
      </TopbarInnerContainer>
    </DataContext.Provider>
  );
};
export default observer(AlbumDetailPage);
