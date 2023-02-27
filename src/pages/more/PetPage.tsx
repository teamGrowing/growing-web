import styled from 'styled-components';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import Icon from '../../components/common/Icon/Icon';
import TopBar from '../../components/common/TopBar/TopBar';
import PetCard from '../../components/pages/more/PetCard';
import PetDetailCard from '../../components/pages/more/PetDetailCard';
import PaddingContainer from '../../styles/common/layout';
import PurpleBackground from '../../styles/common/PurpleBackground';
import { useGraduatedPets } from '../../hooks/queries/pet.queries';
import store from '../../stores/RootStore';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 41px 0;
`;
const Layer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3); ;
`;

const EmptyWrapper = styled.div`
  margin-top: 250px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const Message = styled.div`
  width: 224px;
  height: 62px;

  display: flex;
  align-items: center;
  text-align: center;
`;

const FontSpan = styled.span`
  font-family: 'PretendardMedium';
  font-size: 19px;
  line-height: 23px;
`;

function PetPage() {
  const navigate = useNavigate();
  const [detailPetId, setDetailPetId] = useState<string | null>(null);
  const { data: graduatedPets } = useGraduatedPets({
    coupleId: store.userStore.user?.coupleId!,
  });

  const clickCardHandler = (petId: string) => {
    setDetailPetId(petId);
  };

  return (
    <PurpleBackground>
      <TopBar
        leftNode={<Icon icon="IconArrowLeft" />}
        onLeftClick={() => navigate('/more')}
        title="동물도감"
      />
      <PaddingContainer>
        <EmptyWrapper>
          {graduatedPets?.length === 0 && (
            <>
              <Icon icon="IconLogo" size={60} />
              <Message>
                <FontSpan className="text-gradient400">
                  아직 졸업한 동물이 없네요
                </FontSpan>
                😢
              </Message>
            </>
          )}
        </EmptyWrapper>
        <Wrapper>
          {graduatedPets &&
            graduatedPets.map((pet) => (
              <PetCard key={pet.id} petInfo={pet} onClick={clickCardHandler} />
            ))}
        </Wrapper>
        {detailPetId &&
          ReactDOM.createPortal(
            <>
              <Layer />
              <PetDetailCard
                petId={detailPetId}
                onExit={() => setDetailPetId(null)}
              />
            </>,
            document.getElementById('modal-root') as Element
          )}
      </PaddingContainer>
    </PurpleBackground>
  );
}
export default observer(PetPage);
