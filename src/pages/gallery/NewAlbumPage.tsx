import { useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import PhotoScroll from '../../components/pages/gallery/PhotoScroll';
import PhotoDto from '../../types/gallery/Photo.dto';
import DataContext from './context';

function NewAlbumPage() {
  const navigate = useNavigate();
  const selectedPhotos = useRef<string[]>([]);
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
  const addToList = (photoId: string) => {
    selectedPhotos.current.push(photoId);
  };
  const removeFromList = (photoId: string) => {
    const idx = selectedPhotos.current.findIndex((id) => id === photoId);
    selectedPhotos.current.splice(idx, 1);
  };
  const ctxValue = useMemo(() => {
    return {
      selectingAvailable: true,
      addToList,
      removeFromList,
    };
  }, []);

  return (
    <DataContext.Provider value={ctxValue}>
      <PhotoScroll
        photos={dummyPhotos}
        onAdd={() => {}}
        onCancel={() => {
          navigate(-1);
        }}
      />
    </DataContext.Provider>
  );
}

export default NewAlbumPage;
