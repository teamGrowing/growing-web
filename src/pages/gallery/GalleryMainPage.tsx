import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useState } from 'react';
import AlbumRowContainer from '../../components/pages/gallery/AlbumRowContainer';
import FloatingButton from '../../components/pages/gallery/FloatingButton';
import PhotoContainer from '../../components/pages/gallery/PhotoContainer';
import GalleryTitle from '../../components/pages/gallery/GalleryTitle';
import Icon from '../../components/common/Icon/Icon';
import {
  useCreatePhotosMutation,
  useGalleryList,
} from '../../hooks/queries/gallery.queries';
import { useAlbumsList } from '../../hooks/queries/album.queries';
import store from '../../stores/RootStore';
import ToastMessage from '../../components/common/ToastMessage/ToastMessage';

const Padding = styled.div`
  padding-top: 43px;
`;

const FixedContainer = styled.div`
  position: relative;
  height: calc(100vh - 43px - 176px - 81px);
  overflow: hidden;
`;

function GalleryMainPage() {
  const navigate = useNavigate();
  const [onToast, setOnToast] = useState(false);

  const coupleId = store.userStore.user?.coupleId ?? '';
  const { data: photos } = useGalleryList({ coupleId });
  const { data: albums } = useAlbumsList({ coupleId });
  const { mutate: upLoadPhotos } = useCreatePhotosMutation({ coupleId });

  const upLoadHandler = (files: FileList) => {
    upLoadPhotos(files, { onSuccess: () => setOnToast(true) });
  };

  return (
    <>
      <GalleryTitle
        title="ALBUM"
        top="0"
        left="0"
        plusBtn
        onPlusBtnClick={() => navigate('new-album')}
        rightNode={(albums ?? []).length > 0 && <Icon icon="IconCheck" />}
      />
      <Padding>
        <AlbumRowContainer
          albums={albums ?? []}
          onClick={() => navigate('album')}
        />
      </Padding>
      <FixedContainer onTouchMove={() => navigate('photo')}>
        <GalleryTitle
          title="PHOTO"
          top="219px"
          left="0px"
          rightNode={(photos ?? []).length > 0 && <Icon icon="IconCheck" />}
        />
        <Padding>
          <PhotoContainer photoObjects={photos ?? []} type="UPLOADED" />
        </Padding>
      </FixedContainer>
      <FloatingButton onUpLoad={upLoadHandler} />
      {onToast && (
        <ToastMessage
          setOnToast={setOnToast}
          message="사진이 업로드 되었습니다."
        />
      )}
    </>
  );
}

export default observer(GalleryMainPage);
