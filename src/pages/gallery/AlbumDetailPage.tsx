import styled from 'styled-components';
import { useState, useMemo, useRef, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import PhotoContainer from '../../components/pages/gallery/PhotoContainer';
import TopBar from '../../components/common/TopBar/TopBar';
import Icon from '../../components/common/Icon/Icon';
import PaddingContainer from '../../styles/common/layout';
import FloatingButton from '../../components/pages/gallery/FloatingButton';
import DataContext from './context';
import {
  useAlbumPhotosList,
  useDeletePhotosMutation,
  usePatchAlbumMutation,
} from '../../hooks/queries/album.queries';
import store from '../../stores/RootStore';
import Modal from '../../components/common/Modal/Modal';
import AlbumModal from '../../components/common/Modal/AlbumModal';
import ToastMessage from '../../components/common/ToastMessage/ToastMessage';

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
  const { id: params } = useParams();
  const [selectingAvailable, setSelectingAvailable] = useState(false);
  const [onToast, setOnToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [onModal, setOnModal] = useState(false);
  const [onAlbumModal, setOnAmbumModal] = useState(false);
  const { data: photos } = useAlbumPhotosList({
    coupleId: store.userStore.user?.coupleId!,
    albumId: params ?? '',
  });
  const { mutate: deletePhotosMutate } = useDeletePhotosMutation({
    coupleId: store.userStore.user?.coupleId!,
    albumId: params!,
  });
  const { mutate: modifyAlbumInfoMutate } = usePatchAlbumMutation({
    coupleId: store.userStore.user?.coupleId!,
    albumId: params ?? '',
  });

  const selectedPhotos = useRef<string[]>([]);

  const addToList = (albumId: string) => {
    selectedPhotos.current.push(albumId);
  };
  const removeFromList = (albumId: string) => {
    const idx = selectedPhotos.current.findIndex((id) => id === albumId);
    selectedPhotos.current.splice(idx, 1);
    if (selectedPhotos.current.length === 0) {
      setSelectingAvailable(true);
    }
  };
  const ctxValue = useMemo(() => {
    return {
      selectingAvailable,
      addToList,
      removeFromList,
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

  const deletePhotos = () => {
    deletePhotosMutate(selectedPhotos.current, {
      onSuccess: () => {
        setOnToast(true);
        setToastMsg('사진이 앨범에서 제거되었습니다.');
      },
    });
    clearList();
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
  }, [location]);

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
          selectingAvailable ? clearList : () => setOnAmbumModal(true)
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
                  setToastMsg('삭제할 파일을 선택해 주세요.');
                  setOnToast(true);
                  return;
                }
                setOnModal(true);
              }
            : clickCheck
        }
      />
      <PaddingContainer>
        <PhotoContainer photoObjects={photos ?? []} type="UPLOADED" />
      </PaddingContainer>
      <FloatingButton
        onUpLoad={() => {
          // TODO : 사진 업로드 기능 해결 후 사진 업로드 + 앨범에 추가되도록
        }}
      />
      {onModal && (
        <Modal
          onModal={onModal}
          setOnModal={setOnModal}
          description="해당 파일이 앨범에서만 제거됩니다. 제거하시겠습니까?"
          mainActionLabel="확인"
          onMainAction={deletePhotos}
          subActionLabel="취소"
          onSubAction={() => {
            setOnModal(false);
          }}
        />
      )}
      {onAlbumModal && (
        <AlbumModal
          onModal={onAlbumModal}
          setOnModal={setOnAmbumModal}
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
                  setToastMsg('앨범 이름이 변경되었습니다.');
                  setOnToast(true);
                  navigate(location.pathname, {
                    replace: true,
                    state: {
                      title: data.albumTitle,
                      subTitle: data.albumSubTitle,
                    },
                  });
                },
              }
            );
          }}
          subActionLabel="취소"
          onSubAction={() => {}}
        />
      )}
      {onToast && <ToastMessage setOnToast={setOnToast} message={toastMsg} />}
    </DataContext.Provider>
  );
}
export default observer(AlbumDetailPage);
