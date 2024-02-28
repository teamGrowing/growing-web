import { Suspense, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import Icon from 'components/common/Icon/Icon';
import TopBar from 'components/common/TopBar/TopBar';
import PetDetailCard from 'pages/more/components/PetDetailCard/PetDetailCard';
import MainBackground from 'styles/common/MainBackground';
import Portal from 'components/common/Portal';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import * as S from './PetPage.styled';
import PetCardList from './components/PetCardList';

const PetPage = () => {
  const navigate = useNavigate();
  const [detailPetId, setDetailPetId] = useState<string | null>(null);
  const { reset } = useQueryErrorResetBoundary();

  const clickCardHandler = (petId: string) => {
    setDetailPetId(petId);
  };

  return (
    <S.Container className="page-container with-topbar">
      <MainBackground />
      <TopBar
        leftNode={<Icon icon="IconArrowLeft" />}
        onLeftClick={() => navigate('/more')}
        title="동물도감"
      />
      <S.Wrapper>
        <ErrorBoundary onReset={reset} FallbackComponent={PetCardList.Error}>
          <Suspense fallback={<PetCardList.Loading />}>
            <PetCardList clickCardHandler={clickCardHandler} />
          </Suspense>
        </ErrorBoundary>
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
