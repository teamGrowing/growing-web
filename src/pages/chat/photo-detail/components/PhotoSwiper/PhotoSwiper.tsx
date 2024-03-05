import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { FallbackProps } from 'react-error-boundary';
import { observer } from 'mobx-react';
import { Manipulation, Navigation, Pagination } from 'swiper';
import store from 'stores/RootStore';
import Icon from 'components/common/Icon/Icon';
import ChatVideo from 'pages/chat/components/ChatVideo/ChatVideo';
import { useChatPhotoDetailData, useChatPhotoToGallery } from 'hooks/queries';
import useToast from 'hooks/common/useToast';
import { MENT_COMMON } from 'constants/ments';
import * as S from './PhotoSwiper.styled';

const PhotoSwiper = () => {
  const { userStore } = store;
  const { addToast } = useToast();

  const { id } = useParams();
  const location = useLocation().state as { idx: number };

  const [currentPhotoIdx, setCurrentPhotoIdx] = useState<number | null>(null);

  const { data: chat } = useChatPhotoDetailData({
    coupleId: userStore.user?.coupleId ?? '',
    chattingId: id ?? '',
  });

  const { mutateAsync: putGallery } = useChatPhotoToGallery({
    coupleId: userStore.user?.coupleId ?? '',
    photoId: chat?.video
      ? chat.video.id
      : chat?.photos[currentPhotoIdx ?? 0].id ?? '',
    options: {
      onSuccess: () => {
        addToast('갤러리로 이동되었습니다.');
      },
      onError: () => {
        addToast('네트워크 오류가 발생했습니다.abs');
      },
    },
  });

  return (
    <S.InnerContainer className="hidden-scrollbar">
      {chat?.photos.length && (
        <S.StyledSwiper
          initialSlide={location?.idx ?? 0}
          pagination={{
            type: 'fraction',
          }}
          navigation
          modules={[Pagination, Navigation, Manipulation]}
          className="mySwiper"
          onSlideChange={(swiper) => setCurrentPhotoIdx(swiper.realIndex)}
        >
          {chat?.photos.map((photo, idx) => (
            <S.StyledSwiperSlide key={idx}>
              <S.Photo src={photo.url} />
            </S.StyledSwiperSlide>
          ))}
        </S.StyledSwiper>
      )}

      {chat?.video && <ChatVideo {...chat.video} />}

      <S.BottomBar>
        <Icon icon="IconDownloadLocal" themeColor="gray50" />
        <Icon icon="IconAddAlbum" themeColor="gray50" onClick={putGallery} />
        <Icon icon="IconExport" themeColor="gray50" />
      </S.BottomBar>
    </S.InnerContainer>
  );
};

PhotoSwiper.Loading = () => {
  return (
    <S.InnerContainer className="hidden-scrollbar">
      <S.SkeletonWrapper>
        <Skeleton baseColor="#171717" highlightColor="#2b2b2b" />
      </S.SkeletonWrapper>
    </S.InnerContainer>
  );
};

PhotoSwiper.Error = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <S.ErrorContainer className="hidden-scrollbar">
      <S.ErrorMessage>{MENT_COMMON.ERROR}</S.ErrorMessage>
      <S.ResetButton onClick={resetErrorBoundary}>
        {MENT_COMMON.RETRY}
      </S.ResetButton>
    </S.ErrorContainer>
  );
};

export default observer(PhotoSwiper);
