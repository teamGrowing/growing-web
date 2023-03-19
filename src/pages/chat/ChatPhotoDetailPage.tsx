import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import store from '../../stores/RootStore';
import Icon from '../../components/common/Icon/Icon';
import TopBar from '../../components/common/TopBar/TopBar';
import { useChatPhotoDetailData } from '../../hooks/queries/chat-photo.queries';

const PageContainer = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background-color: ${({ theme }) => theme.color.gray900};
`;

const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: calc(100% - 80px);

  justify-content: center;
`;

const Photo = styled.img`
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  position: relative;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const BottomBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 52px;

  width: 100%;
  height: 80px;
`;

// TODO: 넘기면 다음 채팅 사진으로
function ChatPhotoDetailPage() {
  const navigation = useNavigate();
  const { userStore } = store;

  const { id } = useParams();
  const location = useLocation().state as { idx: number };

  const { data: chat } = useChatPhotoDetailData({
    coupleId: userStore.user?.coupleId ?? '',
    chattingId: id ?? '',
  });

  return (
    <PageContainer className="page-container with-topbar">
      <TopBar
        mode="DARK"
        border={false}
        title={chat?.name}
        subTitle={dayjs(chat?.createdAt).format('YYYY년 M월 D일 HH:mm')}
        leftNode={<Icon icon="IconArrowLeft" themeColor="gray50" />}
        onLeftClick={() => navigation(-1)}
      />

      <StyledSwiper
        initialSlide={location?.idx ?? 0}
        pagination={{
          type: 'fraction',
        }}
        navigation
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {chat?.photos.map((photo, idx) => (
          <StyledSwiperSlide key={photo.id} virtualIndex={idx}>
            <Photo src={photo.url} />
          </StyledSwiperSlide>
        ))}
      </StyledSwiper>

      <BottomBar>
        <Icon icon="IconDownloadLocal" themeColor="gray50" />
        <Icon icon="IconAddAlbum" themeColor="gray50" />
        <Icon icon="IconExport" themeColor="gray50" />
      </BottomBar>
    </PageContainer>
  );
}

export default observer(ChatPhotoDetailPage);
