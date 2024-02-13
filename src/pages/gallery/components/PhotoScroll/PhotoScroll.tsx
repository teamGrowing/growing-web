import { PhotoLineDto } from 'models/gallery';
import PhotoContainer from 'pages/gallery/components/PhotoContainer/PhotoContainer';
import * as S from './PhotoScroll.styled';

type PhotoScrollProps = {
  photos: PhotoLineDto[];
  leftLabel: string;
  onLeftClick: () => void;
  rightLabel?: string;
  onRightClick?: () => void;
};

function PhotoScroll({
  photos,
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
        <PhotoContainer photoObjects={photos} type="UPLOADED" />
      </S.ScrollArea>
    </S.Scroll>
  );
}
export default PhotoScroll;
