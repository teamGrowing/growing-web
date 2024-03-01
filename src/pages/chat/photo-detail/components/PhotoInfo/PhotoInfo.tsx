import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import Skeleton from 'react-loading-skeleton';
import { useNavigate, useParams } from 'react-router-dom';
import store from 'stores/RootStore';
import Icon from 'components/common/Icon/Icon';
import TopBar from 'components/common/TopBar/TopBar';
import { useChatPhotoDetailData } from 'hooks/queries';
import * as S from './PhotoInfo.styled';

const PhotoInfo = () => {
  const navigation = useNavigate();
  const { userStore } = store;

  const { id } = useParams();

  const { data: chat } = useChatPhotoDetailData({
    coupleId: userStore.user?.coupleId ?? '',
    chattingId: id ?? '',
    options: {
      enabled: !!id && !!userStore.user?.coupleId,
    },
  });

  return (
    <TopBar
      mode="DARK"
      border={false}
      title={chat?.name}
      subTitle={dayjs(chat?.createdAt).format('YYYY년 M월 D일 HH:mm')}
      leftNode={<Icon icon="IconArrowLeft" themeColor="gray50" />}
      onLeftClick={() => navigation(-1)}
    />
  );
};

PhotoInfo.Loading = () => {
  return (
    <S.LoadingContainer>
      <Skeleton
        width={30}
        height={14}
        baseColor="#5d5d5d"
        highlightColor="#717171"
      />
      <Skeleton
        width={100}
        height={12}
        baseColor="#5d5d5d"
        highlightColor="#717171"
      />
    </S.LoadingContainer>
  );
};

export default observer(PhotoInfo);
