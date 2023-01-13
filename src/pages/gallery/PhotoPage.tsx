import styled from 'styled-components';
import { useMemo, useState, useRef } from 'react';
import TopBar from '../../components/common/TopBar/TopBar';
import FloatingButton from '../../components/pages/gallery/FloatingButton';
import checkIcon from '../../assets/icons/albumPage/BarOptionCheck.png';
import trashIcon from '../../assets/icons/albumPage/Trash.png';
import PaddingContainer from '../../styles/common/layout';
import PhotoContext from './context';
import PhotoContainer from '../../components/pages/gallery/PhotoContainer';
import PhotoDto from '../../types/gallery/Photo.dto';

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

function PhotoPage() {
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
    <PhotoContext.Provider value={ctxValue}>
      <TopBar
        leftNode={<BarTitle>PHOTO</BarTitle>}
        rightMainNode={
          !selectingAvailable ? (
            <img src={checkIcon} alt="check" />
          ) : (
            <Option>취소</Option>
          )
        }
        onRightMainClick={selectingAvailable ? clearList : clickCheck}
        rightSubNode={selectingAvailable && <img src={trashIcon} alt="trash" />}
        onRightSubClick={deletePhotos}
        border={false}
      />
      <PaddingContainer>
        <PhotoContainer photoObjects={dummyPhotos} type="UPLOADED" />
        <FloatingButton />
      </PaddingContainer>
    </PhotoContext.Provider>
  );
}
export default PhotoPage;
