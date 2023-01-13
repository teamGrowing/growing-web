import styled from 'styled-components';
import { useState, useMemo, useRef } from 'react';
import PhotoContainer from '../../components/pages/gallery/PhotoContainer';
import TopBar from '../../components/common/TopBar/TopBar';
import PhotoDto from '../../types/gallery/Photo.dto';
import PaddingContainer from '../../styles/common/layout';
import AlbumDto from '../../types/gallery/Album.dto';
import FloatingButton from '../../components/pages/gallery/FloatingButton';
import pencilIcon from '../../assets/icons/albumPage/Pencil.png';
import checkIcon from '../../assets/icons/albumPage/BarOptionCheck.png';
import DataContext from './context';
import arrowLeftIcon from '../../assets/icons/albumPage/ArrowLeft.png';
import trashIcon from '../../assets/icons/albumPage/Trash.png';

const Option = styled.div`
  width: 25px;
  height: 17px;

  font-family: 'PretendardMedium';
  font-size: 14px;
  line-height: 17px;

  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.color.gradient400};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

function AlbumDetailPage() {
  const albumInfo: AlbumDto = {
    id: '1',
    title: '1000일',
    subTitle: '2020-06-06',
    imageUrl: 'https://picsum.photos/id/237/200/300',
    createdAt: '2020-06-06',
  };
  const dummyPhotos: PhotoDto[] = [
    {
      id: '1',
      url: 'https://picsum.photos/id/237/200/300',
      createdAt: '2000',
      name: 'string',
    },
    {
      id: '2',
      url: 'https://picsum.photos/id/237/200/300',
      createdAt: '2000',
      name: 'string',
    },
    {
      id: '3',
      url: 'https://picsum.photos/id/237/200/300',
      createdAt: '2000',
      name: 'string',
    },
    {
      id: '4',
      url: 'https://picsum.photos/id/237/200/300',
      createdAt: '2000',
      name: 'string',
    },
    {
      id: '5',
      url: 'https://picsum.photos/id/237/200/300',
      createdAt: '2000',
      name: 'string',
    },
    {
      id: '6',
      url: 'https://picsum.photos/id/237/200/300',
      createdAt: '2000',
      name: 'string',
    },
    {
      id: '7',
      url: 'https://picsum.photos/id/237/200/300',
      createdAt: '2000',
      name: 'string',
    },
    {
      id: '8',
      url: 'https://picsum.photos/id/237/200/300',
      createdAt: '2000',
      name: 'string',
    },
    {
      id: '9',
      url: 'https://picsum.photos/id/237/200/300',
      createdAt: '2000',
      name: 'string',
    },
    {
      id: '10',
      url: 'https://picsum.photos/id/237/200/300',
      createdAt: '2000',
      name: 'string',
    },
  ];
  const selectedAlbums = useRef<string[]>([]);
  const [selectingAvailable, setSelectingAvailable] = useState(false);

  const addToList = (albumId: string) => {
    selectedAlbums.current.push(albumId);
  };
  const removeFromList = (albumId: string) => {
    const idx = selectedAlbums.current.findIndex((id) => id === albumId);
    selectedAlbums.current.splice(idx, 1);
    if (selectedAlbums.current.length === 0) {
      setSelectingAvailable(true);
    }
  };
  const ctxValue = useMemo(() => {
    return {
      selectingAvailable,
      addToList,
      removeFromList,
    };
  }, [selectingAvailable]);

  const clearList = () => {
    selectedAlbums.current = [];
    setSelectingAvailable(false);
  };
  const clickCheck = () => {
    setSelectingAvailable(true);
  };
  const modifyAlbumInfo = () => {
    // 모달 띄운 후 수정 요청 보내기
  };
  const deletePhotos = () => {
    // 삭제
    clearList();
  };

  return (
    <DataContext.Provider value={ctxValue}>
      <TopBar
        title={albumInfo.title}
        subTitle={albumInfo.subTitle}
        leftNode={<img src={arrowLeftIcon} alt="back" />}
        rightMainNode={
          selectingAvailable ? (
            <Option>취소</Option>
          ) : (
            <img src={pencilIcon} alt="modify" />
          )
        }
        onRightMainClick={selectingAvailable ? clearList : modifyAlbumInfo}
        rightSubNode={
          selectingAvailable ? (
            <img src={trashIcon} alt="trash" />
          ) : (
            <img src={checkIcon} alt="select" />
          )
        }
        onRightSubClick={selectingAvailable ? deletePhotos : clickCheck}
      />
      <PaddingContainer>
        <PhotoContainer photoObjects={dummyPhotos} type="UPLOADED" />
      </PaddingContainer>
      <FloatingButton />
    </DataContext.Provider>
  );
}
export default AlbumDetailPage;
