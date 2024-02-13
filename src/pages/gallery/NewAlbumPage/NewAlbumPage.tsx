import { useRef, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import PhotoScroll from 'components/pages/gallery/PhotoScroll';
import DataContext from '../context';
import {
  useInfiniteGalleryList,
  usePostAlbumsMutation,
} from '../../../hooks/queries';
import store from '../../../stores/RootStore';
import Modal from '../../../components/common/Modal/Album/AlbumModal';
import { AlbumFormValues } from '../../../types/InputSchema';
import useToast from '../../../hooks/common/useToast';
import { MENT_GALLERY } from '../../../constants/ments';
import * as S from './NewAlbumPage.styled';

function NewAlbumPage() {
  const navigate = useNavigate();
  const [onModal, setOnModal] = useState(false);
  const selectedPhotos = useRef<string[]>([]);
  const { addToast } = useToast();

  const coupleId = store.userStore.user?.coupleId ?? '';

  const { data: photos } = useInfiniteGalleryList({ coupleId });
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
          addToast(MENT_GALLERY.ALBUM_CREATE_SUCCESS);
          navigate('/gallery/album');
        },
      }
    );
  };

  return (
    <DataContext.Provider value={ctxValue}>
      <S.Container className="page-container">
        <PhotoScroll
          photos={photos?.pages.flatMap((res) => res) ?? []}
          leftLabel="취소"
          rightLabel="추가"
          onRightClick={() => {
            if (selectedPhotos.current.length === 0) {
              addToast(MENT_GALLERY.ALBUM_CREATE_FAIL_NO_SELECTED);
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
      </S.Container>
    </DataContext.Provider>
  );
}

export default observer(NewAlbumPage);
