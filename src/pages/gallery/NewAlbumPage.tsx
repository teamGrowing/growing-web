import { useRef, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import PhotoScroll from '../../components/pages/gallery/PhotoScroll';
import DataContext from './context';
import { useGalleryList } from '../../hooks/queries/gallery.queries';
import store from '../../stores/RootStore';
import { usePostAlbumsMutation } from '../../hooks/queries/album.queries';
import Modal from '../../components/common/Modal/AlbumModal';
import ToastMessage from '../../components/common/ToastMessage/ToastMessage';
import { AlbumFormValues } from '../../types/InputSchema';

function NewAlbumPage() {
  const navigate = useNavigate();
  const [onModal, setOnModal] = useState(false);
  const [onToast, setOnToast] = useState(false);
  const selectedPhotos = useRef<string[]>([]);
  const { data: photos } = useGalleryList({
    coupleId: store.userStore.user?.coupleId!,
  });
  const { mutate } = usePostAlbumsMutation({
    coupleId: store.userStore.user?.coupleId!,
  });

  const addToList = (photoId: string) => {
    selectedPhotos.current.push(photoId);
  };
  const removeFromList = (photoId: string) => {
    const idx = selectedPhotos.current.findIndex((id) => id === photoId);
    selectedPhotos.current.splice(idx, 1);
  };

  const ctxValue = useMemo(() => {
    return {
      selectingAvailable: true,
      addToList,
      removeFromList,
    };
  }, []);

  // TODO: 앨범이 만들어지는데 사진이 뭔가 이상함 해결해야함
  const makeAlbum = ({ albumTitle, albumSubTitle }: AlbumFormValues) => {
    mutate(
      {
        title: albumTitle,
        subTitle: albumSubTitle,
        imageIds: selectedPhotos.current,
      },
      {
        onSuccess: () => {
          setOnModal(false);
          navigate('/gallery/album', {
            state: {
              toast: {
                showToast: true,
                message: '앨범이 생성되었습니다.',
              },
            },
          });
        },
      }
    );
  };

  return (
    <DataContext.Provider value={ctxValue}>
      <PhotoScroll
        photos={photos ?? []}
        onAdd={() => setOnModal(true)}
        onCancel={() => {
          navigate(-1);
        }}
      />
      <Modal
        onModal={onModal}
        setOnModal={setOnModal}
        title="앨범 생성"
        mainActionLabel="확인"
        onMainAction={(formValue) => makeAlbum(formValue)}
        subActionLabel="취소"
        onSubAction={() => setOnModal(false)}
      />
      {onToast && (
        <ToastMessage
          message="앨범 생성이 완료되었습니다."
          setOnToast={setOnToast}
        />
      )}
    </DataContext.Provider>
  );
}

export default observer(NewAlbumPage);
