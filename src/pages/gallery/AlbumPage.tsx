import styled from 'styled-components';
import { useRef, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/common/Icon/Icon';
import AlbumContainer from '../../components/pages/gallery/AlbumContainer';
import DataContext from './context';
import AlbumDto from '../../types/gallery/Album.dto';
import GalleryTitle from '../../components/pages/gallery/GalleryTitle';

const Padding = styled.div`
  padding-top: 43px;
`;

const Cancel = styled.div`
  font-family: 'PretendardRegular';
  font-size: 14px;
  line-height: 17px;
`;

function AlbumPage() {
  const navigate = useNavigate();
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
    // TODO selectedAlbums 삭제 요청 보내기
    setSelectingAvailable(false);
  };

  const clickCheck = () => {
    setSelectingAvailable(true);
  };

  return (
    <DataContext.Provider value={ctxValue}>
      <Padding>
        <GalleryTitle
          title="ALBUM"
          top="0px"
          left="0px"
          backBtn
          onBackBtnClick={() => navigate('/gallery')}
          rightNode={
            !selectingAvailable ? (
              <Icon icon="IconCheck" onClick={clickCheck} />
            ) : (
              <Cancel className="text-gradient400">취소</Cancel>
            )
          }
          onRightClick={
            selectingAvailable
              ? clearList
              : () => {
                  clickCheck();
                }
          }
          rightSubNode={selectingAvailable && <Icon icon="IconTrash" />}
          onRightSubClick={deletePhotos}
        />
      </Padding>
      <AlbumContainer albums={dummyAlbums} />
    </DataContext.Provider>
  );
}
export default AlbumPage;
