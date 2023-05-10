import styled from 'styled-components';
import Icon from 'components/common/Icon/Icon';
import { PhotoLineDto } from 'types/gallery/PhotoLine.dto';
import Photo from './Photo';

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

const Logo = styled.div`
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
  photoObjects: PhotoLineDto[];
};

function PhotoRowContainer({ photoObjects }: PhotoRowContainerProps) {
  const photos = photoObjects.map((photo) => (
    <Photo photoInfo={photo} key={photo.i} />
  ));

  return <PhotosRow>{photos}</PhotosRow>;
}

type PhotoContainerProps = {
  type: 'UPLOADED' | 'UPLOAD';
  photoObjects: PhotoLineDto[];
};

function PhotoContainer({ photoObjects, type }: PhotoContainerProps) {
  const makeChunk = (data: PhotoLineDto[]) => {
    const arr = [];
    for (let i = 0; i < data.length; i += 3) {
      arr.push(data.slice(i, i + 3));
    }
    return arr;
  };

  const photoGroupArray = makeChunk(photoObjects);

  const components = photoGroupArray.map((group: PhotoLineDto[]) => (
    <PhotoRowContainer photoObjects={group} key={group[0].i} />
  ));

  return (
    <>
      {type === 'UPLOADED' && photoGroupArray.length === 0 && (
        <Container>
          <Logo>
            <Icon icon="IconLogo" size={60} />
          </Logo>
          <Message>사진을 업로드 해주세요!</Message>
        </Container>
      )}
      {photoGroupArray.length > 0 && <Container>{components}</Container>}
    </>
  );
}

export default PhotoContainer;
