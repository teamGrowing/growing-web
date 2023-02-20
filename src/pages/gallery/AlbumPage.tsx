import styled from 'styled-components';
import { useRef, useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import Icon from '../../components/common/Icon/Icon';
import AlbumContainer from '../../components/pages/gallery/AlbumContainer';
import DataContext from './context';
import GalleryTitle from '../../components/pages/gallery/GalleryTitle';
import {
  useAlbumsList,
  useDeleteAlbumsMutation,
} from '../../hooks/queries/album.queries';
import store from '../../stores/RootStore';
import ToastMessage from '../../components/common/ToastMessage/ToastMessage';
import Modal from '../../components/common/Modal/Modal';

const Padding = styled.div`
  padding-top: 43px;
`;

const Cancel = styled.div`
  font-family: 'PretendardRegular';
  font-size: 14px;
  line-height: 17px;
`;

function AlbumPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectingAvailable, setSelectingAvailable] = useState(false);
  const [onToast, setOnToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
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
        setToastMsg('앨범 삭제가 완료되었습니다.');
        setOnToast(true);
      },
    });
  };

  useEffect(() => {
    if (location.state && location.state.toast) {
      setOnToast(true);
      setToastMsg(location.state.toast.message);
      window.history.replaceState(
        {
          ...location.state,
          toast: null,
        },
        ''
      );
    }
  }, []);

  return (
    <DataContext.Provider value={ctxValue}>
      <Padding>
        <GalleryTitle
          title="ALBUM"
          top="0px"
          left="0px"
          backBtn
          onBackBtnClick={() => navigate('/gallery')}
          plusBtn
          onPlusBtnClick={() => navigate('/gallery/new-album')}
          rightNode={
            !selectingAvailable ? (
              <Icon icon="IconCheck" />
            ) : (
              <Cancel className="text-gradient400">취소</Cancel>
            )
          }
          onRightClick={
            selectingAvailable ? clearList : () => setSelectingAvailable(true)
          }
          rightSubNode={selectingAvailable && <Icon icon="IconTrash" />}
          onRightSubClick={() => {
            if (selectedAlbums.current.length <= 0) {
              setToastMsg('삭제할 앨범을 선택해 주세요.');
              setOnToast(true);
              return;
            }
            setOnModal(true);
          }}
        />
      </Padding>
      <AlbumContainer albums={albums ?? []} />
      <Modal
        onModal={onModal}
        setOnModal={setOnModal}
        description="앨범을 삭제하시겠습니까?"
        mainActionLabel="확인"
        onMainAction={deleteAlbums}
        subActionLabel="취소"
        onSubAction={() => {
          setOnModal(false);
        }}
      />
      {onToast && <ToastMessage setOnToast={setOnToast} message={toastMsg} />}
    </DataContext.Provider>
  );
}
export default observer(AlbumPage);
