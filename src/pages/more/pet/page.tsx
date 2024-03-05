import { Suspense, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import Icon from 'components/common/Icon/Icon';
import TopBar from 'components/common/TopBar/TopBar';
import PetDetailCard from 'pages/more/components/PetDetailCard/PetDetailCard';
import Portal from 'components/common/Portal';
import BlockErrorBoundary from 'components/common/fallback/BlockErrorBoundary/BlockErrorBoundary';
import * as S from './page.styled';
import PetCardList from './components/PetCardList';

const PetPage = () => {
  const navigate = useNavigate();
  const [detailPetId, setDetailPetId] = useState<string | null>(null);

  return (
    <S.Container>
      <TopBar
        leftNode={<Icon icon="IconArrowLeft" />}
        onLeftClick={() => navigate('/more')}
        title="동물도감"
      />
      <S.Wrapper>
        <BlockErrorBoundary fallbackComponent={PetCardList.Error}>
          <Suspense fallback={<PetCardList.Loading />}>
            <PetCardList
              clickCardHandler={(petId: string) => setDetailPetId(petId)}
            />
          </Suspense>
        </BlockErrorBoundary>
      </S.Wrapper>

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
};
export default observer(PetPage);
