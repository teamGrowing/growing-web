import styled from 'styled-components';
import PhotoDto from '../../../types/gallery/Photo.dto';

const Scrolls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: absolute;
  width: 100%;
  height: 100%;
  left: 0px;

  background: ${({ theme }) => theme.color.white};
`;

const Photo = styled.div<{ backgroundUrl: string }>`
  padding: 0px;

  width: 100%;
  height: 60%;

  background: url(${(props) => props.backgroundUrl});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  flex: none;
  order: 0;
  flex-grow: 0;
`;

const Video = styled.video`
  width: 100%;
  height: 60%;

  flex: none;
  order: 0;
  flex-grow: 0;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 6px;

  width: 100%;
  height: 40%;

  flex: none;
  order: 1;
`;

const Name = styled.div`
  width: 100%;

  font-family: 'PretendardMedium';
  font-size: 23px;
  line-height: 27px;
  text-align: center;

  background: ${({ theme }) => theme.color.gradient400};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  flex: none;
  order: 0;
  flex-grow: 0;
`;

const CreatedAt = styled.div`
  width: 100%;

  font-family: 'PretendardLight';
  font-size: 14px;
  line-height: 17px;

  text-align: center;

  background: ${({ theme }) => theme.color.gradient400};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  flex: none;
  order: 1;
  flex-grow: 0;
`;

type PhotoDetailProps = {
  photoInfo: PhotoDto;
};

function PhotoDetail({ photoInfo }: PhotoDetailProps) {
  const date = new Date(photoInfo.createdAt);

  return (
    <Scrolls>
      {photoInfo.type === 'photo' && <Photo backgroundUrl={photoInfo.urls} />}
      {photoInfo.type === 'video' && (
        <Video controls preload="metadata" src={`${photoInfo.urls}#t=0.5`}>
          <source src={photoInfo.urls} />
          <track
            src="captions_en.vtt"
            kind="captions"
            label="english_captions"
          />
        </Video>
      )}
      <Info>
        <Name>{photoInfo.name}</Name>
        <CreatedAt>{`${date.getFullYear()}/${
          date.getMonth() + 1
        }/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`}</CreatedAt>
      </Info>
    </Scrolls>
  );
}

export default PhotoDetail;
