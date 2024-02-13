import { useRef, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import Icon from 'components/common/Icon/Icon';
import AlbumContainer from 'pages/gallery/components/AlbumContainer/AlbumContainer';
import GalleryTitle from 'pages/gallery/components/GalleryTitle/GalleryTitle';
import { useAlbumsList, useDeleteAlbumsMutation } from 'hooks/queries';
import store from 'stores/RootStore';
import Modal from 'components/common/Modal/Modal';
import useToast from 'hooks/common/useToast';
import { MENT_GALLERY } from 'constants/ments';
import DataContext from '../context';
import * as S from './AlbumPage.styled';

function AlbumPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToast } = useToast();
  const [selectingAvailable, setSelectingAvailable] = useState(
    location.state?.selectingAvailable ?? false
  );
  const [onModal, setOnModal] = useState(false);
  const selectedAlbums = useRef<string[]>([]);

  const coupleId = store.userStore.user?.coupleId ?? '';

  const { data: albums } = useAlbumsList({ coupleId });
  const { mutate: deleteAlbumsMutate } = useDeleteAlbumsMutation({ coupleId });

  const ctxValue = useMemo(() => {
    return {
      selectingAvailable,
      addToList: (albumId: string) => {
        selectedAlbums.current.push(albumId);
      },
      removeFromList: (albumId: string) => {
        const idx = selectedAlbums.current.findIndex((id) => id === albumId);
        selectedAlbums.current.splice(idx, 1);
        if (selectedAlbums.current.length === 0) {
          setSelectingAvailable(true);
        }
      },
    };
  }, [selectingAvailable]);

  const clearList = () => {
    selectedAlbums.current = [];
    setSelectingAvailable(false);
  };

  const deleteAlbums = () => {
    deleteAlbumsMutate(selectedAlbums.current, {
      onSuccess: () => {
        setSelectingAvailable(false);
        addToast(MENT_GALLERY.ALBUM_DELETE_SUCCESS);
      },
    });
  };

  return (
    <DataContext.Provider value={ctxValue}>
      <S.Container className="page-container with-navbar">
        <GalleryTitle
          title="ALBUM"
          backBtn
          onBackBtnClick={() => navigate('/gallery')}
          plusBtn={!selectingAvailable}
          onPlusBtnClick={() => navigate('/gallery/new-album')}
          rightNode={
            !selectingAvailable ? (
              <Icon icon="IconCheck" />
            ) : (
              <S.Cancel className="text-gradient400">취소</S.Cancel>
            )
          }
          onRightClick={
            selectingAvailable ? clearList : () => setSelectingAvailable(true)
          }
          rightSubNode={selectingAvailable && <Icon icon="IconTrash" />}
          onRightSubClick={() => {
            if (selectedAlbums.current.length <= 0) {
              addToast(MENT_GALLERY.ALBUM_DELETE_FAIL_NO_SELECTED);
              return;
            }
            setOnModal(true);
          }}
        />
        <S.ScrollArea className="hidden-scrollbar">
          <AlbumContainer albums={albums ?? []} />
        </S.ScrollArea>
        <Modal
          onModal={onModal}
          setOnModal={setOnModal}
          description={MENT_GALLERY.ALBUM_DELETE_CONFIRM}
          mainActionLabel="확인"
          onMainAction={deleteAlbums}
          subActionLabel="취소"
          onSubAction={() => {
            setOnModal(false);
          }}
        />
      </S.Container>
    </DataContext.Provider>
  );
}
export default observer(AlbumPage);
