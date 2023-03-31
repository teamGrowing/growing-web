import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import store from '../../../stores/RootStore';
import Icon from '../../common/Icon/Icon';
import PetRaisingMenu from './PetRaisingMenu';
import PetGauge from './PetGauge';
import Pet3DImg from './Pet3D';
import { usePetData } from '../../../hooks/queries/pet.queries';

const EMOJI_SIZE = 200;

const Ballon = styled.div`
  position: relative;

  display: flex;

  width: max-content;
  max-width: 240px;
  padding: 14px 20px;
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 1px 4px 28px #00000020;
  border-radius: 20px;

  font-family: 'PretendardRegular';
  color: ${({ theme }) => theme.color.gray700};
  font-size: 16px;
  text-align: center;
`;
const BallonTail = styled.div`
  position: absolute;
  bottom: calc(-50% + 10px);

  width: 10px;
  height: 10px;
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 1px 4px 14px #00000020;
  border-radius: 50%;
  opacity: 0.9;
`;
const BallonTail2 = styled(BallonTail)`
  bottom: calc(-50% - 6px);
  left: 16px;

  width: 8px;
  height: 8px;
  box-shadow: 1px 4px 10px #00000020;
`;

const PetContainer = styled.div`
  flex: 1.5;

  position: relative;
  left: 50%;
  transform: translate(-50%, 0);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;

  height: 50vh;
  padding: 0px 36px;
`;
const PetLabel = styled.div`
  position: relative;
`;
const PetName = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 14px;
  gap: 10px;

  width: max-content;
  max-width: calc(${EMOJI_SIZE}px - 30px);
  min-height: 33px;
  padding: 5px 14px;
  background: linear-gradient(
    130.11deg,
    rgba(113, 23, 234, 0.7) 7.3%,
    rgba(234, 96, 96, 0.7) 100%
  );
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;

  font-family: 'PretendardMedium';
  font-size: 19px;
  text-align: center;
  color: ${({ theme }) => theme.color.gray50};
`;
const Pin = styled.div`
  width: 4px;
  height: 4px;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 50%;
`;

const Row = styled.div`
  display: flex;
  gap: 24px;
`;
const PetInfo = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

function HomePet() {
  const navigation = useNavigate();
  const { userStore } = store;
  const { data: pet } = usePetData({
    coupleId: userStore.user?.coupleId!,
    petId: userStore.petId!,
  });

  if (!pet) {
    // TODO
    return <div />;
  }

  return (
    <>
      <PetContainer>
        <Ballon>
          {pet?.talkingBox ?? '오늘 하루도 화이팅💓'}
          <BallonTail />
          <BallonTail2 />
        </Ballon>

        <Row>
          <PetInfo>
            <Pet3DImg size={EMOJI_SIZE} url={pet?.imageUrl} />

            <PetLabel>
              <PetName>
                <Pin />
                {`${pet?.name ? pet.name : ''}`}
                <Pin />
              </PetName>
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
            </PetLabel>
          </PetInfo>

          <PetRaisingMenu />
        </Row>
      </PetContainer>

      <PetGauge
        hungryGauge={pet.hungryGauge}
        attentionGauge={pet.attentionGauge}
        loveGauge={pet.loveGauge}
      />
    </>
  );
}

export default observer(HomePet);
