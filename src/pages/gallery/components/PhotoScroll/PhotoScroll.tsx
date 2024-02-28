import PhotoContainer from 'pages/gallery/components/PhotoContainer/PhotoContainer';
import { useInfiniteGalleryList } from 'hooks/queries';
import store from 'stores/RootStore';
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
  const { data: photos, fetchNextPage } = useInfiniteGalleryList({
    coupleId: store.userStore.user?.coupleId ?? '',
  });

  return (
    <S.Scroll>
      <S.Options>
        <S.Option onClick={onLeftClick}>{leftLabel}</S.Option>
        <S.Option onClick={onRightClick}>{rightLabel}</S.Option>
      </S.Options>
      <S.ScrollArea className="hidden-scrollbar">
        <PhotoContainer
          photoObjects={photos?.pages.flatMap((res) => res) ?? []}
          type="UPLOADED"
          fetchNextPage={fetchNextPage}
        />
      </S.ScrollArea>
    </S.Scroll>
  );
}
export default PhotoScroll;
