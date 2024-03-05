import { useMemo, useState, useRef, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { observer } from 'mobx-react';
import FloatingButton from 'pages/gallery/components/FloatingButton/FloatingButton';
import { LayoutWithNavbar } from 'components/layout/common';
import BlockErrorBoundary from 'components/common/fallback/BlockErrorBoundary/BlockErrorBoundary';
import DataContext from '../context';
import PhotoSection from './components/PhotoSection';
import * as S from './page.styled';

const PhotoPage = () => {
  const location = useLocation();

  const selectedPhotos = useRef<string[]>([]);
  const [selectingAvailable, setSelectingAvailable] = useState<boolean>(
    location.state?.selectingAvailable ?? false
  );

  const ctxValue = useMemo(() => {
    return {
      selectingAvailable,
      addToList: (photoId: string) => {
        selectedPhotos.current.push(photoId);
      },
      removeFromList: (photoId: string) => {
        const idx = selectedPhotos.current.findIndex((id) => id === photoId);
        selectedPhotos.current.splice(idx, 1);
        if (selectedPhotos.current.length === 0) {
          setSelectingAvailable(true);
        }
      },
    };
  }, [selectingAvailable]);

  const clearList = () => {
    selectedPhotos.current = [];
  };

  return (
    <S.PageContainer>
      <BlockErrorBoundary fallbackComponent={PhotoSection.Error}>
        <Suspense fallback={<PhotoSection.Loading />}>
          <DataContext.Provider value={ctxValue}>
            <LayoutWithNavbar>
              <PhotoSection
                selectingAvailable={selectingAvailable}
                selectedPhotos={selectedPhotos.current}
                setSelectingAvailable={setSelectingAvailable}
                clearList={clearList}
              />
              <FloatingButton />
            </LayoutWithNavbar>
          </DataContext.Provider>
        </Suspense>
      </BlockErrorBoundary>
    </S.PageContainer>
  );
};
export default observer(PhotoPage);
