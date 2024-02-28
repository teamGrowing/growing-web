import { AlbumDto } from 'models/gallery';
import Album from 'pages/gallery/components/Album/Album';
import * as S from './AlbumRowContainer.styled';

interface Props {
  albums: AlbumDto[];
  onClick?: React.MouseEventHandler;
  onTouchStart?: React.TouchEventHandler;
  onTouchMove?: React.TouchEventHandler;
}

function AlbumRowContainer({
  albums,
  onClick,
  onTouchStart,
  onTouchMove,
}: Props) {
  return (
    <S.Container
      onClick={onClick}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
    >
      <S.FixedContainer>
        <S.Line />
        {albums.map((item: AlbumDto) => (
          <Album key={item.id} albumInfo={item} />
        ))}
      </S.FixedContainer>
    </S.Container>
  );
}
export default AlbumRowContainer;
