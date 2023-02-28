import { useRef, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import PhotoScroll from '../../components/pages/gallery/PhotoScroll';
import DataContext from './context';
import { useGalleryList } from '../../hooks/queries/gallery.queries';
import store from '../../stores/RootStore';
import { usePostAlbumsMutation } from '../../hooks/queries/album.queries';
import Modal from '../../components/common/Modal/AlbumModal';
import { AlbumFormValues } from '../../types/InputSchema';
import useToast from '../../hooks/common/useToast';

const Container = styled.div`
  position: relative;
`;

function NewAlbumPage() {
  const navigate = useNavigate();
  const [onModal, setOnModal] = useState(false);
  const selectedPhotos = useRef<string[]>([]);
  const { addToast } = useToast();

  const coupleId = store.userStore.user?.coupleId ?? '';

  const { data: photos } = useGalleryList({ coupleId });
  const { mutate: postAlbumMutate } = usePostAlbumsMutation({ coupleId });

  const ctxValue = useMemo(() => {
    return {
      selectingAvailable: true,
      addToList: (photoId: string) => {
        selectedPhotos.current.push(photoId);
      },
      removeFromList: (photoId: string) => {
        const idx = selectedPhotos.current.findIndex((id) => id === photoId);
        selectedPhotos.current.splice(idx, 1);
      },
    };
  }, []);

  const makeAlbum = ({ albumTitle, albumSubTitle }: AlbumFormValues) => {
    postAlbumMutate(
      {
        title: albumTitle,
        subTitle: albumSubTitle,
        imageIds: selectedPhotos.current,
      },
      {
        onSuccess: () => {
          setOnModal(false);
          addToast('앨범 생성이 완료되었습니다.');
          navigate('/gallery/album');
        },
      }
    );
  };

  return (
    <DataContext.Provider value={ctxValue}>
      <Container className="page-container">
        <PhotoScroll
          photos={photos ?? []}
          leftLabel="취소"
          rightLabel="추가"
          onRightClick={() => {
            if (selectedPhotos.current.length === 0) {
              addToast('앨범에 만들기 위한 사진을 선택해주세요.');
              return;
            }
            setOnModal(true);
          }}
          onLeftClick={() => navigate(-1)}
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
      </Container>
    </DataContext.Provider>
  );
}

export default observer(NewAlbumPage);
