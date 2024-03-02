import { useRef, useState, useMemo, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { observer } from 'mobx-react';
import BlockErrorBoundary from 'components/common/fallback/BlockErrorBoundary/BlockErrorBoundary';
import AlbumContainer from './components/AlbumContainer';
import DataContext from '../context';
import * as S from './page.styled';

const AlbumPage = () => {
  const location = useLocation();
  const [selectingAvailable, setSelectingAvailable] = useState<boolean>(
    location.state?.selectingAvailable ?? false
  );
  const selectedAlbums = useRef<string[]>([]);

  const ctxValue = useMemo(() => {
    return {
      selectingAvailable,
      addToList: (albumId: string) => {
        selectedAlbums.current.push(albumId);
      },
      removeFromList: (albumId: string) => {
        const idx = selectedAlbums.current.findIndex((id) => id === albumId);
        selectedAlbums.current.splice(idx, 1);
        if (selectedAlbums.current.length === 0) {
          setSelectingAvailable(true);
        }
      },
    };
  }, [selectingAvailable]);

  const clearSelectedList = () => {
    selectedAlbums.current = [];
  };

  return (
    <S.Container>
      <BlockErrorBoundary fallbackComponent={AlbumContainer.Error}>
        <Suspense fallback={<AlbumContainer.Loading />}>
          <DataContext.Provider value={ctxValue}>
            <AlbumContainer
              selectingAvailable={selectingAvailable}
              setSelectingAvailable={setSelectingAvailable}
              selectedAlbums={selectedAlbums.current}
              clearSelectedList={clearSelectedList}
            />
          </DataContext.Provider>
        </Suspense>
      </BlockErrorBoundary>
    </S.Container>
  );
};
export default observer(AlbumPage);
