import { useState } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import Icon from 'components/common/Icon/Icon';
import TopBar from 'components/common/TopBar/TopBar';
import PetCard from 'components/pages/more/PetCard';
import PetDetailCard from 'components/pages/more/PetDetailCard';
import PurpleBackground from 'styles/common/PurpleBackground';
import { useGraduatedPets } from 'hooks/queries';
import store from 'stores/RootStore';
import { MENT_MORE } from 'constants/ments';
import changeEmojiToSpan from 'util/Text';
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
      {detailPetId &&
        ReactDOM.createPortal(
          <>
            <S.Layer />
            <PetDetailCard
              petId={detailPetId}
              onExit={() => setDetailPetId(null)}
            />
          </>,
          document.getElementById('modal-root') as Element
        )}
    </S.Container>
  );
}
export default observer(PetPage);
