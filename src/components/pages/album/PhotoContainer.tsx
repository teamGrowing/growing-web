import styled from 'styled-components';
import Photo from './Photo';

const PhotosRow = styled.div`
  display: flex;
  align-items: center;
  padding: 1px 14px;
  width: 100%;
`;

type PhotoType = {
  id: string;
  url: string;
};

type PhotoRowContainerProps = {
  photoObjects: Array<PhotoType>;
};

function PhotoRowContainer({ photoObjects }: PhotoRowContainerProps) {
  const photos = photoObjects.map((photo) => (
    <Photo src={photo.url} key={photo.id} />
  ));

  return <PhotosRow>{photos}</PhotosRow>;
}

type PhotoContainerProps = {
  photoObjects: Array<PhotoType>;
};

function PhotoContainer({ photoObjects }: PhotoContainerProps) {
  const makeChunk = (data: Array<PhotoType>) => {
    const arr = [];
    for (let i = 0; i < data.length; i += 3) {
      arr.push(data.slice(i, i + 3));
    }
    return arr;
  };

  const photoGroupArray = makeChunk(photoObjects);
  const components = photoGroupArray.map((group: Array<PhotoType>) => (
    <PhotoRowContainer photoObjects={group} key={group[1].id} />
  ));

  return <div>{components}</div>;
}

export default PhotoContainer;
