import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import Skeleton from 'react-loading-skeleton';
import { useQueryClient } from '@tanstack/react-query';
import store from 'stores/RootStore';
import { useCoupleData, useGradutePet, usePetData } from 'hooks/queries';
import PET_GAUGE_MAX from 'constants/constants';
import { ReactComponent as IconBowl } from 'assets/icons/home/IconBowl.svg';
import { ReactComponent as IconSmile } from 'assets/icons/home/IconSmile.svg';
import { ReactComponent as IconLetter } from 'assets/icons/home/IconLetter.svg';
import queryKeys from 'libs/react-query/queryKeys';
import * as S from './PetGauge.styled';

const PetGauge = () => {
  const navigation = useNavigate();
  const { userStore } = store;
  const queryClient = useQueryClient();

  const { data: couple } = useCoupleData({
    coupleId: userStore.user?.coupleId || '',
    options: {
      enabled: !!userStore.user?.coupleId,
    },
  });

  const { data: pet } = usePetData({
    coupleId: couple?.coupleId || '',
    petId: couple?.petId || '',
    options: {
      enabled: !!couple,
    },
  });

  const { mutateAsync: graduatePet } = useGradutePet({
    coupleId: userStore.user?.coupleId ?? '',
    petId: userStore.petId ?? '',
    options: {
      onSuccess() {
        navigation('/pet/graduate', { replace: true });
        queryClient.invalidateQueries(queryKeys.petKeys.list);
      },
    },
  });

  function getGaugeToPercent(n: number | undefined) {
    if (!n) {
      return 0;
    }
    return (n / PET_GAUGE_MAX) * 100;
  }

  useEffect(() => {
    if (
      pet?.hungryGauge === PET_GAUGE_MAX &&
      pet?.attentionGauge === PET_GAUGE_MAX &&
      pet?.loveGauge === PET_GAUGE_MAX
    ) {
      graduatePet({});
    }
  }, [pet?.hungryGauge, pet?.attentionGauge, pet?.loveGauge]);

  return (
    <S.Wrapper>
      <S.Container>
        <S.GaugeRow>
          <IconBowl />
          <S.Bar>
            <S.ActiveBar level={getGaugeToPercent(pet?.hungryGauge)} />
          </S.Bar>
        </S.GaugeRow>

        <S.GaugeRow>
          <IconSmile />
          <S.Bar>
            <S.ActiveBar level={getGaugeToPercent(pet?.attentionGauge)} />
          </S.Bar>
        </S.GaugeRow>

        <S.GaugeRow>
          <IconLetter />
          <S.Bar>
            <S.ActiveBar level={getGaugeToPercent(pet?.loveGauge)} />
          </S.Bar>
        </S.GaugeRow>
      </S.Container>
    </S.Wrapper>
  );
};

PetGauge.Loading = () => {
  return <Skeleton width={272} height={134} borderRadius={14} />;
};

export default observer(PetGauge);
