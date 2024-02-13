import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import Icon from 'components/common/Icon/Icon';
import TopBar from 'components/common/TopBar/TopBar';
import PetCard from 'pages/more/components/PetCard/PetCard';
import PetDetailCard from 'pages/more/components/PetDetailCard/PetDetailCard';
import PurpleBackground from 'styles/common/PurpleBackground';
import { useGraduatedPets } from 'hooks/queries';
import store from 'stores/RootStore';
import { MENT_MORE } from 'constants/ments';
import changeEmojiToSpan from 'utils/Text';
import Portal from 'components/common/Portal';
import * as S from './PetPage.styled';

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
    <S.Container className="page-container with-topbar">
      <PurpleBackground />
      <TopBar
        leftNode={<Icon icon="IconArrowLeft" />}
        onLeftClick={() => navigate('/more')}
        title="동물도감"
      />
      {graduatedPets?.length === 0 && (
        <S.EmptyWrapper>
          <Icon icon="IconLogo" size={60} />
          <S.Message>
            <S.FontSpan
              className="text-gradient400"
              dangerouslySetInnerHTML={changeEmojiToSpan(
                MENT_MORE.PET_NOT_EXIST
              )}
            />
          </S.Message>
        </S.EmptyWrapper>
      )}
      {graduatedPets && graduatedPets?.length > 0 && (
        <S.Wrapper className="hidden-scrollbar">
          {graduatedPets.map((pet) => (
            <PetCard key={pet.id} petInfo={pet} onClick={clickCardHandler} />
          ))}
          {graduatedPets.map((pet) => (
            <PetCard key={pet.id} petInfo={pet} onClick={clickCardHandler} />
          ))}
        </S.Wrapper>
      )}
      {detailPetId && (
        <Portal type="modal-root">
          <S.Layer />
          <PetDetailCard
            petId={detailPetId}
            onExit={() => setDetailPetId(null)}
          />
        </Portal>
      )}
    </S.Container>
  );
}
export default observer(PetPage);
