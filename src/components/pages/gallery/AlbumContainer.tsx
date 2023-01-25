import styled from 'styled-components';
import AlbumDto from '../../../types/gallery/Album.dto';
import AlbumRowContainer from './AlbumRowContainer';

interface AlbumContainerProps {
  albums: AlbumDto[];
}

const Container = styled.div`
  width: 100%;
`;

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

  return <Container>{components}</Container>;
}
export default AlbumContainer;
