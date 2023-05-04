import styled from 'styled-components';
import { useState, useMemo, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import PhotoContainer from 'components/pages/gallery/PhotoContainer';
import TopBar from 'components/common/TopBar/TopBar';
import Icon from 'components/common/Icon/Icon';
import FloatingButton from 'components/pages/gallery/FloatingButton';
import {
  useAlbumPhotosList,
  useDeletePhotosMutation as useDeletePhotosFromAlbumMutation,
  usePatchAlbumMutation,
  usePostPhotosMutation,
} from 'hooks/queries/album.queries';
import {
  useDeletePhotosMutation,
  useCreatePhotosMutation,
} from 'hooks/queries/gallery.queries';
import store from 'stores/RootStore';
import Modal from 'components/common/Modal/Modal';
import AlbumModal from 'components/common/Modal/AlbumModal';
import useToast from 'hooks/common/useToast';
import BottomNavigation from 'components/layout/BottomNavigation';
import DataContext from './context';

const Container = styled.div`
  overflow-y: scroll;
`;

const Option = styled.div`
  width: 25px;
  height: 17px;

  font-family: 'PretendardMedium';
  font-size: 14px;
  line-height: 17px;

  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.color.gradient400};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

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

  const { mutateAsync: upLoadPhotos } = useCreatePhotosMutation({ coupleId });
  const { mutate: addPhotosToAlbumMutate } = usePostPhotosMutation({
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
      onSuccess: () => addToast('사진이 앨범에서 제거되었습니다.'),
    });
    clearList();
    isDeleteOnlyFromAlbum.current = null;
  };

  const deletePhotos = () => {
    deletePhotosMutate(selectedPhotos.current, {
      onSuccess: () => addToast('사진이 삭제되었습니다.'),
    });
    clearList();
    isDeleteOnlyFromAlbum.current = null;
  };

  const upLoadHandler = async (files: FileList) => {
    await upLoadPhotos(files, {
      onSuccess: async (data) => {
        const ids = [];
        for (let i = 0; i < data.length; i += 1) {
          // eslint-disable-next-line no-await-in-loop
          ids.push((await data[i]).photoId);
        }
        addPhotosToAlbumMutate({ imageIds: ids });
      },
    });
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
            <Option>취소</Option>
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
                  addToast('삭제할 파일을 선택해 주세요.');
                  return;
                }
                setOnModal(true);
              }
            : clickCheck
        }
      />
      <Container className="page-container with-topbar with-navbar hidden-scrollbar">
        <PhotoContainer photoObjects={photos ?? []} type="UPLOADED" />
        <FloatingButton onUpLoad={upLoadHandler} />
        {onModal && (
          <Modal
            onModal={onModal}
            setOnModal={setOnModal}
            description="해당 파일을 앨범에서 제거하시겠습니까, 영구 삭제하시겠습니까?"
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
            description="정말 삭제하시겠습니까?"
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
                    addToast('앨범 이름이 변경되었습니다.');
                    navigate(location.pathname);
                  },
                }
              );
            }}
            subActionLabel="취소"
            onSubAction={() => {}}
          />
        )}
      </Container>
      <BottomNavigation />
    </DataContext.Provider>
  );
}
export default observer(AlbumDetailPage);
