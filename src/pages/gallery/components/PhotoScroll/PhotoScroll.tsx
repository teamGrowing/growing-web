import PhotoList from 'pages/gallery/new-album/components/PhotoList';
import { Suspense } from 'react';
import BlockErrorBoundary from 'components/common/fallback/BlockErrorBoundary/BlockErrorBoundary';
import * as S from './PhotoScroll.styled';

type Props = {
  leftLabel: string;
  onLeftClick: () => void;
  rightLabel?: string;
  onRightClick?: () => void;
};

const PhotoScroll = ({
  leftLabel,
  onLeftClick,
  rightLabel,
  onRightClick,
}: Props) => {
  return (
    <S.Scroll>
      <S.Options>
        <S.Option onClick={onLeftClick}>{leftLabel}</S.Option>
        <S.Option onClick={onRightClick}>{rightLabel}</S.Option>
      </S.Options>
      <S.ScrollArea className="hidden-scrollbar">
        <BlockErrorBoundary fallbackComponent={PhotoList.Error}>
          <Suspense fallback={<PhotoList.Loading />}>
            <PhotoList />
          </Suspense>
        </BlockErrorBoundary>
      </S.ScrollArea>
    </S.Scroll>
  );
};
export default PhotoScroll;
