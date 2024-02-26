import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import store from 'stores/RootStore';
import Icon from 'components/common/Icon/Icon';
import { usePetData } from 'hooks/queries';
import PetRaisingMenu from '../PetRaisingMenu/PetRaisingMenu';
import PetGauge from '../PetGauge/PetGauge';
import Pet3DImg from '../Pet3D';
import * as S from './HomePet.styled';
import EMOJI_SIZE from './HomePetConstants';

function HomePet() {
  const navigation = useNavigate();
  const { userStore } = store;
  const { data: pet } = usePetData({
    coupleId: userStore.user?.coupleId!,
    petId: userStore.petId!,
    options: {
      refetchInterval: (data) => (!data ? 3000 : false),
      enabled: !!userStore.petId,
      suspense: true,
    },
  });

  if (!pet) {
    // TODO
    return <div style={{ width: '200px', height: '200px' }} />;
  }

  return (
    <>
      <S.PetContainer>
        <S.Ballon>
          {pet?.talkingBox ?? '오늘 하루도 화이팅 🩷'}
          <S.BallonTail />
          <S.BallonTail2 />
        </S.Ballon>

        <S.Row>
          <S.PetInfo>
            <Pet3DImg size={EMOJI_SIZE} url={pet?.imageUrl} />
          </S.PetInfo>

          <PetRaisingMenu />
        </S.Row>
      </S.PetContainer>

      <S.PetLabel>
        <S.PetName>
          <S.Pin />
          {`${pet?.name ? pet.name : ''}`}
          <S.Pin />
        </S.PetName>
        {!pet.name && (
          <Icon
            icon="IconPencil"
            size={20}
            style={{
              position: 'absolute',
              right: -30,
              top: '50%',
              transform: 'translateY(-50%)',
            }}
            onClick={() => navigation('/pet/naming')}
          />
        )}
      </S.PetLabel>

      <PetGauge
        hungryGauge={pet.hungryGauge}
        attentionGauge={pet.attentionGauge}
        loveGauge={pet.loveGauge}
      />
    </>
  );
}

export default observer(HomePet);
