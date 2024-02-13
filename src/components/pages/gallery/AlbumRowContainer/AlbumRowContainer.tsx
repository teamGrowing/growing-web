import AlbumDto from 'types/gallery/Album.dto';
import Album from '../Album/Album';
import * as S from './AlbumRowContainer.styled';

interface AlbumRowContainerProps {
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
}: AlbumRowContainerProps) {
  const albumComponents = albums.map((item: AlbumDto) => (
    <Album key={item.id} albumInfo={item} />
  ));

  return (
    <S.Container
      onClick={onClick}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
    >
      {albums.length === 0 && (
        <S.NoAlbumContainer>
          <S.Line />
          <p>소중한 추억을 만들어보세요.</p>
        </S.NoAlbumContainer>
      )}
      {albums.length !== 0 && albums.length <= 3 && (
        <S.FixedContainer>
          <S.Line />
          {albumComponents}
        </S.FixedContainer>
      )}
      {albums.length > 3 && (
        <>
          <S.Line />
          <S.SlideContainer className="hidden-scrollbar">
            {albumComponents}
          </S.SlideContainer>
        </>
      )}
    </S.Container>
  );
}
export default AlbumRowContainer;
