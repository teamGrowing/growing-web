import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import AlbumRowContainer from '../../components/pages/gallery/AlbumRowContainer';
import FloatingButton from '../../components/pages/gallery/FloatingButton';
import PhotoContainer from '../../components/pages/gallery/PhotoContainer';
import AlbumDto from '../../types/gallery/Album.dto';
import PhotoDto from '../../types/gallery/Photo.dto';
import GalleryTitle from '../../components/pages/gallery/GalleryTitle';
import Icon from '../../components/common/Icon/Icon';

const Padding = styled.div`
  padding-top: 43px;
`;

function GalleryMainPage() {
  const navigate = useNavigate();
  const albums: AlbumDto[] = [];
  const photos: PhotoDto[] = [];

  return (
    <>
      <GalleryTitle
        title="ALBUM"
        top="0"
        left="0"
        plusBtn
        onPlusBtnClick={() => navigate('new-album')}
        rightNode={albums.length > 0 && <Icon icon="IconCheck" />}
      />
      <Padding>
        <AlbumRowContainer albums={albums} onClick={() => navigate('album')} />
      </Padding>
      <GalleryTitle
        title="PHOTO"
        top="219px"
        left="0px"
        rightNode={photos.length > 0 && <Icon icon="IconCheck" />}
      />
      <PhotoContainer photoObjects={photos} type="UPLOADED" />
      <FloatingButton />
    </>
  );
}

export default GalleryMainPage;
