import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import Album from './Album';

const Container = styled.div`
  width: 100%;
  position: relative;
`;
const FixedContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  place-items: center;

  width: 100%;
  gap: 10px;
  padding: 18px 18px 10px;
  isolation: isolate;

  backdrop-filter: blur(2px);

  flex: none;
  order: 0;
  flex-grow: 1 1 0;
`;

const NoAlbumContainer = styled.div`
  padding: 18px 18px 10px;
  text-align: center;
  position: relative;
  width: 100%;
  height: 176px;
  gap: 10;

  background: ${({ theme }) => theme.color.gradient400};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  text-shadow: 0px 0px 8px rgba(151, 71, 255, 0.2);

  p {
    width: 100%;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    font-size: 19px;
    line-height: 23px;
    text-align: center;

    margin-top: 50px;
  }
`;

const SlideContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  width: 100%;

  padding: 18px 0px 10px 14px;
  gap: 10px;
  isolation: isolate;

  backdrop-filter: blur(2px);

  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;

  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Line = styled.div`
  position: absolute;
  width: 100%;
  height: 1px;
  left: 0px;
  top: 11px;

  background: ${({ theme }) => theme.color.purple400};

  flex: none;
  order: 3;
  flex-grow: 0;
  z-index: 3;
`;

type AlbumObject = {
  id: string;
  title: string;
  subTitle: string;
  coverImg: string;
};

interface AlbumRowContainerProps {
  albums: Array<AlbumObject>;
}

function AlbumRowContainer({ albums }: AlbumRowContainerProps) {
  const [albumArray, setAlbumArray] = useState(albums);

  const albumComponents = albumArray.map((item: AlbumObject) => (
    <Album
      key={item.id}
      title={item.title}
      subTitle={item.subTitle}
      coverImg={item.coverImg}
    />
  ));

  useEffect(() => {
    setAlbumArray(albums);
  }, [albums]);

  return (
    <Container>
      {albumArray.length === 0 && (
        <NoAlbumContainer>
          <Line />
          <p>소중한 추억을 만들어보세요.</p>
        </NoAlbumContainer>
      )}
      {albumArray.length !== 0 && albumArray.length <= 3 && (
        <FixedContainer>
          <Line />
          {albumComponents}
        </FixedContainer>
      )}
      {albumArray.length > 3 && (
        <>
          <Line />
          <SlideContainer>{albumComponents}</SlideContainer>
        </>
      )}
    </Container>
  );
}
export default AlbumRowContainer;
