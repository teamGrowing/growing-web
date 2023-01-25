/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import TopBar from '../../components/common/TopBar/TopBar';
import AlbumRowContainer from '../../components/pages/gallery/AlbumRowContainer';
import FloatingButton from '../../components/pages/gallery/FloatingButton';
import PhotoContainer from '../../components/pages/gallery/PhotoContainer';
import PaddingContainer from '../../styles/common/layout';
import plusIcon from '../../assets/icons/albumPage/Plus.png';
import checkIcon from '../../assets/icons/albumPage/BarOptionCheck.png';
import AlbumDto from '../../types/gallery/Album.dto';
import PhotoDto from '../../types/gallery/Photo.dto';

const Bar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  height: 43px;
`;

const BarTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  left: 24px;

  font-family: 'PretendardMedium';
  font-size: 23px;

  background: ${({ theme }) => theme.color.gradient400};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Option = styled.div`
  position: absolute;
  right: 4px;
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function GalleryMainPage() {
  const navigate = useNavigate();
  const albums: AlbumDto[] = [];
  const photos: PhotoDto[] = [];

  return (
    <>
      <TopBar
        leftNode={
          <BarTitle>
            ALBUM
            <img src={plusIcon} alt="plus" />
          </BarTitle>
        }
        onLeftClick={() => {
          navigate('new-album');
        }}
        rightMainNode={albums.length > 0 && <img src={checkIcon} alt="check" />}
        border={false}
      />
      <PaddingContainer>
        <div
          onClick={() => {
            navigate('album');
          }}
        >
          <AlbumRowContainer albums={albums} />
        </div>
        <Bar>
          <BarTitle>PHOTO</BarTitle>
          {photos.length > 0 && (
            <Option>
              <img src={checkIcon} alt="check" />
            </Option>
          )}
        </Bar>
        <PhotoContainer photoObjects={photos} type="UPLOADED" />
        <FloatingButton />
      </PaddingContainer>
    </>
  );
}

export default GalleryMainPage;
