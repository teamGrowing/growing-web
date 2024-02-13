/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import { Manipulation, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import store from 'stores/RootStore';
import Icon from 'components/common/Icon/Icon';
import TopBar from 'components/common/TopBar/TopBar';
import ChatVideo from 'components/pages/chat/ChatVideo/ChatVideo';
import { useChatPhotoDetailData, useChatPhotoToGallery } from 'hooks/queries';
import useToast from 'hooks/common/useToast';
import * as S from './ChatPhotoDetailPage.styled';

// TODO: 넘기면 다음 채팅 사진으로
function ChatPhotoDetailPage() {
  const navigation = useNavigate();
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
    },
  });

  return (
    <S.PageContainer className="page-container with-topbar">
      <TopBar
        mode="DARK"
        border={false}
        title={chat?.name}
        subTitle={dayjs(chat?.createdAt).format('YYYY년 M월 D일 HH:mm')}
        leftNode={<Icon icon="IconArrowLeft" themeColor="gray50" />}
        onLeftClick={() => navigation(-1)}
      />

      {chat?.photos && (
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

      {chat?.video && <ChatVideo {...chat.video} height="calc(100% - 80px)" />}

      <S.BottomBar>
        <Icon icon="IconDownloadLocal" themeColor="gray50" />
        <Icon icon="IconAddAlbum" themeColor="gray50" onClick={putGallery} />
        <Icon icon="IconExport" themeColor="gray50" />
      </S.BottomBar>
    </S.PageContainer>
  );
}

export default observer(ChatPhotoDetailPage);
