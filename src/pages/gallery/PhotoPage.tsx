import styled from 'styled-components';
import { useMemo, useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import FloatingButton from '../../components/pages/gallery/FloatingButton';
import PaddingContainer from '../../styles/common/layout';
import DataContext from './context';
import PhotoContainer from '../../components/pages/gallery/PhotoContainer';
import Icon from '../../components/common/Icon/Icon';
import GalleryTitle from '../../components/pages/gallery/GalleryTitle';
import {
  useCreatePhotosMutation,
  useDeletePhotosMutation,
  useGalleryList,
} from '../../hooks/queries/gallery.queries';
import store from '../../stores/RootStore';
import ToastMessage from '../../components/common/ToastMessage/ToastMessage';
import Modal from '../../components/common/Modal/Modal';

const Cancel = styled.div`
  font-family: 'PretendardRegular';
  font-size: 14px;
  line-height: 17px;
`;

function PhotoPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: photos } = useGalleryList({
    coupleId: store.userStore.user?.coupleId!,
  });
  const selectedPhotos = useRef<string[]>([]);
  const [selectingAvailable, setSelectingAvailable] = useState(false);
  const [onToast, setOnToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [onModal, setOnModal] = useState(false);
  const { mutateAsync: upLoadPhotosMutate } = useCreatePhotosMutation({
    coupleId: store.userStore.user?.coupleId!,
  });
  const { mutate: deletePhotosMutate } = useDeletePhotosMutation({
    coupleId: store.userStore.user?.coupleId!,
  });

  const addToList = (photoId: string) => {
    selectedPhotos.current.push(photoId);
  };
  const removeFromList = (photoId: string) => {
    const idx = selectedPhotos.current.findIndex((id) => id === photoId);
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
    };
  }, [selectingAvailable]);

  const clearList = () => {
    selectedPhotos.current = [];
    setSelectingAvailable(false);
  };

  const upLoadPhotos = (files: FileList) => {
    upLoadPhotosMutate(files, {
      onSuccess: () => {
        setToastMsg('업로드가 완료되었습니다.');
        setOnToast(true);
      },
    });
  };

  const deletePhotos = () => {
    deletePhotosMutate(selectedPhotos.current, {
      onSuccess: () => {
        setSelectingAvailable(false);
        setToastMsg('삭제가 완료되었습니다.');
        setOnToast(true);
      },
    });
  };

  const clickCheck = () => {
    setSelectingAvailable(true);
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
      <GalleryTitle
        title="PHOTO"
        top="0px"
        left="0px"
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
            setToastMsg('삭제할 사진을 선택해 주세요.');
            setOnToast(true);
            return;
          }
          setOnModal(true);
        }}
      />
      <PaddingContainer>
        <PhotoContainer photoObjects={photos ?? []} type="UPLOADED" />
        <FloatingButton onUpLoad={upLoadPhotos} />
      </PaddingContainer>
      {onModal && (
        <Modal
          onModal={onModal}
          setOnModal={setOnModal}
          description="삭제하시겠습니까?"
          mainActionLabel="확인"
          onMainAction={deletePhotos}
          subActionLabel="취소"
          onSubAction={() => {
            setOnModal(false);
          }}
        />
      )}
      {onToast && <ToastMessage setOnToast={setOnToast} message={toastMsg} />}
    </DataContext.Provider>
  );
}
export default observer(PhotoPage);
