import styled from 'styled-components';
import {
  FetchNextPageOptions,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import Icon from 'components/common/Icon/Icon';
import { PhotoLineDto } from 'types/gallery/PhotoLine.dto';
import Photo from 'components/pages/gallery/Photo';

const Container = styled.div`
  position: relative;
  text-align: center;
`;

const Photos = styled.div`
  display: flex;
  margin: 1px 14px;
  gap: 1px 0;
  flex-wrap: wrap;

  & > div {
    width: 32%;
  }
`;

const Logo = styled.div`
  margin: 0 auto;
  margin-top: 124px;

  z-index: 1;
`;

const Message = styled.div`
  width: 100%;
  height: 62px;

  margin-top: 16px;

  font-family: 'PretendardMedium';
  font-size: 19px;
  line-height: 23px;

  text-align: center;

  background: ${({ theme }) => theme.color.gradient400};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  text-shadow: 0px 0px 8px rgba(151, 71, 255, 0.2);

  z-index: 0;
`;

type PhotoContainerProps = {
  type: 'UPLOADED' | 'UPLOAD';
  photoObjects: PhotoLineDto[];
  // for infinite scroll
  fetchNextPage?: (
    options?: FetchNextPageOptions
  ) => Promise<UseInfiniteQueryResult>;
};

function PhotoContainer({
  photoObjects,
  type,
  fetchNextPage,
}: PhotoContainerProps) {
  const lastPhotoRow = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (!fetchNextPage || !lastPhotoRow.current) return;
    const photoObserver = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      fetchNextPage();
    });
    photoObserver.observe(lastPhotoRow.current);

    // eslint-disable-next-line consistent-return
    return () => {
      photoObserver.disconnect();
    };
  }, [fetchNextPage, lastPhotoRow]);

  return (
    <>
      {type === 'UPLOADED' && photoObjects.length === 0 && (
        <Container>
          <Logo>
            <Icon icon="IconLogo" size={60} />
          </Logo>
          <Message>사진을 업로드 해주세요!</Message>
        </Container>
      )}
      {photoObjects.length > 0 && (
        <Photos>
          {photoObjects.map((photo) => (
            <Photo photoInfo={photo} key={photo.i} />
          ))}
          <div ref={lastPhotoRow} style={{ width: '100%' }} />
        </Photos>
      )}
    </>
  );
}

export default PhotoContainer;
