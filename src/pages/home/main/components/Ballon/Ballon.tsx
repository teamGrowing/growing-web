import Skeleton from 'react-loading-skeleton';
import { observer } from 'mobx-react';
import { useCoupleData, usePetData } from 'hooks/queries';
import store from 'stores/RootStore';
import * as S from './Ballon.styled';

const Ballon = () => {
  const { userStore } = store;

  const { data: couple } = useCoupleData({
    coupleId: userStore.user?.coupleId ?? '',
  });

  const { data: pet } = usePetData({
    coupleId: couple?.coupleId || '',
    petId: couple?.petId || '',
    options: {
      enabled: !!couple,
    },
  });

  return (
    <S.Container>
      <S.Ballon>{pet?.talkingBox ?? '오늘 하루도 화이팅 🩷'}</S.Ballon>

      <S.BallonTail />
      <S.BallonTail2 />
    </S.Container>
  );
};

Ballon.Loading = () => {
  return (
    <S.Container>
      <Skeleton width={178} height={46} borderRadius={20} />

      <S.BallonTail />
      <S.BallonTail2 />
    </S.Container>
  );
};

export default observer(Ballon);
