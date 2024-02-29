import PhotoList from 'pages/gallery/new-album/components/PhotoList';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import * as S from './PhotoScroll.styled';

type PhotoScrollProps = {
  leftLabel: string;
  onLeftClick: () => void;
  rightLabel?: string;
  onRightClick?: () => void;
};

function PhotoScroll({
  leftLabel,
  onLeftClick,
  rightLabel,
  onRightClick,
}: PhotoScrollProps) {
  return (
    <S.Scroll>
      <S.Options>
        <S.Option onClick={onLeftClick}>{leftLabel}</S.Option>
        <S.Option onClick={onRightClick}>{rightLabel}</S.Option>
      </S.Options>
      <S.ScrollArea className="hidden-scrollbar">
        <ErrorBoundary FallbackComponent={PhotoList.Error}>
          <Suspense fallback={<PhotoList.Loading />}>
            <PhotoList />
          </Suspense>
        </ErrorBoundary>
      </S.ScrollArea>
    </S.Scroll>
  );
}
export default PhotoScroll;
