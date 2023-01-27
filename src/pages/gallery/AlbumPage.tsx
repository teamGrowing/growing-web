import styled from 'styled-components';
import { useRef, useState, useMemo } from 'react';
import TopBar from '../../components/common/TopBar/TopBar';
import Icon from '../../components/common/Icon/Icon';
import AlbumContainer from '../../components/pages/gallery/AlbumContainer';
import PaddingContainer from '../../styles/common/layout';
import DataContext from './context';
import AlbumDto from '../../types/gallery/Album.dto';

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

function AlbumPage() {
  const dummyAlbums: AlbumDto[] = [
    {
      id: '1',
      title: '1000일',
      subTitle: '2020-06-06',
      imageUrl: 'https://picsum.photos/id/237/200/300',
      createdAt: '2020-06-06',
    },
    {
      id: '2',
      title: '부산여행',
      subTitle: '2020-06-06',
      imageUrl: 'https://picsum.photos/id/237/200/300',
      createdAt: '2020-06-06',
    },
    {
      id: '3',
      title: '크리스마스',
      subTitle: '2020-12-30',
      imageUrl: 'https://picsum.photos/id/237/200/300',
      createdAt: '2020-06-06',
    },
    {
      id: '4',
      title: '1000일',
      subTitle: '2020-06-06',
      imageUrl: 'https://picsum.photos/id/237/200/300',
      createdAt: '2020-06-06',
    },
    {
      id: '23',
      title: '부산여행',
      subTitle: '2020-06-06',
      imageUrl: 'https://picsum.photos/id/237/200/300',
      createdAt: '2020-06-06',
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

  const deletePhotos = () => {
    // selectedAlbums 삭제 요청 보내기
    setSelectingAvailable(false);
  };

  const clickCheck = () => {
    setSelectingAvailable(true);
  };

  return (
    <DataContext.Provider value={ctxValue}>
      <TopBar
        leftNode={<BarTitle>ALBUM</BarTitle>}
        rightMainNode={
          !selectingAvailable ? (
            <Icon icon="IconCheck" />
          ) : (
            <Option>취소</Option>
          )
        }
        onRightMainClick={selectingAvailable ? clearList : clickCheck}
        rightSubNode={selectingAvailable && <Icon icon="IconTrash" />}
        onRightSubClick={deletePhotos}
        border={false}
      />
      <PaddingContainer>
        <AlbumContainer albums={dummyAlbums} />
      </PaddingContainer>
    </DataContext.Provider>
  );
}
export default AlbumPage;
