import { useState, useMemo, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import PhotoContainer from 'components/pages/gallery/PhotoContainer';
import TopBar from 'components/common/TopBar/TopBar';
import Icon from 'components/common/Icon/Icon';
import FloatingButton from 'components/pages/gallery/FloatingButton';
import {
  useAlbumPhotosList,
  useDeletePhotosFromAlbumMutation,
  usePatchAlbumMutation,
  useDeletePhotosMutation,
} from 'hooks/queries';
import { MENT_GALLERY } from 'constants/ments';
import store from 'stores/RootStore';
import Modal from 'components/common/Modal/Modal/Modal';
import AlbumModal from 'components/common/Modal/Album/AlbumModal';
import useToast from 'hooks/common/useToast';
import DataContext from '../context';
import * as S from './AlbumDetailPage.styled';

function AlbumDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToast } = useToast();
  const { aId } = useParams();
  const [selectingAvailable, setSelectingAvailable] = useState(false);
  const [onModal, setOnModal] = useState(false);
  const [onAlbumModal, setOnAlbumModal] = useState(false);
  const [onConfirmModal, setOnConfirmModal] = useState(false);
  const selectedPhotos = useRef<string[]>([]);
  const isDeleteOnlyFromAlbum = useRef<null | boolean>(null);

  const coupleId = store.userStore.user?.coupleId ?? '';
  const albumId = aId ?? '';

  const { data: photos } = useAlbumPhotosList({ coupleId, albumId });
  const { mutate: deletePhotosFromAlbumMutate } =
    useDeletePhotosFromAlbumMutation({
      coupleId,
      albumId,
    });
  const { mutate: deletePhotosMutate } = useDeletePhotosMutation({
    coupleId,
  });

  const { mutate: modifyAlbumInfoMutate } = usePatchAlbumMutation({
    coupleId,
    albumId,
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
    });
    clearList();
    isDeleteOnlyFromAlbum.current = null;
  };

  const deletePhotos = () => {
    deletePhotosMutate(selectedPhotos.current, {
      onSuccess: () => addToast(MENT_GALLERY.PHOTO_DELETE_SUCCESS),
    });
    clearList();
    isDeleteOnlyFromAlbum.current = null;
  };

  return (
    <DataContext.Provider value={ctxValue}>
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
      <S.Container className="page-container with-topbar with-navbar hidden-scrollbar">
        <PhotoContainer photoObjects={photos ?? []} type="UPLOADED" />
        <FloatingButton albumId={aId} />
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
            onSubAction={() => {}}
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
                }
              );
            }}
            subActionLabel="취소"
            onSubAction={() => {}}
          />
        )}
      </S.Container>
    </DataContext.Provider>
  );
}
export default observer(AlbumDetailPage);
