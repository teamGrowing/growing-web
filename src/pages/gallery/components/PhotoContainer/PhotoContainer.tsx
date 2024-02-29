import {
  FetchNextPageOptions,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { PhotoLineDto } from 'models/gallery';
import Photo from 'pages/gallery/components/Photo/Photo';
import Icon from 'components/common/Icon/Icon';
import * as S from './PhotoContainer.styled';

type PhotoContainerProps = {
  photoObjects: PhotoLineDto[];
  // for infinite scroll
  fetchNextPage?: (
    options?: FetchNextPageOptions
  ) => Promise<UseInfiniteQueryResult>;
};

function PhotoContainer({ photoObjects, fetchNextPage }: PhotoContainerProps) {
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
      {photoObjects.length === 0 && (
        <S.EmptyContainer>
          <S.Logo>
            <Icon icon="IconLogo" size={60} />
          </S.Logo>
          <S.Message>사진을 업로드 해주세요!</S.Message>
        </S.EmptyContainer>
      )}
      {photoObjects.length > 0 && (
        <S.Container>
          {photoObjects.map((photo) => (
            <Photo photoInfo={photo} key={photo.i} />
          ))}
          <div ref={lastPhotoRow} style={{ width: '100%' }} />
        </S.Container>
      )}
    </>
  );
}

export default PhotoContainer;
