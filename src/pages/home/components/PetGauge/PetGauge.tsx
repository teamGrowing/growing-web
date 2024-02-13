import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useQueryClient } from '@tanstack/react-query';
import store from 'stores/RootStore';
import { useGradutePet } from 'hooks/queries';
import PET_GAUGE_MAX from 'constants/constants';
import { PetDto } from 'models/pet';
import { ReactComponent as IconBowl } from 'assets/icons/home/IconBowl.svg';
import { ReactComponent as IconSmile } from 'assets/icons/home/IconSmile.svg';
import { ReactComponent as IconLetter } from 'assets/icons/home/IconLetter.svg';
import queryKeys from 'constants/queryKeys';
import * as S from './PetGauge.styled';

type PetGaugeProps = Pick<
  PetDto,
  'hungryGauge' | 'attentionGauge' | 'loveGauge'
>;

function PetGauge({ hungryGauge, attentionGauge, loveGauge }: PetGaugeProps) {
  const navigation = useNavigate();
  const { userStore } = store;
  const queryClient = useQueryClient();

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
      hungryGauge === PET_GAUGE_MAX &&
      attentionGauge === PET_GAUGE_MAX &&
      loveGauge === PET_GAUGE_MAX
    ) {
      graduatePet({});
    }
  }, [hungryGauge, attentionGauge, loveGauge]);

  return (
    <S.Wrapper>
      <S.Container>
        <S.GaugeRow>
          <IconBowl />
          <S.Bar>
            <S.ActiveBar level={getGaugeToPercent(hungryGauge)} />
          </S.Bar>
        </S.GaugeRow>

        <S.GaugeRow>
          <IconSmile />
          <S.Bar>
            <S.ActiveBar level={getGaugeToPercent(attentionGauge)} />
          </S.Bar>
        </S.GaugeRow>

        <S.GaugeRow>
          <IconLetter />
          <S.Bar>
            <S.ActiveBar level={getGaugeToPercent(loveGauge)} />
          </S.Bar>
        </S.GaugeRow>
      </S.Container>
    </S.Wrapper>
  );
}

export default observer(PetGauge);
