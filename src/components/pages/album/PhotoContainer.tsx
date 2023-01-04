import styled from 'styled-components';
import Photo from './Photo';
import logoIcon from '../../../assets/icons/albumPage/Logo.png';
import PhotoDto from '../../../types/gallery/Photo.dto';

const Container = styled.div`
  width: 100%;
  text-align: center;
`;

const PhotosRow = styled.div`
  display: flex;
  align-items: center;
  padding: 1px 14px;
  width: 100%;
`;

const Logo = styled.img`
  width: 60px;
  height: 60px;
  margin: 0 auto;
  margin-top: 124px;

  z-index: 1;
`;

const Message = styled.div`
  width: 100%;
  height: 62px;

  margin-top: 16px;

  font-family: 'PretendardMedium';
  font-size: 19px;
  line-height: 23px;

  text-align: center;

  background: ${({ theme }) => theme.color.gradient400};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  text-shadow: 0px 0px 8px rgba(151, 71, 255, 0.2);

  z-index: 0;
`;

type PhotoRowContainerProps = {
  photoObjects: PhotoDto[];
};

function PhotoRowContainer({ photoObjects }: PhotoRowContainerProps) {
  const photos = photoObjects.map((photo) => (
    <Photo PhotoInfo={photo} key={photo.id} />
  ));

  return <PhotosRow>{photos}</PhotosRow>;
}

type PhotoContainerProps = {
  type: 'UPLOADED' | 'UPLOAD';
  photoObjects: PhotoDto[];
};

function PhotoContainer({ photoObjects, type }: PhotoContainerProps) {
  const makeChunk = (data: PhotoDto[]) => {
    const arr = [];
    for (let i = 0; i < data.length; i += 3) {
      arr.push(data.slice(i, i + 3));
    }
    return arr;
  };

  const photoGroupArray = makeChunk(photoObjects);

  const components = photoGroupArray.map((group: PhotoDto[]) => (
    <PhotoRowContainer photoObjects={group} key={group[0].id} />
  ));

  return (
    <>
      {type === 'UPLOADED' && photoGroupArray.length === 0 && (
        <Container>
          <Logo src={logoIcon} />
          <Message>사진을 업로드 해주세요!</Message>
        </Container>
      )}
      {photoGroupArray.length > 0 && <Container>{components}</Container>}
    </>
  );
}

export default PhotoContainer;
