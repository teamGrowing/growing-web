import React, { useState } from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import Icon from 'components/common/Icon/Icon';
import TopBar from 'components/common/TopBar/TopBar';
import PetCard from 'components/pages/more/PetCard';
import PetDetailCard from 'components/pages/more/PetDetailCard';
import PurpleBackground from 'styles/common/PurpleBackground';
import { useGraduatedPets } from 'hooks/queries/pet.queries';
import store from 'stores/RootStore';
import { MENT_MORE } from 'constants/ments';
import changeEmojiToSpan from 'util/Text';

const Container = styled.div`
  position: relative;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
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
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 250px;
  gap: 16px;
`;

const Message = styled.div`
  width: 230px;
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
    <Container className="page-container with-topbar">
      <PurpleBackground />
      <TopBar
        leftNode={<Icon icon="IconArrowLeft" />}
        onLeftClick={() => navigate('/more')}
        title="동물도감"
      />
      {graduatedPets?.length === 0 && (
        <EmptyWrapper>
          <Icon icon="IconLogo" size={60} />
          <Message>
            <FontSpan
              className="text-gradient400"
              dangerouslySetInnerHTML={changeEmojiToSpan(
                MENT_MORE.PET_NOT_EXIST
              )}
            />
          </Message>
        </EmptyWrapper>
      )}
      {graduatedPets && graduatedPets?.length > 0 && (
        <Wrapper className="hidden-scrollbar">
          {graduatedPets.map((pet) => (
            <PetCard key={pet.id} petInfo={pet} onClick={clickCardHandler} />
          ))}
          {graduatedPets.map((pet) => (
            <PetCard key={pet.id} petInfo={pet} onClick={clickCardHandler} />
          ))}
        </Wrapper>
      )}
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
    </Container>
  );
}
export default observer(PetPage);
