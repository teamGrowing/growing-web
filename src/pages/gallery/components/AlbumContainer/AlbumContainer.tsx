import { AlbumDto } from 'models/gallery';
import AlbumRowContainer from '../AlbumRowContainer/AlbumRowContainer';
import * as S from './AlbumContainer.styled';

interface AlbumContainerProps {
  albums: AlbumDto[];
}

function AlbumContainer({ albums }: AlbumContainerProps) {
  const makeChunk = (data: AlbumDto[]) => {
    const arr = [];
    for (let i = 0; i < data.length; i += 3) {
      arr.push(data.slice(i, i + 3));
    }
    return arr;
  };

  const AlbumGroupArray = makeChunk(albums);
  const components = AlbumGroupArray.map((group: AlbumDto[]) => (
    <AlbumRowContainer albums={group} key={group[0].id} />
  ));

  return <S.Container>{components}</S.Container>;
}
export default AlbumContainer;
