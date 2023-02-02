import styled from 'styled-components';
import { useMemo, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingButton from '../../components/pages/gallery/FloatingButton';
import PaddingContainer from '../../styles/common/layout';
import DataContext from './context';
import PhotoContainer from '../../components/pages/gallery/PhotoContainer';
import PhotoDto from '../../types/gallery/Photo.dto';
import Icon from '../../components/common/Icon/Icon';
import GalleryTitle from '../../components/pages/gallery/GalleryTitle';

const Cancel = styled.div`
  font-family: 'PretendardRegular';
  font-size: 14px;
  line-height: 17px;
`;

function PhotoPage() {
  const navigate = useNavigate();
  const dummyPhotos: PhotoDto[] = [
    {
      id: '1',
      urls: 'https://picsum.photos/id/237/200/300',
      createdAt: '2000',
      name: 'string',
    },
    {
      id: '2',
      urls: 'https://picsum.photos/id/237/200/300',
      createdAt: '2000',
      name: 'string',
    },
    {
      id: '3',
      urls: 'https://picsum.photos/id/237/200/300',
      createdAt: '2000',
      name: 'string',
    },
    {
      id: '4',
      urls: 'https://picsum.photos/id/237/200/300',
      createdAt: '2000',
      name: 'string',
    },
    {
      id: '5',
      urls: 'https://picsum.photos/id/237/200/300',
      createdAt: '2000',
      name: 'string',
    },
    {
      id: '6',
      urls: 'https://picsum.photos/id/237/200/300',
      createdAt: '2000',
      name: 'string',
    },
    {
      id: '7',
      urls: 'https://picsum.photos/id/237/200/300',
      createdAt: '2000',
      name: 'string',
    },
    {
      id: '8',
      urls: 'https://picsum.photos/id/237/200/300',
      createdAt: '2000',
      name: 'string',
    },
    {
      id: '9',
      urls: 'https://picsum.photos/id/237/200/300',
      createdAt: '2000',
      name: 'string',
    },
    {
      id: '10',
      urls: 'https://picsum.photos/id/237/200/300',
      createdAt: '2000',
      name: 'string',
    },
  ];
  const selectedPhotos = useRef<string[]>([]);
  const [selectingAvailable, setSelectingAvailable] = useState(false);

  const addToList = (photoId: string) => {
    selectedPhotos.current.push(photoId);
  };
  const removeFromList = (photoId: string) => {
    const idx = selectedPhotos.current.findIndex((id) => id === photoId);
    selectedPhotos.current.splice(idx, 1);
    if (selectedPhotos.current.length === 0) {
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
    selectedPhotos.current = [];
    setSelectingAvailable(false);
  };

  const deletePhotos = () => {
    // selectedPhotos 삭제 요청 보내기
    setSelectingAvailable(false);
  };

  const clickCheck = () => {
    setSelectingAvailable(true);
  };

  return (
    <DataContext.Provider value={ctxValue}>
      <GalleryTitle
        title="PHOTO"
        top="0px"
        left="0px"
        backBtn
        onBackBtnClick={() => navigate('/gallery')}
        rightNode={
          !selectingAvailable ? (
            <Icon icon="IconCheck" />
          ) : (
            <Cancel className="text-gradient400">취소</Cancel>
          )
        }
        onRightClick={selectingAvailable ? clearList : clickCheck}
        rightSubNode={selectingAvailable && <Icon icon="IconTrash" />}
        onRightSubClick={deletePhotos}
      />
      <PaddingContainer>
        <PhotoContainer photoObjects={dummyPhotos} type="UPLOADED" />
        <FloatingButton />
      </PaddingContainer>
    </DataContext.Provider>
  );
}
export default PhotoPage;
