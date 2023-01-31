import styled from 'styled-components';
import PhotoDto from '../../../types/gallery/Photo.dto';

const Scrolls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 48px;

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
  background-size: cover;

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
  height: calc(40% - 81px);

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

const Date = styled.div`
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
  return (
    <Scrolls>
      <Photo backgroundUrl={photoInfo.urls} />
      <Info>
        <Name>{photoInfo.name}</Name>
        <Date>{photoInfo.createdAt}</Date>
      </Info>
    </Scrolls>
  );
}

export default PhotoDetail;
